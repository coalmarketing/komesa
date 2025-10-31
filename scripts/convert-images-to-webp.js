const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Script pro konverzi JPG obrázků na WEBP formát
 * Snižuje velikost souborů při zachování výborné kvality
 */

const IMAGE_QUALITY = 85; // Kvalita WEBP (0-100, doporučeno 80-90 pro skvělou kvalitu)
const INPUT_DIR = path.join(process.cwd(), 'public', 'new-photo');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.JPG', '.JPEG'];

/**
 * Konvertuje obrázek z JPG na WEBP
 */
async function convertImageToWebP(inputPath, outputPath) {
  try {
    const originalSize = fs.statSync(inputPath).size;
    
    await sharp(inputPath)
      .webp({ quality: IMAGE_QUALITY })
      .toFile(outputPath);
    
    const newSize = fs.statSync(outputPath).size;
    
    return { success: true, originalSize, newSize };
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
    return { success: false, originalSize: 0, newSize: 0 };
  }
}

/**
 * Projde složku a konvertuje všechny JPG obrázky
 */
async function processDirectory(dirPath, stats, replaceOriginal = false) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      // Rekurzivně projít podsložky
      await processDirectory(fullPath, stats, replaceOriginal);
    } else if (item.isFile()) {
      const ext = path.extname(item.name);
      
      if (IMAGE_EXTENSIONS.includes(ext)) {
        const nameWithoutExt = path.parse(item.name).name;
        const outputPath = path.join(dirPath, `${nameWithoutExt}.webp`);
        
        // Přeskočit, pokud WEBP už existuje
        if (fs.existsSync(outputPath)) {
          console.log(`⏭️  Skipping ${fullPath} - WEBP already exists`);
          stats.skipped++;
          continue;
        }
        
        console.log(`🔄 Converting ${fullPath}...`);
        const result = await convertImageToWebP(fullPath, outputPath);
        
        if (result.success) {
          stats.converted++;
          stats.totalSizeBefore += result.originalSize;
          stats.totalSizeAfter += result.newSize;
          
          const sizeReduction = ((1 - result.newSize / result.originalSize) * 100).toFixed(1);
          const originalMB = (result.originalSize / 1024 / 1024).toFixed(2);
          const newMB = (result.newSize / 1024 / 1024).toFixed(2);
          
          console.log(`✅ Converted: ${originalMB}MB → ${newMB}MB (${sizeReduction}% reduction)`);
          
          // Pokud chceme nahradit originály, smažeme JPG po úspěšné konverzi
          if (replaceOriginal) {
            fs.unlinkSync(fullPath);
            console.log(`🗑️  Removed original: ${fullPath}`);
          }
        } else {
          stats.errors++;
        }
      }
    }
  }
}

/**
 * Hlavní funkce
 */
async function main() {
  const replaceOriginal = process.argv.includes('--replace');
  
  if (replaceOriginal) {
    console.log('⚠️  WARNING: --replace flag is set. Original JPG files will be deleted after conversion!\n');
  }
  
  console.log('🚀 Starting image conversion...\n');
  console.log(`📁 Input directory: ${INPUT_DIR}`);
  console.log(`🎨 Quality: ${IMAGE_QUALITY}`);
  console.log(`📝 Mode: ${replaceOriginal ? 'Replace originals' : 'Keep originals'}\n`);
  
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Directory not found: ${INPUT_DIR}`);
    process.exit(1);
  }
  
  const stats = {
    converted: 0,
    skipped: 0,
    errors: 0,
    totalSizeBefore: 0,
    totalSizeAfter: 0,
  };
  
  await processDirectory(INPUT_DIR, stats, replaceOriginal);
  
  // Výpis statistik
  console.log('\n📊 Conversion Summary:');
  console.log(`✅ Converted: ${stats.converted} images`);
  console.log(`⏭️  Skipped: ${stats.skipped} images`);
  console.log(`❌ Errors: ${stats.errors} images`);
  
  if (stats.converted > 0) {
    const totalSizeBeforeMB = (stats.totalSizeBefore / 1024 / 1024).toFixed(2);
    const totalSizeAfterMB = (stats.totalSizeAfter / 1024 / 1024).toFixed(2);
    const totalReduction = ((1 - stats.totalSizeAfter / stats.totalSizeBefore) * 100).toFixed(1);
    
    console.log(`📦 Total size: ${totalSizeBeforeMB}MB → ${totalSizeAfterMB}MB`);
    console.log(`💾 Space saved: ${totalReduction}%`);
  }
  
  console.log('\n✨ Done!');
}

// Spuštění scriptu
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});


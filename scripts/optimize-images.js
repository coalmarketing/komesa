const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Script pro optimalizaci WEBP obrázků
 * Snižuje kvalitu a/nebo velikost pro lepší výkon
 */

const IMAGE_QUALITY = 75; // Nižší kvalita pro menší soubory (75 je stále velmi dobrá)
const MAX_WIDTH = 1920; // Maximální šířka (Full HD)
const MAX_HEIGHT = 1920; // Maximální výška
const INPUT_DIR = path.join(process.cwd(), 'public', 'new-photo');

let optimizedCount = 0;
let totalSizeBefore = 0;
let totalSizeAfter = 0;

/**
 * Optimalizuje jeden obrázek
 */
async function optimizeImage(inputPath) {
  try {
    const originalSize = fs.statSync(inputPath).size;
    const tempPath = inputPath + '.tmp';
    
    // Načíst obrázek a optimalizovat
    const metadata = await sharp(inputPath).metadata();
    
    // Vypočítat nové rozměry při zachování poměru stran
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
      if (width > height) {
        height = Math.round((height / width) * MAX_WIDTH);
        width = MAX_WIDTH;
      } else {
        width = Math.round((width / height) * MAX_HEIGHT);
        height = MAX_HEIGHT;
      }
    }
    
    // Optimalizovat obrázek
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ 
        quality: IMAGE_QUALITY,
        effort: 6 // Vyšší effort = lepší komprese (0-6)
      })
      .toFile(tempPath);
    
    const newSize = fs.statSync(tempPath).size;
    
    // Pokud je nový soubor menší, nahradit originál
    if (newSize < originalSize) {
      fs.renameSync(tempPath, inputPath);
      
      optimizedCount++;
      totalSizeBefore += originalSize;
      totalSizeAfter += newSize;
      
      const sizeReduction = ((1 - newSize / originalSize) * 100).toFixed(1);
      const originalMB = (originalSize / 1024 / 1024).toFixed(2);
      const newMB = (newSize / 1024 / 1024).toFixed(2);
      
      console.log(`✅ Optimized: ${path.basename(inputPath)} - ${originalMB}MB → ${newMB}MB (${sizeReduction}% reduction)`);
      return true;
    } else {
      // Pokud není menší, smazat temp soubor
      fs.unlinkSync(tempPath);
      console.log(`⏭️  Skipped: ${path.basename(inputPath)} - already optimal`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    // Smazat temp soubor pokud existuje
    if (fs.existsSync(inputPath + '.tmp')) {
      fs.unlinkSync(inputPath + '.tmp');
    }
    return false;
  }
}

/**
 * Projde složku a optimalizuje všechny WEBP obrázky
 */
async function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      // Rekurzivně projít podsložky
      await processDirectory(fullPath);
    } else if (item.isFile() && item.name.toLowerCase().endsWith('.webp')) {
      await optimizeImage(fullPath);
    }
  }
}

/**
 * Hlavní funkce
 */
async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`📁 Input directory: ${INPUT_DIR}`);
  console.log(`🎨 Quality: ${IMAGE_QUALITY}`);
  console.log(`📐 Max dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}\n`);
  
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Directory not found: ${INPUT_DIR}`);
    process.exit(1);
  }
  
  await processDirectory(INPUT_DIR);
  
  // Výpis statistik
  console.log('\n📊 Optimization Summary:');
  console.log(`✅ Optimized: ${optimizedCount} images`);
  
  if (optimizedCount > 0) {
    const totalSizeBeforeMB = (totalSizeBefore / 1024 / 1024).toFixed(2);
    const totalSizeAfterMB = (totalSizeAfter / 1024 / 1024).toFixed(2);
    const totalReduction = ((1 - totalSizeAfter / totalSizeBefore) * 100).toFixed(1);
    
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


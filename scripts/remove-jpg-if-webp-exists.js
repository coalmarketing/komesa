const fs = require('fs');
const path = require('path');

/**
 * Script pro smazání JPG souborů, pokud existuje jejich WEBP verze
 */

const INPUT_DIR = path.join(process.cwd(), 'public', 'new-photo');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.JPG', '.JPEG'];

let deletedCount = 0;
let keptCount = 0;
let totalSizeFreed = 0;

/**
 * Projde složku a smaže JPG soubory, pokud existuje WEBP verze
 */
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      // Rekurzivně projít podsložky
      processDirectory(fullPath);
    } else if (item.isFile()) {
      const ext = path.extname(item.name);
      
      if (IMAGE_EXTENSIONS.includes(ext)) {
        const nameWithoutExt = path.parse(item.name).name;
        const webpPath = path.join(dirPath, `${nameWithoutExt}.webp`);
        const webpPathUpper = path.join(dirPath, `${nameWithoutExt}.WEBP`);
        
        // Pokud existuje WEBP verze, smazat JPG
        if (fs.existsSync(webpPath) || fs.existsSync(webpPathUpper)) {
          const fileSize = fs.statSync(fullPath).size;
          fs.unlinkSync(fullPath);
          deletedCount++;
          totalSizeFreed += fileSize;
          
          const sizeMB = (fileSize / 1024 / 1024).toFixed(2);
          console.log(`🗑️  Deleted: ${fullPath} (${sizeMB}MB)`);
        } else {
          keptCount++;
          console.log(`ℹ️  Kept: ${fullPath} (no WEBP version found)`);
        }
      }
    }
  }
}

/**
 * Hlavní funkce
 */
function main() {
  console.log('🗑️  Removing JPG files where WEBP versions exist...\n');
  console.log(`📁 Input directory: ${INPUT_DIR}\n`);
  
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Directory not found: ${INPUT_DIR}`);
    process.exit(1);
  }
  
  processDirectory(INPUT_DIR);
  
  // Výpis statistik
  console.log('\n📊 Summary:');
  console.log(`🗑️  Deleted: ${deletedCount} JPG files`);
  console.log(`ℹ️  Kept: ${keptCount} JPG files (no WEBP version)`);
  
  if (deletedCount > 0) {
    const totalSizeFreedMB = (totalSizeFreed / 1024 / 1024).toFixed(2);
    console.log(`💾 Space freed: ${totalSizeFreedMB}MB`);
  }
  
  console.log('\n✨ Done!');
}

// Spuštění scriptu
main();


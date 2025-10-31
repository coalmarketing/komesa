import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Mapování ID hradu na názvy složek
 * Podle názvů složek v public/new-photo:
 * 01_minihrad, 02_tunel, 03_dve-skluzavky, 04_pirat, 05_skok, 06_vlnka, 07_veze
 */
const hradFolderNames: Record<number, string> = {
  1: '06_vlnka',           // ID 1 "Velký skákací hrad \"Vlnka\"" -> 06_vlnka
  2: '07_veze',            // ID 2 "Střední skákací hrad \"Věže\"" -> 07_veze
  3: '05_skok',            // ID 3 "Střední skákací hrad \"Skok\"" -> 05_skok
  4: '04_pirat',           // ID 4 "Malý skákací hrad \"Pirát\"" -> 04_pirat
  5: '03_dve-skluzavky',   // ID 5 "Malý skákací hrad \"Dvě skluzavky\"" -> 03_dve-skluzavky
  6: '02_tunel',           // ID 6 "Malý skákací hrad \"Tunel\"" -> 02_tunel
  7: '01_minihrad',        // ID 7 "Mini skákací hrad" -> 01_minihrad
};


export async function GET(
  request: NextRequest,
  { params }: { params: { hradId: string } }
) {
  try {
    const hradId = parseInt(params.hradId);
    
    // Získat název složky podle ID
    let folder = hradFolderNames[hradId];
    
    if (!folder) {
      return NextResponse.json({ images: [] }, { status: 200 });
    }
    
    // Ověřit, že složka existuje a případně najít správnou
    const publicPath = path.join(process.cwd(), 'public', 'new-photo');
    const folderPath = path.join(publicPath, folder);
    
    if (!fs.existsSync(folderPath)) {
      // Pokud složka neexistuje, zkusíme najít podobnou podle názvu
      if (fs.existsSync(publicPath)) {
        const folders = fs.readdirSync(publicPath, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);
        
        // Najít složku obsahující část názvu (např. "vlnka", "skok", atd.)
        const folderNamePart = folder.split('_')[1]; // "06_vlnka" -> "vlnka"
        const foundFolder = folders.find(f => 
          f.toLowerCase().includes(folderNamePart.toLowerCase())
        );
        
        if (foundFolder) {
          folder = foundFolder;
        } else {
          return NextResponse.json({ images: [] }, { status: 200 });
        }
      } else {
        return NextResponse.json({ images: [] }, { status: 200 });
      }
    }

    const finalFolderPath = path.join(publicPath, folder);
    
    // Kontrola, zda složka existuje
    if (!fs.existsSync(finalFolderPath)) {
      return NextResponse.json({ images: [] }, { status: 200 });
    }

    // Načtení všech souborů ze složky
    const files = fs.readdirSync(finalFolderPath);
    
    // Filtrování pouze obrázkových souborů (preferujeme WEBP před JPG)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'];
    const imageFiles = files
      .filter(file => imageExtensions.some(ext => file.toLowerCase().endsWith(ext.toLowerCase())))
      // Preferovat WEBP před JPG - pokud existuje WEBP, použít ho místo JPG
      .reduce((acc: string[], file: string) => {
        const nameWithoutExt = path.parse(file).name;
        const ext = path.extname(file).toLowerCase();
        
        // Pokud je to WEBP, přidat ho
        if (ext === '.webp') {
          acc.push(`/new-photo/${folder}/${file}`);
        } 
        // Pokud je to JPG/JPEG, přidat ho pouze pokud neexistuje WEBP verze
        else if (['.jpg', '.jpeg'].includes(ext)) {
          const webpExists = files.some(f => 
            f.toLowerCase() === `${nameWithoutExt}.webp` || 
            f.toLowerCase() === `${nameWithoutExt}.WEBP`
          );
          if (!webpExists) {
            acc.push(`/new-photo/${folder}/${file}`);
          }
        } 
        // Ostatní formáty přidat normálně
        else {
          acc.push(`/new-photo/${folder}/${file}`);
        }
        
        return acc;
      }, [])
      .sort(); // Seřazení podle názvu

    return NextResponse.json({ images: imageFiles }, { status: 200 });
  } catch (error) {
    console.error('Error reading images folder:', error);
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}


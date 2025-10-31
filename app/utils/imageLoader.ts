/**
 * Mapování ID hradu na název složky s fotkami
 */
const hradFolderMap: Record<number, string> = {
  1: '06_vlnka',
  2: '07_vlnka', // Věže
  3: '05_skok',
  4: '04_pirat',
  5: '03_dve-skluzavky',
  6: '02_tunel',
  7: '01_minihrad',
};

/**
 * Vytvoří cestu k obrázku ve formátu /new-photo/{složka}/{číslo}-01.JPG
 */
export function getImagePath(hradId: number, imageNumber: number): string {
  const folder = hradFolderMap[hradId];
  if (!folder) {
    return '';
  }
  
  const numberStr = imageNumber.toString().padStart(2, '0');
  return `/new-photo/${folder}/${numberStr}-01.JPG`;
}

/**
 * Získá všechny cesty k obrázkům pro daný hrad ze serveru
 * Načítá všechny obrázky ze složky bez ohledu na název
 */
export async function getHradImages(hradId: number): Promise<string[]> {
  try {
    const response = await fetch(`/api/images/${hradId}`, {
      cache: 'no-store' // Pro dynamické načítání
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.images || [];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

/**
 * Synchronní verze pro server-side použití (pouze v SSR/SSG)
 * Pro client-side komponenty použijte getHradImages()
 */
export function getHradImagesSync(hradId: number): string[] {
  // Pro server-side můžeme použít fs, ale pro client-side musíme použít API
  // Tato funkce je pouze fallback pro případy, kdy potřebujeme synchronní načítání
  return [];
}

/**
 * Filtruje pouze existující obrázky
 * V Next.js to musíme řešit jinak - použijeme client-side komponentu
 * která zkontroluje, které obrázky se načetly
 */
export function getFolderName(hradId: number): string | null {
  return hradFolderMap[hradId] || null;
}


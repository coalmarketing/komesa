'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImageCarouselProps {
  images: (string | any)[]; // Podporuje string cesty i importované moduly
  alt: string;
  interval?: number; // interval v milisekundách (výchozí 4000ms = 4 sekundy)
}

export default function ImageCarousel({ images, alt, interval = 4000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [validImages, setValidImages] = useState<(string | any)[]>([]);

  // Filtrování validních obrázků - kontrolujeme načtení obrázků
  useEffect(() => {
    // Pro string cesty potřebujeme počkat na načtení
    // Pro importované moduly je můžeme použít přímo
    const filtered = images.filter(img => img != null && img !== '');
    setValidImages(filtered.length > 0 ? filtered : images);
    
    // Zajištění, že currentIndex je v platném rozsahu
    if (currentIndex >= filtered.length && filtered.length > 0) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  // Automatické posouvání
  useEffect(() => {
    if (validImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [validImages.length, interval]);

  // Ruční posouvání - předchozí
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  // Ruční posouvání - další
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
  }, [validImages.length]);

  // Přechod na konkrétní index (z indikátorů)
  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Pokud je pouze jeden obrázek nebo žádný, zobrazíme ho bez karuselu
  if (validImages.length <= 1) {
    if (validImages.length === 0) {
      return null; // Žádné obrázky k zobrazení
    }
    
    return (
      <div className="rounded-[2rem] sm:rounded-[3rem] lg:rounded-[5rem] overflow-hidden relative w-full h-full">
        <div className="relative w-full h-full">
          <Image 
            src={validImages[0] || '/hrady/minihrad.jpg'} 
            alt={alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] sm:rounded-[3rem] lg:rounded-[5rem] overflow-hidden relative w-full h-full group">
      {/* Kontejner pro všechny obrázky s animací */}
      <div className="relative w-full h-full bg-gray-100 overflow-hidden">
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {validImages.map((image, index) => (
            <div
              key={index}
              className="relative min-w-full h-full flex-shrink-0"
            >
              <Image 
                src={image} 
                alt={`${alt} - obrázek ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                unoptimized={typeof image === 'string' && image.startsWith('/')}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Šipka vlevo */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white rounded-full p-2 sm:p-3 transition-all duration-200 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white touch-manipulation"
        aria-label="Předchozí obrázek"
      >
        <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Šipka vpravo */}
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white rounded-full p-2 sm:p-3 transition-all duration-200 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white touch-manipulation"
        aria-label="Další obrázek"
      >
        <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Indikátory (tečky) */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {validImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white w-6 sm:w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Přejít na obrázek ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}


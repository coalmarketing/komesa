'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { Hrad } from "../data/hrady";
import Button from "./Button";
import Kontakt from "./Kontakt";
import ImageCarousel from "./ImageCarousel";

interface HradDetailProps {
  hrad: Hrad;
}

export default function HradDetail({ hrad }: HradDetailProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Načtení obrázků ze složky podle ID hradu
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/images/${hrad.id}`);
        if (response.ok) {
          const data = await response.json();
          setImages(data.images || []);
        }
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [hrad.id]);
  return (
    <div className="w-[min(1500px,100%)] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Link href="/">
          <Button className="flex items-center">
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Zpět
          </Button>
        </Link>
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 sm:gap-6 lg:gap-8 mt-2 sm:mt-4">
        {/* Levá strana - obsah */}
        <div className="lg:flex-1 flex flex-col">
          <h1 className="text-[2rem] sm:text-[3rem] lg:text-[4rem] font-extrabold mb-2 leading-tight">{hrad.název}</h1>
          
          <div className="mb-3 sm:mb-4 mt-4 sm:mt-6">
            <h2 className="text-secondary text-lg sm:text-xl">Rozměry</h2>
            <p className="text-secondary text-lg sm:text-xl font-bold">{hrad.rozměry.join(' × ')}</p>
          </div>
          
          <div className="mb-3 sm:mb-4">
            <h2 className="text-primary text-lg sm:text-xl">Základní cena</h2>
            <p className="text-primary text-xl sm:text-2xl font-bold">{hrad.základníCena}</p>
            <p className="text-xs sm:text-sm text-gray-500">Sjednaná cena – individuálně dle dohody.</p>
          </div>
          
          <div className="mb-3 sm:mb-4">
            <h2 className="text-secondary text-lg sm:text-xl">Doprava</h2>
            <p className="text-secondary text-lg sm:text-xl font-bold">{hrad.doprava}</p>
          </div>
          
          <div className="mb-3 sm:mb-4">
            <h2 className="text-secondary text-lg sm:text-xl">Obsluha</h2>
            <p className="text-secondary text-xs sm:text-sm md:w-[90%] lg:w-[80%] font-bold">{hrad.obsluha}</p>
          </div>
        </div>

        {/* Pravá strana - fotka na desktopu vedle levého sloupce */}
        <div className="lg:flex-1 lg:min-w-[40%] lg:max-w-[50%] lg:flex lg:flex-col">
          {!loading && images.length > 0 ? (
            <div className="w-full h-[300px] sm:h-[400px] lg:h-full lg:flex-1">
              <ImageCarousel 
                images={images} 
                alt={hrad.název}
                interval={4000}
              />
            </div>
          ) : (
            <div className="w-full h-[300px] sm:h-[400px] lg:h-full lg:flex-1 rounded-[2rem] sm:rounded-[3rem] lg:rounded-[5rem] overflow-hidden">
              <div className="relative w-full h-full">
                <Image 
                  src={hrad.obrázek} 
                  alt={hrad.název}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12">
        <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">
          {hrad.popis}
        </p>
        
        <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">
          V ceně pronájmu je zahrnuta kompletní nafukovací atrakce, která zahrnuje skákací hrad se skluzavkou, výkonný fukar k jeho nafouknutí, prodlužovací kabel o délce 50 metrů, kolíky pro bezpečné ukotvení, ochrannou plachtu pod hrad a koberec před vstup. Součástí je také provozní řád a podrobné pokyny pro bezpečné používání atrakce.
        </p>
        
        <p className="text-gray-700 text-sm sm:text-base">
          Cena nezahrnuje obsluhu ani dopravu, které lze zajistit za příplatek dle aktuálního ceníku. Podrobnosti o těchto službách naleznete výše.
        </p>
      </div>

     <Kontakt />
    </div>
  );
} 
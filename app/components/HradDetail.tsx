import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { Hrad } from "../data/hrady";
import Button from "./Button";
import Kontakt from "./Kontakt";
interface HradDetailProps {
  hrad: Hrad;
}

export default function HradDetail({ hrad }: HradDetailProps) {
  return (
    <div className="w-[min(1500px,100%)] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Link href="/">
          <Button className="flex items-center">
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Zpět
          </Button>
        </Link>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mt-2 sm:mt-4">
        {/* Levá strana */}
        <div className="flex-[2]">
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

        {/* Pravá strana */}
        <div className="flex-1">
          <div className="rounded-[2rem] sm:rounded-[3rem] lg:rounded-[5rem] overflow-hidden">
            <Image 
              src={hrad.obrázek} 
              alt={hrad.název}
              width={500}
              height={333}
              className="w-full h-auto object-cover"
            />
          </div>
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
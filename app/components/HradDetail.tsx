import Image from "next/image";
import { Hrad } from "../data/hrady";
import Button from "./Button";

interface HradDetailProps {
  hrad: Hrad;
}

export default function HradDetail({ hrad }: HradDetailProps) {
  return (
    <main className="mt-24 mb-16">
      <div className="w-[min(1300px,100%)] mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{hrad.název}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Levá strana s obrázkem */}
            <div>
              <div className="rounded-[2rem] overflow-hidden">
                <Image 
                  src={hrad.obrázek} 
                  alt={hrad.název} 
                  className="w-full h-auto" 
                  width={600}
                  height={400}
                />
              </div>
            </div>
            
            {/* Pravá strana s informacemi */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-600 mb-1">Rozměry</h2>
                <p className="text-2xl font-bold">{hrad.rozměry.join(' × ')}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-600 mb-1">Základní cena</h2>
                <p className="text-3xl font-bold text-[#F34B6D]">{hrad.základníCena}</p>
                <p className="text-sm text-gray-500">Sjednaná cena - individuální dle dohody.</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-600 mb-1">Doprava</h2>
                <p className="text-2xl font-bold">{hrad.doprava}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-600 mb-1">Obsluha</h2>
                <p className="text-lg">{hrad.obsluha}</p>
              </div>
              
              <div className="mt-8">
                <h2 className="text-3xl font-bold mb-6 text-center">REZERVOVAT</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#F34B6D] w-10 h-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span className="text-lg font-bold">+420 774 363 111</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[#F34B6D] w-10 h-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span className="text-lg font-bold">komesa.cz@gmail.com</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button href="/kontakt">Kontaktní formulář</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Popis</h2>
            <p className="text-lg leading-relaxed">{hrad.popis}</p>
            <p className="text-lg leading-relaxed mt-4">V ceně pronájmu je zahrnuta kompletní nafukovací atrakce, která zahrnuje skákací hrad se skluzavkou, výkonný fukar k jeho nafouknutí, prodlužovací kabel o délce 50 metrů, kolíky pro bezpečné ukotvení, ochrannou plachtu pod hrad a koberec před vstup. Součástí je také provozní řád a podrobné pokyny pro bezpečné používání atrakce.</p>
            <p className="text-lg leading-relaxed mt-4">Cena nezahrnuje obsluhu ani dopravu, které lze zajistit za příplatek dle aktuálního ceníku. Podrobnosti o těchto službách naleznete níže.</p>
          </div>
        </div>
      </div>
    </main>
  );
} 
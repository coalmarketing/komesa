"use client";

import { useState } from 'react';

interface FaqItem {
  otazka: string;
  odpoved: string;
}

export default function NejcastejsiDotazy() {
  const [otevreneDotazy, setOtevreneDotazy] = useState<number[]>([0]);

  const dotazy: FaqItem[] = [
    {
      otazka: "Jak dlouho si můžeme skákací hrad pronajmout?",
      odpoved: "Skákací hrad si můžete pronajmout na libovolně dlouhou dobu – od několika hodin až po celý den. Délku pronájmu si domluvíme individuálně podle vašich potřeb."
    },
    {
      otazka: "Je nutné zajistit elektřinu pro provoz hradu?",
      odpoved: "Ano, skákací hrad je potřeba po celou dobu provozu napájet z elektrické sítě. Bez přívodu elektřiny nelze hrad nafouknout ani udržet v provozu."
    },
    {
      otazka: "Co když bude špatné počasí?",
      odpoved: "V případě deště nebo silného větru není možné hrad využívat z bezpečnostních důvodů. Provoz v takovém počasí je zakázán a doporučujeme včasnou domluvu na náhradním termínu."
    },
    {
      otazka: "Mohou si na skákacím hradě hrát i dospělí?",
      odpoved: "Skákací hrad je určen výhradně pro děti. Vstup dospělým osobám není z bezpečnostních důvodů povolen."
    },
  ];

  const prepnoutDotaz = (index: number) => {
    setOtevreneDotazy(predchozi => {
      if (predchozi.includes(index)) {
        return predchozi.filter(i => i !== index);
      } else {
        return [...predchozi, index];
      }
    });
  };

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="w-[min(1300px,100%)] mx-auto px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 uppercase">
          Nejčastější dotazy
        </h2>
        
        <div className="w-[min(1300px,100%)] mx-auto">
          {dotazy.map((dotaz, index) => (
            <div 
              key={index} 
              className="border-b border-gray-200 py-3 md:py-4"
            >
              <button
                onClick={() => prepnoutDotaz(index)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg md:text-xl font-semibold flex items-center text-gray-800">
                  <span className="text-primary mr-2 md:mr-4">&gt;</span>
                  {dotaz.otazka}
                </h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 md:h-5 md:w-5 transform transition-transform duration-300 ${otevreneDotazy.includes(index) ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  otevreneDotazy.includes(index) 
                    ? 'max-h-96 opacity-100 pt-3 md:pt-4' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-base md:text-lg text-gray-700">{dotaz.odpoved}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
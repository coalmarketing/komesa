"use client";

import { useState } from 'react';

interface InfoItem {
  nadpis: string;
  popis: string;
}

export default function Informace() {
  const [otevreneInformace, setOtevreneInformace] = useState<number[]>([0]);

  const informace: InfoItem[] = [
    {
      nadpis: "Požadavky na elektrické připojení",
      popis: "Pro provoz skákacího hradu je nutné zajistit přívod elektrické energie 220V do vzdálenosti maximálně 50 metrů od místa instalace."
    },
    {
      nadpis: "Vhodný povrch pro instalaci",
      popis: "Ideálním povrchem pro umístění skákacího hradu je trávník. Nevhodné a zakázané povrchy jsou štěrk, antuka, bahno, škvára a v případě malých hradů také beton."
    },
  ];

  const prepnoutInformaci = (index: number) => {
    setOtevreneInformace(predchozi => {
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
          Důležité informace
        </h2>
        
        <div className="w-[min(1300px,100%)] mx-auto">
          {informace.map((info, index) => (
            <div 
              key={index} 
              className="border-b border-gray-200 py-3 md:py-4"
            >
              <button
                onClick={() => prepnoutInformaci(index)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <h3 className="text-lg md:text-xl font-semibold flex items-center text-gray-800">
                  <span className="text-primary mr-2 md:mr-4">&gt;</span>
                  {info.nadpis}
                </h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 md:h-5 md:w-5 transform transition-transform duration-300 ${otevreneInformace.includes(index) ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  otevreneInformace.includes(index) 
                    ? 'max-h-96 opacity-100 pt-3 md:pt-4' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-base md:text-lg text-gray-700">{info.popis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
'use client';

import Image from "next/image";
import Button from "./Button";
import hrad1 from "../../public/hrady/hrad1.jpg";
import hrad2 from "../../public/hrady/hrad2.jpg";
import arrow from "../../public/icons/sipky.svg";

export default function LandingPage() {
  return (
    <main className="relative mt-0 md:mt-20 px-0 md:px-6">
      <div className="w-[min(1500px,100%)] mx-auto">
        {/* Mobilní sekce s obrázkem přes celou obrazovku */}
        <div className="md:hidden relative w-full">
          <div className="relative w-full h-[75vh] max-h-[600px]">
            <Image
              src={hrad1}
              alt="Skákací hrad červený"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
              priority
              className="rounded-none"
            />
            {/* Bílý přechod přes obrázek */}
            <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-white via-white/95 to-transparent"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-top px-8 md:px-0">
          <div className="order-2 md:order-1 -mt-[220px] md:mt-12 relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-8 text-center md:text-left">
              <span className="text-[#E31C79]">Skákací hrady</span> pro nezapomenutelné chvíle plné radosti!
            </h1>
            <p className="text-lg sm:text-xl md:text-3xl mb-6 md:mb-12 w-full md:w-[90%] lg:w-[70%] text-center md:text-left">
              Plánujete oslavu narozenin, výročí, dětský den, firemní akci nebo jinou společenskou událost?
            </p>
            <div className="flex flex-col md:items-start items-center w-full md:w-[fit-content]">
              <div>
                <Button href="#skakaci-hrady">
                  Prozkoumat nabídku!
                </Button>
              </div>
              <div className="flex justify-center mt-6 md:mt-8 mx-auto">
                <Image
                  src={arrow}
                  alt="Šipka dolů"
                  width={63}
                  height={63}
                  className="opacity-90 animate-[bounce_2s_ease-in-out_infinite] w-12 md:w-12"
                />
              </div>
            </div>
          </div>
          <div className="hidden md:block order-1 md:order-2 relative mt-2 md:mt-0 md:ml-auto mb-1 md:mb-0">
            <div className="relative z-20">
              <Image
                src={hrad1}
                alt="Skákací hrad červený"
                width={640}
                height={480}
                className="rounded-3xl sm:rounded-[3rem] md:rounded-[5rem] w-full max-w-[640px]"
                priority
              />
            </div>
            
            <div className="hidden sm:block absolute z-30 top-[50%] md:top-80 -left-12 md:-left-32">
              <Image
                src={hrad2}
                alt="Skákací hrad zelený"
                width={480}
                height={360}
                className="rounded-3xl sm:rounded-[3rem] md:rounded-[5rem] w-full max-w-[480px]"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

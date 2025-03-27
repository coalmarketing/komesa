import Image from "next/image";
import Button from "./Button";
import { hrady } from "../data/hrady";

export default function SkákaciHrady() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-primary to-secondary mt-8 sm:mt-32 md:mt-40">
      <div className="w-[min(1300px,100%)] mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-8 sm:mb-12 uppercase">
          Skákací hrady
        </h2>
        
        <div className="flex flex-col gap-4 sm:gap-6">
          {hrady.map((hrad, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-lg"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="p-3 sm:p-4">
                  <Image
                    src={hrad.obrázek}
                    alt={hrad.název}
                    className="w-full sm:w-[11rem] h-auto rounded-xl sm:rounded-[2rem]"
                    width={300}
                    height={300}
                  />
                </div>
                
                <div className="p-4 sm:p-6 flex flex-col justify-center mr-auto">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">{hrad.název}</h3>
                  <p className="text-secondary font-bold text-sm sm:text-base">
                    {hrad.rozměry.join(' × ')}
                  </p>
                  <p className="text-primary font-bold text-lg sm:text-xl mt-1">
                    {hrad.základníCena}
                  </p>
                </div>
                
                <div className="p-4 flex items-center justify-center sm:w-1/5">
                  <Button 
                    href={`/hrad/${hrad.id}`}
                  >
                    Zjistit více...
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
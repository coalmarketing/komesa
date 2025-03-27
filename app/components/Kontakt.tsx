import React from 'react';
import Image from 'next/image';
import phone from '@/public/icons/phone.svg';
import email from '@/public/icons/email.svg';
import Button from './Button';

export default function Kontakt() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-8 w-[min(1300px,100%)] mx-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16">KONTAKT</h2>
      
      <div className="flex flex-col sm:flex-row items-center">
        <div className="flex flex-col sm:flex-row items-start mx-auto mb-8 sm:mb-12 gap-6 sm:gap-8 md:gap-16">
          <a href="tel:+420774363111" className="flex items-center hover:opacity-80 transition-opacity">
              <Image src={phone} alt="Phone" width={40} height={40} className="sm:w-[50px] sm:h-[50px]" />
            <span className="ml-3 sm:ml-4 text-lg sm:text-xl md:text-2xl">+420 774 363 111</span>
          </a>
          
          <a href="mailto:komesa.cz@gmail.com" className="flex items-center hover:opacity-80 transition-opacity">
              <Image src={email} alt="Email" width={40} height={40} className="sm:w-[50px] sm:h-[50px]" />
            <span className="ml-3 sm:ml-4 text-lg sm:text-xl md:text-2xl">komesa.cz@gmail.com</span>
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4 gap-6 sm:gap-8">
        <p className="text-base sm:text-lg md:text-xl text-center max-w-2xl mx-auto">
          Pro rezervaci skákacího hradu nebo jakýkoliv dotaz mě kontaktujte e-mailem. Těším se na Vaši zprávu!
        </p>
        
        <Button 
          href="mailto:komesa.cz@gmail.com?subject=Rezervace skákacího hradu"
        >
          Poslat e-mail pro rezervaci
        </Button>
      </div>
    </section>
  );
} 
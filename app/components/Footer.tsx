import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import phone from '@/public/icons/phone-white.svg';
import email from '@/public/icons/email-white.svg';
import logo from '@/public/logo/RZ_logo_long-white.svg';
import srdce from '@/public/icons/srdce.svg';

export default function Footer() {
  return (
    <div>
    <footer className="bg-gradient-to-r from-[#F34B6D] to-[#374091] text-white py-12 px-4 md:px-8">
      <div className="w-[min(1300px,100%)] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Sloupec 1: Logo */}
          <div className="flex flex-col items-center">
            <Link href="/">
              <Image 
                src={logo} 
                alt="Radka Zemanová Logo" 
                width={400} 
                height={150} 
              />
            </Link>
          </div>
          
          {/* Sloupec 2: Kontaktní informace - telefon a email */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4 mb-4">
              <Image src={phone} alt="Telefon" width={40} height={40} />
              <span className="text-xl">+420 774 363 111</span>
            </div>
            <div className="flex items-center gap-4">
              <Image src={email} alt="Email" width={40} height={40}/>
              <span className="text-xl">komesa.cz@gmail.com</span>
            </div>
          </div>
          
          {/* Sloupec 3: Adresa a IČO */}
          <div className="flex flex-col items-center">
            <div className="mt-2 text-center md:text-right">
              <p className="text-xl font-bold mb-3">Mgr. Radka Zemanová</p>
              <p className="text-md">Šedivská 838</p>
              <p className="text-md">Letohrad 561 51</p>
              <p className="text-lg mt-3">IČO: 72846861</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    
    <p className="text-sm text-center p-3 font-semibold">
    Designed with <Image src={srdce} alt="srdce" width={16} height={16} className="inline" /> by coalmarketing.
  </p>
  </div>
  );
} 
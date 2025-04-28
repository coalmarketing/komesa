"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import BackToHome from '../components/BackToHome';
import { formatDistanceToNow } from 'date-fns';
import { cs } from 'date-fns/locale';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface Reference {
  id: number;
  stars: number;
  text: string;
  location: string;
  date: string;
}

const ReferenceItem = ({ stars, text, location, date }: { stars: number, text: string, location: string, date: string }) => {
  const formattedDate = formatDistanceToNow(new Date(date), { 
    addSuffix: true,
    locale: cs 
  });

  return (
    <div className="bg-gray-100 rounded-3xl p-8 flex flex-col h-full shadow-sm">
      <div className="flex mb-4">
        {Array.from({ length: stars }).map((_, i) => (
          <svg key={i} className="w-8 h-8 text-primary mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <div className="flex-grow h-[200px] mb-4 overflow-y-auto pr-2 custom-scrollbar">
        <p className="text-gray-700 text-base">{text}</p>
      </div>
      <div className="flex flex-col justify-between items-start mt-auto">
        <p className="text-secondary font-bold text-xl">{location}</p>
        <p className="text-gray-500 text-sm">{formattedDate}</p>
      </div>
    </div>
  );
};

export default function ReferencePage() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const response = await fetch('/api/references');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Nepodařilo se načíst reference');
        }
        const data = await response.json();
        setReferences(data);
      } catch (err) {
        console.error('Chyba při načítání referencí:', err);
        setError(err instanceof Error ? err.message : 'Nastala chyba při načítání referencí');
      } finally {
        setLoading(false);
      }
    };

    fetchReferences();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-28 pb-16">
          <div className="text-center py-16">Načítání referencí...</div>
        </main>
        <Footer />
        <BackToHome />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="pt-28 pb-16">
          <div className="text-center py-16 text-red-500">{error}</div>
        </main>
        <Footer />
        <BackToHome />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="px-4 md:px-8 w-[min(1300px,100%)] mx-auto">
        <Link href="/">
          <Button className="flex items-center mb-16">
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Zpět
          </Button>
        </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">REFERENCE NAŠICH ZÁKAZNÍKŮ</h1>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Přečtěte si, co o nás říkají naši spokojení zákazníci. Jsme rádi, že můžeme přinášet radost dětem na různých akcích po celé republice.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {references.map((ref) => (
              <ReferenceItem 
                key={ref.id}
                stars={ref.stars}
                text={ref.text}
                location={ref.location}
                date={ref.date}
              />
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button 
              href="/napsat-recenzi" 
              variant="primary"
            >
              Napsat novou recenzi
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <BackToHome />
    </>
  );
} 
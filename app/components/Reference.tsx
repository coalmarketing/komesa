"use client";

import React, { useEffect, useState } from 'react';
import Button from './Button';
import { formatDistanceToNow } from 'date-fns';
import { cs } from 'date-fns/locale';

interface Reference {
  id: number;
  stars: number;
  text: string;
  location: string;
  date: string;
}

interface ReferenceItemProps {
  stars: number;
  text: string;
  location: string;
  date: string;
}

const ReferenceItem: React.FC<ReferenceItemProps> = ({ stars, text, location, date }) => {
  const formattedDate = formatDistanceToNow(new Date(date), { 
    addSuffix: true,
    locale: cs 
  });

  return (
    <div className="bg-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col h-full shadow-sm">
      <div className="flex mb-3 sm:mb-4">
        {Array.from({ length: stars }).map((_, i) => (
          <svg key={i} className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <div className="flex-grow h-[150px] sm:h-[200px] mb-3 sm:mb-4 overflow-y-auto pr-2 custom-scrollbar">
        <p className="text-gray-700 text-sm sm:text-base">{text}</p>
      </div>
      <div className="flex flex-col justify-between items-start mt-auto">
        <p className="text-secondary font-bold text-lg sm:text-xl">{location}</p>
        <p className="text-gray-500 text-xs sm:text-sm">{formattedDate}</p>
      </div>
    </div>
  );
};

interface ReferenceProps {
  variant?: 'primary' | 'secondary';
  limit?: number;
}

const Reference: React.FC<ReferenceProps> = ({ variant = 'primary', limit = 3 }) => {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      // Pokud je šířka obrazovky mezi sm a md breakpointem (2 sloupce)
      if (window.innerWidth >= 640 && window.innerWidth < 768) {
        setDisplayLimit(4);
      } else {
        setDisplayLimit(3);
      }
    };

    // Nastavíme počáteční limit
    handleResize();

    // Přidáme event listener pro změnu velikosti okna
    window.addEventListener('resize', handleResize);

    // Cleanup při unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        console.log('Začátek načítání referencí v komponentě');
        const response = await fetch('/api/references', {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error('Server nevrátil JSON data');
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Nepodařilo se načíst reference');
        }

        const data = await response.json();
        console.log('Načtená data:', data);
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
    return <div className="text-center py-16">Načítání referencí...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 font-bold mb-2">Chyba při načítání referencí</p>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  // Pokud nemáme žádné reference, zobrazíme zprávu
  if (references.length === 0) {
    return <div className="text-center py-16">Zatím zde nejsou žádné reference.</div>;
  }

  // Data jsou již seřazena podle data z API
  const displayedReferences = references.slice(0, displayLimit);

  return (
    <section className="py-8 sm:py-16 px-4 md:px-8 w-[min(1300px,100%)] mx-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-16">REFERENCE</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
        {displayedReferences.map((ref) => (
          <ReferenceItem 
            key={ref.id}
            stars={ref.stars}
            text={ref.text}
            location={ref.location}
            date={ref.date}
          />
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
        <Button 
          href="/reference" 
          variant="primary"
        >
          Všechny recenze
        </Button>
        <Button 
          href="/napsat-recenzi" 
          variant="secondary"
        >
          Napsat recenzi
        </Button>
      </div>
    </section>
  );
};

export default Reference; 
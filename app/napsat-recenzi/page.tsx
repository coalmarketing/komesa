"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  location: string;
  stars: number;
  text: string;
}

interface FormErrors {
  email?: string;
  location?: string;
  stars?: string;
  text?: string;
}

const WriteReviewPage = () => {
  const router = useRouter();
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};
    
    if (!data.email.trim()) {
      errors.email = 'Prosím vyplňte email';
    }
    
    if (!data.location.trim()) {
      errors.location = 'Prosím vyplňte místo konání';
    }
    
    if (!data.stars) {
      errors.stars = 'Prosím vyberte hodnocení';
    }
    
    if (!data.text.trim()) {
      errors.text = 'Prosím napište recenzi';
    } else if (data.text.length < 10) {
      errors.text = 'Recenze musí obsahovat alespoň 10 znaků';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: FormData = {
      email: formData.get('email') as string,
      location: formData.get('location') as string,
      stars: selectedRating,
      text: formData.get('review') as string,
    };

    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Vytvoření aktuálního data a času ve formátu YYYY-MM-DD HH:mm:ss
      const now = new Date();
      const formattedDate = now.getFullYear() + '-' + 
        String(now.getMonth() + 1).padStart(2, '0') + '-' + 
        String(now.getDate()).padStart(2, '0') + ' ' + 
        String(now.getHours()).padStart(2, '0') + ':' + 
        String(now.getMinutes()).padStart(2, '0') + ':' + 
        String(now.getSeconds()).padStart(2, '0');

      const response = await fetch('/api/references', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          date: formattedDate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Nepodařilo se odeslat recenzi');
      }

      // Přesměrování na stránku s referencemi
      router.push('/reference?success=true');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Došlo k chybě při odesílání recenze. Prosím zkuste to znovu později.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="px-4 md:px-8 w-[min(800px,100%)] mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">NAPIŠTE NÁM RECENZI</h1>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Děkujeme, že jste využili naše služby! Budeme rádi, když se s námi podělíte o svou zkušenost. Vaše zpětná vazba je pro nás velmi důležitá.
          </p>

          <div className="mb-12 text-gray-600 max-w-3xl mx-auto">
            <p className="mb-4">
              Pro lepší zpětnou vazbu nám prosím sdělte:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Jak jste se o nás dozvěděli?</strong>
                <br />
                <span className="text-sm">Například: vyhledávače (Seznam.cz, Google.com), akce s pronajatou atrakcí, doporučení od známých či příbuzných, inzertní noviny, reklama na automobilu...</span>
              </li>
              <li>
                <strong>Byli jste s našimi službami spokojení?</strong>
                <br />
                <span className="text-sm">Zajímá nás váš názor na způsob jednání, cenu, kvalitu hradu a celkový dojem z našich služeb.</span>
              </li>
              <li>
                <strong>Co Vám u nás chybělo?</strong>
                <br />
                <span className="text-sm">Uvítáme vaše návrhy na vylepšení či změny, které by podle vás zkvalitnily naše služby.</span>
              </li>
            </ul>
          </div>
          
          {submitError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {submitError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-gray-100 rounded-3xl p-8 shadow-sm">            
            <div className="mb-6">
              <label htmlFor="location" className="block mb-2 font-semibold">Název a místo konání akce</label>
              <input
                type="text"
                id="location"
                name="location"
                className={`w-full p-3 rounded-lg border ${formErrors.location ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Např. Pouť Letohrad"
                required
              />
              {formErrors.location && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.location}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 font-semibold">Váš email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full p-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="vas@email.cz"
                required
              />
              {formErrors.email && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Hodnocení (počet hvězdiček)</label>
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label 
                    key={rating} 
                    className="flex items-center"
                    onMouseEnter={() => setHoverRating(rating)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setSelectedRating(rating)}
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      className="sr-only"
                      checked={selectedRating === rating}
                      onChange={() => {}}
                      required
                    />
                    <div className={`rating-star cursor-pointer h-10 w-10 ${
                      (hoverRating > 0 ? rating <= hoverRating : rating <= selectedRating) 
                        ? 'text-primary' 
                        : 'text-gray-300'
                    }`}>
                      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </label>
                ))}
              </div>
              {formErrors.stars && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.stars}</p>
              )}
            </div>
            
            <div className="mb-8">
              <label htmlFor="review" className="block mb-2 font-semibold">Vaše recenze</label>
              <textarea
                id="review"
                name="review"
                rows={6}
                className={`w-full p-3 rounded-lg border ${formErrors.text ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Popište vaši zkušenost s naší firmou a našimi službami..."
                required
              ></textarea>
              {formErrors.text && (
                <p className="mt-1 text-red-500 text-sm">{formErrors.text}</p>
              )}
            </div>
            
            <div className="flex justify-center">
              <Button 
                type="submit" 
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Odesílání...' : 'Odeslat recenzi'}
              </Button>
            </div>
            
            <p className="mt-6 text-center text-gray-500 text-sm">
              Odesláním recenze souhlasíte s jejím zveřejněním na našich webových stránkách.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WriteReviewPage; 
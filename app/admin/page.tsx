// Server Component
import AdminClient from './AdminClient';
import { API_URL } from '../config';
import { cookies } from 'next/headers';
import { verifyAuth } from '../api/admin/auth';

// Zajistí, že stránka bude vždy dynamická
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  try {
    const timestamp = Date.now();
    const res = await fetch(`${API_URL}/api/admin/references?_t=${timestamp}`, {
      method: 'GET',
      cache: 'no-store',
      next: { revalidate: 0 },
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      credentials: 'include'
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Chyba při načítání dat: ${res.status} ${res.statusText}. ${errorText}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error('Server nevrátil JSON data');
    }
   
    return res.json();
  } catch (error) {
    console.error('Chyba při načítání dat:', error);
    return []; // Vrátíme prázdné pole při chybě
  }
}

export default async function AdminPage() {
  // Ověření přihlášení
  const cookieStore = cookies();
  const { isAuthenticated } = await verifyAuth(cookieStore);

  // Pokud není přihlášen, předáme prázdná data
  const initialData = isAuthenticated ? await getData() : [];
  
  return <AdminClient initialData={initialData} />;
} 
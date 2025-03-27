import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface Reference extends RowDataPacket {
  id: number;
  email: string;
  location: string;
  stars: number;
  text: string;
  date: string; // formát: YYYY-MM-DD HH:mm:ss
  approved: boolean;
}

function validateReference(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Kontrola emailu
  if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
    errors.push('Email je povinný');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Neplatný formát emailu');
  }

  // Kontrola lokace
  if (!data.location || typeof data.location !== 'string' || data.location.trim().length === 0) {
    errors.push('Místo konání je povinné');
  }

  // Kontrola hodnocení
  if (!data.stars || typeof data.stars !== 'number' || data.stars < 1 || data.stars > 5) {
    errors.push('Hodnocení musí být číslo mezi 1 a 5');
  }

  // Kontrola textu recenze
  if (!data.text || typeof data.text !== 'string' || data.text.trim().length < 10) {
    errors.push('Text recenze musí obsahovat alespoň 10 znaků');
  }

  // Kontrola data
  if (!data.date || typeof data.date !== 'string' || 
      !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(data.date)) {
    errors.push('Neplatný formát data a času');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export async function GET() {
  console.log('Public: Začátek načítání referencí');
  try {
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
      console.error('Public: Chybí databázové proměnné prostředí');
      return NextResponse.json(
        { error: 'Chybí konfigurace databáze' },
        { status: 500 }
      );
    }

    console.log('Public: Získávání připojení k databázi');
    const connection = await pool.getConnection();
    try {
      // Nejprve zkontrolujeme všechny reference
      console.log('Public: Kontrola všech referencí');
      const [allRows] = await connection.execute<Reference[]>(
        'SELECT id, stars, text, location, date, approved FROM `references`'
      );
      console.log('Public: Všechny reference:', allRows);

      // Pak získáme pouze schválené
      console.log('Public: Načítání schválených referencí');
      const [rows] = await connection.execute<Reference[]>(
        'SELECT id, stars, text, location, date FROM `references` WHERE approved = true ORDER BY date DESC'
      );
      console.log('Public: Schválené reference:', rows);

      return NextResponse.json(rows);
    } catch (error) {
      console.error('Public: Chyba při SQL dotazu:', error);
      return NextResponse.json(
        { error: `Chyba při SQL dotazu: ${error instanceof Error ? error.message : 'Neznámá chyba'}` },
        { status: 500 }
      );
    } finally {
      console.log('Public: Uvolňování připojení');
      connection.release();
    }
  } catch (error) {
    console.error('Public: Chyba při načítání referencí:', error);
    return NextResponse.json(
      { 
        error: `Chyba při připojení k databázi: ${error instanceof Error ? error.message : 'Neznámá chyba'}`,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log('Public: Začátek ukládání reference');
  try {
    const data = await request.json();
    console.log('Public: Přijatá data:', data);

    // Validace vstupních dat
    if (!data.stars || !data.text || !data.location || !data.email || !data.date) {
      console.error('Public: Chybí povinné údaje:', data);
      return NextResponse.json(
        { error: 'Chybí povinné údaje' },
        { status: 400 }
      );
    }

    console.log('Public: Získávání připojení k databázi');
    const connection = await pool.getConnection();
    try {
      console.log('Public: Provádění SQL dotazu pro vložení');
      const [result] = await connection.execute(
        'INSERT INTO `references` (stars, text, location, email, date, approved) VALUES (?, ?, ?, ?, ?, false)',
        [data.stars, data.text, data.location, data.email, data.date]
      );
      console.log('Public: Reference úspěšně uložena:', result);
      
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Public: Chyba při SQL dotazu:', error);
      throw error;
    } finally {
      console.log('Public: Uvolňování připojení');
      connection.release();
    }
  } catch (error) {
    console.error('Public: Chyba při ukládání reference:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Chyba při ukládání reference: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Chyba při ukládání reference' },
      { status: 500 }
    );
  }
} 
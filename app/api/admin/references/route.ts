import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { cookies } from 'next/headers';
import { verifyAuth } from '../auth';

interface Reference extends RowDataPacket {
  id: number;
  email: string;
  location: string;
  stars: number;
  text: string;
  date: string;
  approved: boolean;
}

export async function GET() {
  console.log('Admin: Začátek načítání referencí');
  try {
    // Ověření autentizace
    const cookieStore = cookies();
    const authResult = await verifyAuth(cookieStore);
    
    if (!authResult.isAuthenticated) {
      console.log('Admin: Neautorizovaný přístup k referencím');
      return NextResponse.json(
        { error: 'Neautorizovaný přístup' },
        { status: 401 }
      );
    }

    console.log('Admin: Získávání připojení k databázi');
    const connection = await pool.getConnection();
    try {
      console.log('Admin: Načítání všech referencí');
      const [rows] = await connection.execute<Reference[]>(
        'SELECT * FROM `user_references` ORDER BY date DESC'
      );
      console.log('Admin: Reference načteny, počet:', rows.length);

      return new NextResponse(JSON.stringify(rows), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });
    } catch (error) {
      console.error('Admin: Chyba při SQL dotazu:', error);
      throw error;
    } finally {
      console.log('Admin: Uvolňování připojení');
      connection.release();
    }
  } catch (error) {
    console.error('Admin: Chyba při načítání referencí:', error);
    return NextResponse.json(
      { error: 'Chyba při načítání referencí' },
      { status: 500 }
    );
  }
}

// Přidáme OPTIONS handler pro CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
} 
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

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
    console.log('Admin: Získávání připojení k databázi');
    const connection = await pool.getConnection();
    try {
      console.log('Admin: Načítání všech referencí');
      const [rows] = await connection.execute<Reference[]>(
        'SELECT * FROM `user_references` ORDER BY date DESC'
      );
      console.log('Admin: Reference načteny:', rows);

      return NextResponse.json(rows, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
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
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: `Chyba při načítání referencí: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 
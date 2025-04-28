import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { id, approved } = await request.json();

    console.log('Admin: Získávání připojení k databázi');
    const client = await pool.connect();
    try {
      console.log('Admin: Provádění SQL dotazu pro aktualizaci');
      const result = await client.query(
        'UPDATE user_references SET approved = $1 WHERE id = $2 RETURNING *',
        [approved, id]
      );
      console.log('Admin: Výsledek aktualizace:', result.rowCount);

      if (result.rowCount === 0) {
        console.error('Admin: Reference nebyla nalezena:', id);
        return NextResponse.json(
          { error: 'Reference nebyla nalezena' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Admin: Chyba při SQL dotazu:', error);
      throw error;
    } finally {
      console.log('Admin: Uvolňování připojení');
      client.release();
    }
  } catch (error) {
    console.error('Error updating reference:', error);
    return NextResponse.json(
      { success: false, message: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 
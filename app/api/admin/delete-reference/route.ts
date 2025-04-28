import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    console.log('Admin: Získávání připojení k databázi pro smazání reference');
    const client = await pool.connect();
    try {
      console.log('Admin: Provádění SQL dotazu pro smazání');
      const result = await client.query(
        'DELETE FROM user_references WHERE id = $1 RETURNING *',
        [id]
      );
      console.log('Admin: Výsledek smazání:', result.rowCount);

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
    console.error('Error deleting reference:', error);
    return NextResponse.json(
      { success: false, message: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 
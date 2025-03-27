import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(request: Request) {
  try {
    const { id, approved } = await request.json();

    console.log('Admin: Získávání připojení k databázi');
    const connection = await pool.getConnection();
    try {
      console.log('Admin: Provádění SQL dotazu pro aktualizaci');
      const [result] = await connection.execute<ResultSetHeader>(
        'UPDATE `references` SET approved = ? WHERE id = ?',
        [approved, id]
      );
      console.log('Admin: Výsledek aktualizace:', result);

      if (result.affectedRows === 0) {
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
      connection.release();
    }
  } catch (error) {
    console.error('Error updating reference:', error);
    return NextResponse.json(
      { success: false, message: 'Interní chyba serveru' },
      { status: 500 }
    );
  }
} 
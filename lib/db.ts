import { Pool } from 'pg';

export function createPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error('Chybí povinná proměnná prostředí DATABASE_URL');
  }
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 1,
  });
}


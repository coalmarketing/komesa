import { Pool } from 'pg';
import { getEnv } from './env';

export function createPool(): Pool {
  const connectionString = getEnv('DATABASE_URL');
  if (!connectionString) {
    throw new Error('Chybí povinná proměnná prostředí DATABASE_URL');
  }
  return new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 1,
  });
}
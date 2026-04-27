import { Pool } from 'pg';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export function createPool(): Pool {
  let connectionString: string | undefined;

  try {
    const { env } = getCloudflareContext();
    const hyperdrive = (env as any).HYPERDRIVE;
    console.log('[db] getCloudflareContext ok, HYPERDRIVE:', hyperdrive ? 'present' : 'missing');
    if (hyperdrive?.connectionString) {
      connectionString = hyperdrive.connectionString;
      console.log('[db] Using Hyperdrive connection string');
    }
  } catch (e) {
    console.log('[db] getCloudflareContext failed (local dev?):', String(e));
  }

  if (!connectionString) {
    connectionString = process.env.DATABASE_URL;
  }

  if (!connectionString) {
    throw new Error('Chybí proměnná DATABASE_URL nebo Hyperdrive binding');
  }

  return new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 1,
  });
}

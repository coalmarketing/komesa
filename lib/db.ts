import { Pool } from 'pg';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export function createPool(): Pool {
  let connectionString: string | undefined;

  // On Cloudflare Workers, HYPERDRIVE binding provides the connection string
  try {
    const { env } = getCloudflareContext();
    if ((env as any).HYPERDRIVE?.connectionString) {
      connectionString = (env as any).HYPERDRIVE.connectionString;
    }
  } catch {
    // Not running on Cloudflare (local dev with next dev)
  }

  // Fallback to DATABASE_URL for local development
  connectionString ??= process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('Chybí proměnná DATABASE_URL nebo Hyperdrive binding');
  }

  return new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 1,
  });
}

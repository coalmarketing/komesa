import { Pool } from 'pg';
import { getEnv } from './env';

export function createPool(): Pool {
  // On Cloudflare Workers, use Hyperdrive connection string if available
  let connectionString: string | undefined;
  try {
    const { getCloudflareContext } = require('@opennextjs/cloudflare');
    const { env } = getCloudflareContext();
    if (env.HYPERDRIVE?.connectionString) {
      connectionString = env.HYPERDRIVE.connectionString;
    }
  } catch {
    // Not running on Cloudflare
  }
  connectionString ??= getEnv('DATABASE_URL');
  if (!connectionString) {
    throw new Error('Chybí proměnná DATABASE_URL nebo Hyperdrive binding');
  }
  return new Pool({
    connectionString,
    ssl: getEnv('NODE_ENV') !== 'development' ? { rejectUnauthorized: false } : false,
    max: 1,
  });
}

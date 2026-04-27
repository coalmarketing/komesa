import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * Safely read an environment variable.
 * Prefers Cloudflare bindings (vars + secrets) when running on Workers,
 * falls back to process.env (Node.js / Next.js dev).
 */
export function getEnv(key: string): string | undefined {
  try {
    const { env } = getCloudflareContext();
    const value = (env as unknown as Record<string, unknown>)[key];
    if (typeof value === 'string' && value.length > 0) {
      return value;
    }
  } catch {
    // getCloudflareContext throws when not running on Cloudflare (e.g. local dev)
  }
  return process.env[key];
}

import { getEnv } from '@/lib/env';

export const API_URL = getEnv('NODE_ENV') === 'development'
  ? 'http://localhost:3000'
  : getEnv('NEXT_PUBLIC_SITE_URL') || 'https://komesa.cz';

export const FRONTEND_URL = getEnv('NODE_ENV') === 'development'
  ? 'http://localhost:3000'
  : getEnv('NEXT_PUBLIC_SITE_URL') || 'https://komesa.cz';
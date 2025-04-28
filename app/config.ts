export const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_SITE_URL || 'https://komesa.vercel.app';

export const FRONTEND_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_SITE_URL || 'https://komesa.vercel.app'; 
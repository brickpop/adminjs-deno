import { load } from 'https://deno.land/std@0.215.0/dotenv/mod.ts';

const env = await load({ allowEmptyValues: true });

export const DATABASE_URI = env['DATABASE_URL'] || '';
export const COOKIE_SECRET = env['COOKIE_SECRET'] || '1234567890abcdefghijklmnopqrstuvwxyz';
export const PORT = env['PORT'] || '3000';
export const NODE_ENV = env['NODE_ENV'] || '';

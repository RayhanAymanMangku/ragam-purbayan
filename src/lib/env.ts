import dotenv from 'dotenv';
dotenv.config();

export const NEXT_PUBLIC_SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
export const NEXT_PUBLIC_SUPABASE_ANON_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || ""

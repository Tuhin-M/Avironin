import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Use placeholder values during build if credentials are missing
const isMissingCredentials = !supabaseUrl || !supabaseAnonKey;

if (isMissingCredentials) {
    console.warn('Supabase URL or Anon Key is missing. Database features will be non-functional.');
}

// Supabase client requires valid URL format, use placeholder during build
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'placeholder-anon-key';

export const supabase = createClient(url, key);
export const hasSupabaseCredentials = !isMissingCredentials;

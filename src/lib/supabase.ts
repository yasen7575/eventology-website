import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined in .env.local');
}

let supabaseClient: SupabaseClient;

if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'mock-anon-key') {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    supabaseClient = require('./supabase-mock-server').mockServerClient as unknown as SupabaseClient;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    supabaseClient = require('./supabase-mock-client').mockBrowserClient as unknown as SupabaseClient;
  }
} else {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey!);
}

export const supabase = supabaseClient;

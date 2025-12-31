import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isMockMode = !supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'mock-anon-key';

let supabaseClient: SupabaseClient;

if (isMockMode) {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    supabaseClient = require('./supabase-mock-server').mockServerClient as unknown as SupabaseClient;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    supabaseClient = require('./supabase-mock-client').mockBrowserClient as unknown as SupabaseClient;
  }
} else {
  supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!);
}

export const supabase = supabaseClient;

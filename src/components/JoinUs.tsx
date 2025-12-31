import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import JoinUsClient from './JoinUsClient';

// This is a Server Component, responsible for fetching initial data securely.
export default async function JoinUs() {
  const cookieStore = await cookies();

  let supabase;

  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'mock-anon-key') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { mockServerClient } = require('@/lib/supabase-mock-server');
    supabase = mockServerClient;
  } else {
    supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );
  }

  let isEnabled = true;
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'join_form_locked')
      .single();

    if (error) {
      // If the table is empty or the key doesn't exist, it will error. Default to enabled.
      isEnabled = true;
    } else {
      isEnabled = !data.value;
    }

  } catch (error) {
    console.error("Failed to fetch form status:", error);
    isEnabled = true;
  }

  return <JoinUsClient isEnabled={isEnabled} />;
}

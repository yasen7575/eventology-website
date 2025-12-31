import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const createSupabaseAdmin = async () => {
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'mock-anon-key') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('@/lib/supabase-mock-server').mockServerClient;
  }
  const cookieStore = await cookies();
  return createServerClient(
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
};

export async function POST(request: NextRequest) {
  const supabaseAdmin = await createSupabaseAdmin();
  const applicationData = await request.json();

  try {
    console.log('API POST /applications: processing', applicationData);
    const { data, error } = await supabaseAdmin
      .from('applications')
      .insert([applicationData])
      .select();

    if (error) {
      console.error('API POST /applications: supabase error', error);
      throw error;
    }

    console.log('API POST /applications: success', data);
    return NextResponse.json(data);
  } catch (err) {
    console.error('API POST /applications: fatal error', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

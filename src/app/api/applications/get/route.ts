import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SUPER_ADMIN_EMAIL = "ya3777250@gmail.com";

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

export async function GET(request: NextRequest) {
  const supabaseAdmin = await createSupabaseAdmin();
  const { data: { user } } = await supabaseAdmin.auth.getUser();

  if (!user || user.email !== SUPER_ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('API GET /applications/get: count', data?.length, 'error', error);

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('API GET /applications/get: fatal error', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

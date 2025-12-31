import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SUPER_ADMIN_EMAIL = "ya3777250@gmail.com";

const createSupabaseAdmin = async () => {
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
  const { join_form_locked } = await request.json();

  const { data: { user } } = await supabaseAdmin.auth.getUser();

  if (!user || user.email !== SUPER_ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .update({ value: join_form_locked })
      .eq('key', 'join_form_locked')
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

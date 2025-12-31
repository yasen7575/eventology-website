import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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
  const applicationData = await request.json();

  try {
    const { data, error } = await supabaseAdmin
      .from('applications')
      .insert([applicationData])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

// Get all gallery items
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const published = searchParams.get('published');
  const type = searchParams.get('type');

  let query = supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  if (published === 'true') {
    query = query.eq('published', true);
  }

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ gallery: data });
}

// Create gallery item
export async function POST(req: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { type, url, thumbnail_url, published } = body;

    const { data, error } = await supabase
      .from('gallery')
      .insert({
        type,
        url,
        thumbnail_url,
        published: published !== undefined ? published : true,
      })
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ gallery: data }, { status: 201 });
  } catch (error: any) {
    console.error('Create gallery error:', error);
    return NextResponse.json({ error: error?.message || 'Invalid request' }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

// Get all news (for dashboard) or latest 3 published (for homepage)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit');
  const published = searchParams.get('published');

  let query = supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (published === 'true') {
    query = query.eq('published', true);
  }

  if (limit) {
    query = query.limit(parseInt(limit));
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ news: data });
}

// Create news
export async function POST(req: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const supabaseAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title_ar, title_en, content_ar, content_en, images, published } = body;

    const { data, error } = await supabase
      .from('news')
      .insert({
        title_ar,
        title_en,
        content_ar,
        content_en,
        images: images || [],
        published: published || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ news: data }, { status: 201 });
  } catch (error: any) {
    console.error('Create news error:', error);
    return NextResponse.json({ error: error?.message || 'Invalid request' }, { status: 400 });
  }
}

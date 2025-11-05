import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

async function checkAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;

  if (!accessToken) return null;

  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { user }, error } = await supabaseAuth.auth.getUser(accessToken);
  if (error || !user) return null;

  return user;
}

// Get single gallery item
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
  }

  return NextResponse.json({ gallery: data });
}

// Update gallery item
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title_ar, title_en, description_ar, description_en, type, url, thumbnail_url, published, order_index } = body;

    const { data, error } = await supabase
      .from('gallery')
      .update({
        title_ar,
        title_en,
        description_ar,
        description_en,
        type,
        url,
        thumbnail_url,
        published,
        order_index,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ gallery: data });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Invalid request' }, { status: 400 });
  }
}

// Delete gallery item
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}

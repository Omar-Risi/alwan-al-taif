import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

// Helper function to check authentication
async function checkAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;

  if (!accessToken) {
    return null;
  }

  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { user }, error } = await supabaseAuth.auth.getUser(accessToken);

  if (error || !user) {
    return null;
  }

  return user;
}

// Get single news
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  console.log('GET /api/news/[id] - Fetching news with ID:', id);
  
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('GET /api/news/[id] - Error:', error);
    return NextResponse.json({ error: 'News not found', details: error.message }, { status: 404 });
  }

  console.log('GET /api/news/[id] - Found news:', data.title_ar);
  return NextResponse.json({ news: data });
}

// Update news
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check authentication
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title_ar, title_en, content_ar, content_en, images, published } = body;

    console.log('PUT /api/news/[id] - Updating news:', id);

    const { data, error } = await supabase
      .from('news')
      .update({
        title_ar,
        title_en,
        content_ar,
        content_en,
        images,
        published,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('PUT /api/news/[id] - Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('PUT /api/news/[id] - Update successful');
    return NextResponse.json({ news: data });
  } catch (error: any) {
    console.error('PUT /api/news/[id] - Error:', error);
    return NextResponse.json({ error: error?.message || 'Invalid request' }, { status: 400 });
  }
}

// Delete news
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Check authentication
    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('DELETE /api/news/[id] - Deleting news:', id);

    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('DELETE /api/news/[id] - Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('DELETE /api/news/[id] - Delete successful');
    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error: any) {
    console.error('DELETE /api/news/[id] - Error:', error);
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Convert file to ArrayBuffer (works better with Supabase)
    const arrayBuffer = await file.arrayBuffer();

    console.log('Uploading file:', filePath, 'Size:', arrayBuffer.byteLength, 'Type:', file.type);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('news-images')
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      
      // Check if bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      console.log('Available buckets:', buckets?.map(b => b.name));
      
      return NextResponse.json({ 
        error: error.message,
        hint: 'Run the SQL in supabase-storage-setup.sql to create the bucket and policies'
      }, { status: 500 });
    }

    console.log('Upload successful:', data);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('news-images')
      .getPublicUrl(filePath);

    console.log('Public URL:', publicUrl);

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: error?.message || 'Upload failed',
      details: 'Check server logs for more information'
    }, { status: 500 });
  }
}

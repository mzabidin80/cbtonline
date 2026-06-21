import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    // Membaca payload 'passwordBaru' yang dikirim dari form modal layout admin
    const { username, passwordBaru } = await request.json();

    if (!username || !passwordBaru) {
      return NextResponse.json(
        { message: 'Username dan password baru wajib diisi.' },
        { status: 400 }
      );
    }

    // Eksekusi update langsung ke tabel baru 'user_admin'
    const { error } = await supabase
      .from('user_admin')
      .update({ password: passwordBaru })
      .eq('username', username);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: 'Password admin berhasil diperbarui di database Supabase.' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan sistem backend.' },
      { status: 500 }
    );
  }
}
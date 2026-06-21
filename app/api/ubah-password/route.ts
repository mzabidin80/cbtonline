import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { username, namaLengkap, passwordBaru } = await request.json();

    if (!passwordBaru) {
      return NextResponse.json(
        { message: 'Password baru wajib diisi.' },
        { status: 400 }
      );
    }

    // Lakukan update. Kita cari berdasarkan username, jika tidak ada kita cari berdasarkan nama_lengkap
    let query = supabase.from('user_admin').update({ password: passwordBaru });

    if (username) {
      query = query.eq('username', username);
    } else if (namaLengkap) {
      query = query.eq('nama_lengkap', namaLengkap);
    } else {
      return NextResponse.json(
        { message: 'Gagal mengidentifikasi Admin yang sedang login.' },
        { status: 400 }
      );
    }

    const { error, count } = await query;

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
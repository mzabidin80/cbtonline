import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username dan password wajib diisi.' },
        { status: 400 }
      );
    }

    // 🔍 SEKARANG PERIKSA LANGSUNG KE TABEL user_admin
    const { data: admin, error } = await supabase
      .from('user_admin')
      .select('*')
      .eq('username', username)
      .single();

    // Jika username tidak ditemukan atau terjadi error di Supabase
    if (error || !admin) {
      return NextResponse.json(
        { message: 'Username atau Password Admin salah!' },
        { status: 401 }
      );
    }

    // Pengecekan kecocokan password
    // Catatan: Jika Anda menggunakan enkripsi (seperti bcrypt), gunakan compare() di sini.
    if (admin.password !== password) {
      return NextResponse.json(
        { message: 'Username atau Password Admin salah!' },
        { status: 401 }
      );
    }

    // Jika sukses, kembalikan data admin beserta token/role
    return NextResponse.json({
      message: 'Login Berhasil',
      user: {
        username: admin.username,
        nama: admin.nama_lengkap,
        role: 'admin' // Tetap set sebagai admin untuk kebutuhan localStorage di frontend
      }
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan sistem backend.' },
      { status: 500 }
    );
  }
}
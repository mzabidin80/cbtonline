'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Konfigurasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  // 🔥 PERBAIKAN 1: Sesuaikan dengan isi database (yaitu 'peserta')
  const [role, setRole] = useState('peserta'); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 🔥 PERBAIKAN 2: Tambahkan .single() agar outputnya langsung jadi objek
      const { data, error } = await supabase
        .from('user_peserta')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        setErrorMsg('Username atau kata sandi tidak sesuai!');
        setLoading(false);
        return;
      }

      // Pastikan perannya sesuai
      if (data.role !== 'peserta' && data.role !== 'mahasiswa') {
        setErrorMsg('Akses ditolak: Akun Anda bukan peserta ujian.');
        setLoading(false);
        return;
      }

      // Ambil nama lengkap dari database
      const namaLengkap = data.nama_lengkap || data.nama || data.username || 'Peserta Ujian';
      const roleUser = data.role || 'peserta';

      // Simpan sesi ke LocalStorage browser
      localStorage.setItem('user_nama', String(namaLengkap));
      localStorage.setItem('user_username', String(data.username));
      localStorage.setItem('user_role', String(roleUser).toLowerCase());

      // Pindahkan ke halaman Dashboard Peserta
      window.location.href = '/dashboard';

    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <title>Login Peserta - CBT Online</title>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Selamat Datang</h2>
          <p className="mt-2 text-sm text-gray-500">Sistem CBT Online MZA FEB ULM</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-700 rounded-xl font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="rounded-md space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Masuk Sebagai</label>
              <div className="w-full bg-slate-100 border border-slate-300 px-4 py-3 rounded-xl font-bold text-slate-700 flex items-center gap-2 cursor-not-allowed">
                🎓 Mahasiswa (Peserta Ujian)
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Username / NIM</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Masukkan NIM atau Username"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Kata Sandi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg disabled:opacity-50 mt-2"
            >
              {loading ? 'Memverifikasi Data...' : 'Masuk Ke Sistem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
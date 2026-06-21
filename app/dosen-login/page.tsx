'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DosenLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginDosen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 🎯 Hubungkan ke tabel user_dosen sesuai database Supabase Anda
      const { data, error } = await supabase
        .from('user_dosen')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        setErrorMsg('Username atau kata sandi Dosen tidak sesuai!');
        setLoading(false);
        return;
      }

      // Ambil nama lengkap dari database user_dosen
      const namaLengkap = data.nama_lengkap || data.username || 'Dosen Pengajar';

      // Simpan session ke LocalStorage dengan key yang seragam
      localStorage.setItem('dosen_username', String(data.username));
      localStorage.setItem('dosen_nama', String(namaLengkap));

      // Pindahkan ke halaman Dashboard Dosen Anda
      window.location.href = '/dosen';

    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi ke server database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <title>Login Dosen - CBT Online</title>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Portal Dosen</h2>
          <p className="mt-2 text-sm text-slate-500">Sistem CBT Online MZA FEB ULM</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLoginDosen}>
          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-700 rounded-xl font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="rounded-md space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Masuk Sebagai</label>
              <div className="w-full bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl font-bold text-emerald-700 flex items-center gap-2 cursor-not-allowed">
                👨‍🏫 Dosen / Pengajar Ujian
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Username / NIDN Dosen</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="Masukkan Username Dosen"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Kata Sandi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-lg disabled:opacity-50 mt-2"
            >
              {loading ? 'Memverifikasi Akun Dosen...' : 'Masuk Panel Dosen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
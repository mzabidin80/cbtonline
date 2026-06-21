'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PengawasLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginPengawas = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 🎯 Mengambil data dari tabel user_pengawas
      const { data, error } = await supabase
        .from('user_pengawas')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        setErrorMsg('ID atau kata sandi Pengawas salah!');
        setLoading(false);
        return;
      }

      const namaLengkap = data.nama_lengkap || data.nama || 'Pengawas MZA';

      // 🚀 INI KUNCI UTAMANYA: Menyimpan "KTP" Pengawas ke browser!
      localStorage.setItem('user_nama', String(namaLengkap));
      localStorage.setItem('user_username', String(data.username)); // <--- BIKIN ID MUNCUL
      localStorage.setItem('user_role', 'pengawas');

      // Arahkan ke Dashboard
      window.location.href = '/pengawas';

    } catch (err) {
      setErrorMsg('Gagal terhubung ke database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <title>Login Pengawas - CBT Online</title>

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Portal Pengawas</h2>
          <p className="mt-2 text-sm text-slate-500">Sistem CBT Online MZA FEB ULM</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLoginPengawas}>
          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-700 rounded-xl font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="rounded-md space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Masuk Sebagai</label>
              <div className="w-full bg-indigo-50 border border-indigo-200 px-4 py-3 rounded-xl font-bold text-indigo-700 flex items-center gap-2 cursor-not-allowed">
                👨‍💼 Pengawas Ruang Ujian
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">ID Pengawas</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Masukkan ID Pengawas"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Kata Sandi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-lg mt-2"
            >
              {loading ? 'Memverifikasi...' : 'Masuk Panel Pengawas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

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
      const { data, error } = await supabase
        .from('user_pengawas')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        throw new Error('Username atau Kata Sandi salah!');
      }

      // Kunci proteksi: Hanya akun dengan role 'pengawas' yang boleh masuk
      if (data.role !== 'pengawas') {
        throw new Error('Akses Ditolak! Akun Anda tidak terdaftar sebagai Pengawas.');
      }

      localStorage.setItem('user_nama', data.nama_lengkap);
      localStorage.setItem('user_role', data.role);
      
      // Alihkan langsung ke dashboard khusus pengawas
      window.location.href = '/pengawas';
      
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-950 p-4">
      <title>Login Pengawas - CBT Online</title>

      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-indigo-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Portal Pengawas CBT</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">Silakan masuk menggunakan akun Pengawas Anda.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold text-center mb-6 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginPengawas} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Username / ID Pengawas</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Masukkan username..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Kata Sandi</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg disabled:opacity-50 mt-4"
          >
            {loading ? 'Memverifikasi...' : 'Masuk Portal Pengawas'}
          </button>
        </form>
      </div>
    </div>
  );
}
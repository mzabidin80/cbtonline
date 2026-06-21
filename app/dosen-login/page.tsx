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
      const { data, error } = await supabase
        .from('users_cbt')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        throw new Error('Username atau Kata Sandi salah!');
      }

      // Validasi agar hanya role dosen / pengawas yang bisa masuk
      if (data.role !== 'dosen' && data.role !== 'pengawas') {
        throw new Error('Akses Ditolak! Akun ini tidak terdaftar sebagai Dosen/Pengawas.');
      }

      // Simpan sesi ke localStorage
      localStorage.setItem('user_nama', data.nama_lengkap);
      localStorage.setItem('user_role', data.role);
      
      // Alihkan ke Dashboard Dosen
      window.location.href = '/dosen';
      
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-950 p-4">
      <title>Login Dosen - CBT Online</title>

      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-800">Portal Login Dosen</h1>
          <p className="text-sm text-slate-500 mt-2">Silakan login untuk memonitoring atau mengelola ujian.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold text-center mb-6 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginDosen} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="Masukkan username dosen..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Kata Sandi</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg disabled:opacity-50 mt-4"
          >
            {loading ? 'Memeriksa Data...' : 'Masuk Portal Dosen'}
          </button>
        </form>
      </div>
    </div>
  );
}
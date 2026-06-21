'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';

// Konfigurasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Memeriksa data pengguna di database
      const { data, error } = await supabase
        .from('user_admin')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        throw new Error('Username atau Password Admin salah!');
      }

      // Pastikan rolenya benar-benar "admin"
      if (data.role !== 'admin') {
        throw new Error('Akses Ditolak! Anda tidak memiliki izin administrator.');
      }

      // Simpan sesi login ke browser
      localStorage.setItem('user_nama', data.nama_lengkap);
      localStorage.setItem('user_role', data.role);
      
      // Arahkan ke Dashboard Admin
      window.location.href = '/admin';
      
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      {/* Ini untuk mengubah Judul di Tab Browser */}
      <title>Login Administrator - CBT Online</title>

      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        
        {/* INI BAGIAN JUDUL HALAMAN YANG DIPERBAIKI */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-800">Portal Administrator CBT</h1>
          <p className="text-sm text-slate-500 mt-2">Silakan login menggunakan akun Admin Anda.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold text-center mb-6 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginAdmin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Masukkan username admin..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Kata Sandi</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg disabled:opacity-50 mt-4"
          >
            {loading ? 'Memeriksa Data...' : 'Masuk ke Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
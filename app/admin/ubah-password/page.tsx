'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Konfigurasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function UbahPasswordAdminPage() {
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', isError: false });

    // Validasi kesamaan password input
    if (passwordBaru !== konfirmasiPassword) {
      setMessage({ text: 'Konfirmasi password baru tidak cocok!', isError: true });
      setLoading(false);
      return;
    }

    try {
      // Mengambil username admin yang sedang aktif dari session login localStorage
      const currentUsername = localStorage.getItem('user_username') || 'admin';

      // Proses update langsung ke tabel user_admin di database Supabase
      const { data, error } = await supabase
        .from('user_admin')
        .update({ password: passwordBaru })
        .eq('username', currentUsername);

      if (error) throw error;

      setMessage({ text: 'Sandi BERHASIL diperbarui di database Supabase!', isError: false });
      setPasswordBaru('');
      setKonfirmasiPassword('');

    } catch (err: any) {
      console.error(err);
      setMessage({ text: 'Gagal memperbarui sandi: ' + err.message, isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 mt-10">
      <title>Ubah Password Admin - CBT Online</title>
      
      <div className="flex items-center gap-2 mb-6 text-slate-800">
        <span className="text-xl">🔑</span>
        <h3 className="text-lg font-bold">Ubah Password Administrator</h3>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-semibold mb-5 border ${
          message.isError 
            ? 'bg-red-50 text-red-600 border-red-200' 
            : 'bg-emerald-50 text-emerald-600 border-emerald-200'
        }`}>
          {message.isError ? '⚠️ ' : '✅ '} {message.text}
        </div>
      )}

      <form onSubmit={handleUpdatePassword} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
            Username / NIM Anda
          </label>
          <input
            type="text"
            disabled
            value="admin"
            className="w-full bg-slate-100 border border-slate-200 px-4 py-3 rounded-xl text-slate-500 font-medium cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Password Baru
          </label>
          <input
            type="password"
            required
            value={passwordBaru}
            onChange={(e) => setPasswordBaru(e.target.value)}
            className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
            placeholder="Masukkan password baru..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            Konfirmasi Password Baru
          </label>
          <input
            type="password"
            required
            value={konfirmasiPassword}
            onChange={(e) => setKonfirmasiPassword(e.target.value)}
            className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
            placeholder="Ulangi password baru..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}
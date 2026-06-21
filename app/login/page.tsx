'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const [role, setRole] = useState('mahasiswa');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase
        .from('user_peserta')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .ilike('role', role);

      if (error) {
        setErrorMsg('Terjadi kesalahan kueri ke database.');
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setErrorMsg('Username, password, atau peran tidak sesuai dengan database!');
        setLoading(false);
        return;
      }

      const user = data as any;
      
      // ✨ DETEKSI MULTI-KOLOM: Mengantisipasi segala bentuk variasi struktur tabel Supabase Anda
      const namaLengkap = user.nama_lengkap || user.nama || user.name || user.username || 'Budi Santoso';
      const roleUser = user.role || 'mahasiswa';

      localStorage.setItem('user_nama', String(namaLengkap));
      localStorage.setItem('user_username', String(user.username));
      localStorage.setItem('user_role', String(roleUser).toLowerCase());

      alert(`Selamat Datang, ${namaLengkap}! Login Berhasil.`);
      window.location.href = '/dashboard';

    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Selamat Datang</h2>
          <p className="mt-2 text-sm text-gray-500">Sistem CBT Online MZA FEB ULM</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-700 rounded-xl">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="rounded-md space-y-4">
        <div>
         <label className="block text-sm font-bold text-slate-700 mb-1">Masuk Sebagai</label>
         <div className="w-full bg-slate-100 border border-slate-300 px-4 py-3 rounded-xl font-medium text-slate-700 flex items-center gap-2">
         🎓 Mahasiswa (Peserta Ujian)
         </div>
         {/* Kita kunci role-nya di latar belakang agar tetap mengirimkan nilai 'mahasiswa' saat tombol ditekan */}
         </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username / NIM</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl text-gray-900"
                placeholder="Masukkan NIM atau Username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl text-gray-900"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              {loading ? 'Memverifikasi...' : 'Masuk Ke Sistem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
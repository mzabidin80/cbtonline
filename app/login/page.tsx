'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Mengaktifkan koneksi Supabase menggunakan Environment Variables yang sudah kita pasang di Vercel
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
      // Mencari pengguna di tabel Supabase yang cocok dengan username, password, dan role-nya
      const { data, error } = await supabase
        .from('users_cbt')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .eq('role', role)
        .single();

      if (error || !data) {
        setErrorMsg('Username, password, atau peran yang Anda pilih salah!');
      } else {
        alert(`Selamat Datang, ${data.nama_lengkap}! Login Berhasil.`);
        // Di sini nantinya kita akan arahkan (redirect) ke halaman dashboard masing-masing role
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-2xl">
            MZA
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            Selamat Datang
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sistem CBT Online MZA FEB ULM
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-xl text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          <div className="rounded-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Masuk Sebagai
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              >
                <option value="mahasiswa">🎓 Mahasiswa (Peserta Ujian)</option>
                <option value="pengawas">👁️ Pengawas / Dosen</option>
                <option value="admin">🛠️ Administrator Sistem</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {role === 'mahasiswa' ? 'Nomor Induk Mahasiswa (NIM)' : 'Username / NIP'}
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === 'mahasiswa' ? 'Contoh: 2010312310001' : 'Contoh: admin123'}
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kata Sandi (Password)
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Memverifikasi...' : 'Masuk Ke Sistem'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
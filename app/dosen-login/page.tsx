'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DosenLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // Cek kecocokan data ke tabel user_dosen
      const { data, error } = await supabase
        .from('user_dosen')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        setErrorMsg('Username tidak ditemukan di sistem akademik!');
        setLoading(false);
        return;
      }

      // Validasi password (Plain Text untuk fase development/testing)
      if (data.password !== password) {
        setErrorMsg('Password yang Anda masukkan salah!');
        setLoading(false);
        return;
      }

      // Jika berhasil, simpan session sederhana ke localStorage (Opsional)
      localStorage.setItem('user_role', data.hak_akses);
      localStorage.setItem('user_nama', data.nama_lengkap);

      alert(`Selamat Datang, ${data.nama_lengkap}!`);
      
      // Redirect ke halaman utama dashboard dosen
      router.push('/dosen');
    } catch (err: any) {
      setErrorMsg('Terjadi gangguan koneksi ke server.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <span className="text-3xl">👨‍🏫</span>
          <h2 className="text-xl font-black text-slate-800 tracking-wide uppercase">LOGIN PORTAL DOSEN</h2>
          <p className="text-xs text-slate-400 font-medium">Sistem Kontrol Utama Ujian CBT Online</p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 text-rose-600 border border-rose-100 p-3 rounded-xl text-xs font-bold text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Username NIDN</label>
            <input
              type="text"
              required
              placeholder="Contoh: dosen123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-700 outline-none focus:border-indigo-600 transition"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sandi Akses</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-700 outline-none focus:border-indigo-600 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-bold text-xs py-3 rounded-xl shadow-md transition"
          >
            {loading ? 'Memvalidasi Kredensial...' : 'Masuk Dashboard Dosen'}
          </button>
        </form>
      </div>
    </div>
  );
}
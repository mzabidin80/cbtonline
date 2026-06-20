'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const [role, setRole] = useState('mahasiswa'); // Default lowercase murni
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Menggunakan pencarian case-insensitive (.ilike) agar lebih aman untuk role
      const { data, error } = await supabase
        .from('users_cbt')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .ilike('role', role) as any;

      if (error) {
        setErrorMsg('Terjadi kesalahan kueri ke database.');
        setLoading(false);
        return;
      }

      // PENGAMAN UTAMA: Jika data kosong / tidak cocok dengan kombinasi di database
      if (!data || data.length === 0) {
        setErrorMsg('Username, password, atau peran tidak sesuai dengan database!');
        setLoading(false);
        return; // Hentikan proses, jangan teruskan ke alert/dashboard
      }

      // Jika data ditemukan dengan sukses
      const user = data;
      const namaLengkap = user.nama_lengkap || 'Pengguna';
      const roleUser = user.role || 'mahasiswa';

      // Memunculkan nama asli dari kolom database secara akurat
      alert(`Selamat Datang, ${namaLengkap}! Login Berhasil.`);

      // Simpan data string murni ke penyimpanan lokal browser
      localStorage.setItem('user_role', String(roleUser).toLowerCase());
      localStorage.setItem('user_nama', String(namaLengkap));

      // Pindah ke halaman dashboard setelah sukses
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
            <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-700 rounded-xlMAE">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="rounded-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Masuk Sebagai</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white"
              >
                {/* Value WAJIB huruf kecil murni agar sinkron dengan Supabase */}
                <option value="mahasiswa">🎓 Mahasiswa (Peserta Ujian)</option>
                <option value="pengawas">👁️ Pengawas / Dosen</option>
                <option value="admin">🛠️ Administrator Sistem</option>
              </select>
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
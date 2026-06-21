'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Konfigurasi Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PesertaDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State untuk Modal Pop-up Ubah Password Peserta
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);
  const [usernamePeserta, setUsernamePeserta] = useState('');
  const [namaPeserta, setNamaPeserta] = useState('Peserta');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesanError, setPesanError] = useState('');

  useEffect(() => {
    // Mengambil data sesi login mahasiswa dari localStorage
    const storedUsername = localStorage.getItem('user_username');
    const storedNama = localStorage.getItem('user_nama');
    if (storedUsername) setUsernamePeserta(storedUsername);
    if (storedNama) setNamaPeserta(storedNama);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; // Sesuaikan dengan jalur halaman login peserta Anda
  };

  const handleSimpanPasswordPeserta = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesanError('');

    if (passwordBaru !== konfirmasiPassword) {
      setPesanError('Konfirmasi password baru tidak cocok!');
      return;
    }

    if (passwordBaru.length < 6) {
      setPesanError('Password baru minimal harus 6 karakter!');
      return;
    }

    setLoading(true);
    try {
      // PROSES DATABASE UTAMANYA: Mengubah sandi di tabel 'user_peserta' berdasarkan username/NIM mahasiswa
      const { data, error } = await supabase
        .from('user_peserta')
        .update({ password: passwordBaru })
        .eq('username', usernamePeserta);

      if (error) throw error;

      alert('Sandi Mahasiswa BERHASIL diperbarui di database Supabase!');
      setIsModalPasswordOpen(false);
      setPasswordBaru('');
      setKonfirmasiPassword('');
    } catch (err: any) {
      console.error(err);
      setPesanError('Gagal mengubah sandi: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* NAVBAR ATAS UTK MAHASISWA */}
      <header className="bg-indigo-600 text-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg font-bold text-xs tracking-wider">CBT</div>
          <span className="font-extrabold text-sm sm:text-base tracking-wide">DASHBOARD PESERTA UJIAN</span>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 hover:bg-indigo-700 px-3 py-1.5 rounded-xl transition text-left focus:outline-none"
          >
            <span className="font-bold text-xs hidden sm:inline">{namaPeserta}</span>
            <div className="w-7 h-7 bg-white text-indigo-700 font-black text-xs flex items-center justify-center rounded-full shadow-md">
              {namaPeserta.charAt(0).toUpperCase()}
            </div>
          </button>

          {/* DROPDOWN MENU KANAN */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800">
              <button 
                type="button"
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 text-slate-700 text-left"
                onClick={() => {
                  setIsModalPasswordOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                🔑 Ubah Password
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 text-left border-t border-slate-100"
              >
                🚪 Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* AREA HALAMAN */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {children}
      </main>

      {/* ========================================== */}
      {/* MODAL POP-UP UBAH PASSWORD PESERTA         */}
      {/* ========================================== */}
      {isModalPasswordOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                🔑 Ubah Password Akun
              </h3>
              <button 
                onClick={() => setIsModalPasswordOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimpanPasswordPeserta} className="p-5 space-y-4">
              {pesanError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
                  ⚠️ {pesanError}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  NIM / USERNAME MAHASISWA
                </label>
                <input 
                  type="text" 
                  value={usernamePeserta}
                  disabled
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  PASSWORD BARU
                </label>
                <input 
                  type="password"
                  placeholder="••••••"
                  value={passwordBaru}
                  onChange={(e) => setPasswordBaru(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  KONFIRMASI PASSWORD BARU
                </label>
                <input 
                  type="password"
                  placeholder="Ulangi password baru..."
                  value={konfirmasiPassword}
                  onChange={(e) => setKonfirmasiPassword(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
                />
              </div>

              <div className="flex gap-2 pt-2 text-xs font-bold">
                <button 
                  type="button"
                  onClick={() => setIsModalPasswordOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-2.5 rounded-xl transition"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl transition shadow-md shadow-indigo-600/10"
                >
                  {loading ? 'Memproses...' : 'Simpan Sandi'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
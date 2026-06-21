'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase Client asli
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DosenDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State untuk kontrol Modal Pop-up Ubah Password Dosen
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);
  const [usernameDosen, setUsernameDosen] = useState('');
  const [namaDosen, setNamaDosen] = useState('Dosen Pengajar');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesanError, setPesanError] = useState('');

  useEffect(() => {
    // Mengambil session data login dosen dari localStorage browser
    const storedUsername = localStorage.getItem('user_username');
    const storedNama = localStorage.getItem('user_nama');
    if (storedUsername) setUsernameDosen(storedUsername);
    if (storedNama) setNamaDosen(storedNama);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; // Jalur kembali ke halaman login utama Anda
  };

  const handleSimpanPasswordDosen = async (e: React.FormEvent) => {
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
      // PROSES REAL DATABASE: Update data password di tabel users_cbt khusus untuk role dosen
      const { data, error } = await supabase
        .from('users_cbt')
        .update({ password: passwordBaru })
        .eq('username', usernameDosen)
        .eq('role', 'dosen');

      if (error) throw error;

      alert('Sandi Dosen BERHASIL diperbarui di database Supabase asli!');
      setIsModalPasswordOpen(false);
      setPasswordBaru('');
      setKonfirmasiPassword('');
    } catch (err: any) {
      console.error(err);
      setPesanError('Gagal mengubah sandi database: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased">
      {/* NAVBAR HEADER ATAS DOSEN */}
      <header className="bg-emerald-600 text-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl font-black text-xs tracking-wider">CBT</div>
          <span className="font-extrabold text-sm sm:text-base tracking-wide uppercase">Sistem CBT - Panel Dosen / Pengajar</span>
        </div>

        {/* PROFIL KANAN ATAS */}
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 hover:bg-emerald-700 p-1.5 rounded-xl transition text-left focus:outline-none"
          >
            <div className="text-right hidden sm:block">
              <p className="font-extrabold text-xs text-white flex items-center gap-1">
                {namaDosen} <span className="text-[10px] text-emerald-200">{isMenuOpen ? '▲' : '▼'}</span>
              </p>
              <p className="text-[9px] font-bold text-emerald-200 uppercase tracking-widest">NIDN/ID: {usernameDosen || 'Dosen'}</p>
            </div>
            <div className="w-8 h-8 bg-white text-emerald-700 font-black text-xs flex items-center justify-center rounded-xl shadow-md uppercase">
              {namaDosen.charAt(0)}
            </div>
          </button>

          {/* DROPDOWN SUB-MENU (UBAH PASSWORD & LOGOUT) */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200/80 py-1.5 z-50 text-slate-800">
              <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Pengaturan Dosen
              </div>
              
              <button 
                type="button"
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-left"
                onClick={() => {
                  setIsModalPasswordOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                🔑 Ubah Password
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition text-left border-t border-slate-100"
              >
                🚪 Keluar Sistem
              </button>
            </div>
          )}
        </div>
      </header>

      {/* AREA UTAMA UNTUK HALAMAN KONTEN INTERAL DOSEN */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
        {children}
      </main>

      {/* ========================================== */}
      {/* MODAL POP-UP UBAH PASSWORD DOSEN           */}
      {/* ========================================== */}
      {isModalPasswordOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-md overflow-hidden">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                🔑 Ubah Password Akun
              </h3>
              <button 
                onClick={() => setIsModalPasswordOpen(false)}
                className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Form Modal */}
            <form onSubmit={handleSimpanPasswordDosen} className="p-5 space-y-4">
              {pesanError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
                  ⚠️ {pesanError}
                </div>
              )}

              {/* Field NIDN */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  NIDN / USERNAME DOSEN
                </label>
                <input 
                  type="text" 
                  value={usernameDosen}
                  disabled
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed"
                />
              </div>

              {/* Input Password Baru */}
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
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
                />
              </div>

              {/* Konfirmasi Input */}
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
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition"
                />
              </div>

              {/* Tombol Aksi */}
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
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl transition shadow-md shadow-emerald-600/10"
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
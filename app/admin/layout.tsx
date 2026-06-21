'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Konfigurasi Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // State untuk dropdown menu sidebar
  const [isDataUserOpen, setIsDataUserOpen] = useState(false);
  const [isUjianOnlineOpen, setIsUjianOnlineOpen] = useState(false);
  const [isManajemenOpen, setIsManajemenOpen] = useState(false);
  const [isRekapDataOpen, setIsRekapDataOpen] = useState(false);

  // State untuk dropdown profil Admin di kanan atas
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  // STATE BARU: Untuk kontrol Modal Pop-up Ubah Password
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);
  const [usernameAdmin, setUsernameAdmin] = useState('admin');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesanError, setPesanError] = useState('');

  useEffect(() => {
    // Mengambil username admin yang login jika ada
    const storedUsername = localStorage.getItem('user_username');
    if (storedUsername) {
      setUsernameAdmin(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/admin-login';
  };

  const handleSimpanPassword = async (e: React.FormEvent) => {
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
      // PROSES ASLI: Eksekusi update langsung ke tabel user_admin di database Supabase Anda
      const { data, error } = await supabase
        .from('user_admin')
        .update({ password: passwordBaru })
        .eq('username', usernameAdmin);

      if (error) throw error;

      alert('Sandi BERHASIL diperbarui di database Supabase asli!');
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
    <div className="min-h-screen bg-slate-100 flex font-sans antialiased text-slate-800">
      {/* SIDEBAR LEFT */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4 shadow-xl border-r border-slate-800 shrink-0 sticky top-0 h-screen overflow-y-auto custom-scrollbar">
        <div>
          {/* Logo Brand */}
          <div className="flex items-center gap-3 mb-6 px-2 py-1">
            <div className="bg-blue-600 p-2 rounded-xl font-black text-xs text-white tracking-wider shadow-md shadow-blue-500/20">CBT</div>
            <span className="font-extrabold text-base text-white tracking-widest">PANEL ADMIN</span>
          </div>
          
          {/* Menu Navigation */}
          <nav className="space-y-1.5 text-sm font-semibold">
            {/* 1. DASHBOARD */}
            <a href="/admin" className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-800 hover:text-white rounded-xl transition text-slate-400">
              📊 Dashboard
            </a>

            {/* 2. DATA USER */}
            <div>
              <button 
                onClick={() => setIsDataUserOpen(!isDataUserOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-left ${
                  isDataUserOpen ? 'bg-slate-800/80 text-blue-400' : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <span className="flex items-center gap-3">👤 Data User</span>
                <span className="text-xs">{isDataUserOpen ? '▼' : '▶'}</span>
              </button>
              {isDataUserOpen && (
                <div className="mt-1 pl-4 space-y-1 border-l border-slate-800 ml-5 text-xs text-slate-400">
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Data User Admin</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Data Dosen</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Data Pengawas</a>
                </div>
              )}
            </div>

            {/* 3. UJIAN ONLINE */}
            <div>
              <button 
                onClick={() => setIsUjianOnlineOpen(!isUjianOnlineOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-left ${
                  isUjianOnlineOpen ? 'bg-slate-800/80 text-blue-400' : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <span className="flex items-center gap-3">💼 Ujian Online</span>
                <span className="text-xs">{isUjianOnlineOpen ? '▼' : '▶'}</span>
              </button>
              {isUjianOnlineOpen && (
                <div className="mt-1 pl-4 space-y-1 border-l border-slate-800 ml-5 text-xs text-slate-400">
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Kategori Materi</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Paket Soal</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Sesi Pelaksanaan</a>
                </div>
              )}
            </div>

            {/* 4. MANAJEMEN */}
            <div>
              <button 
                onClick={() => setIsManajemenOpen(!isManajemenOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-left ${
                  isManajemenOpen ? 'bg-slate-800/80 text-blue-400' : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <span className="flex items-center gap-3">📁 Manajemen</span>
                <span className="text-xs">{isManajemenOpen ? '▼' : '▶'}</span>
              </button>
              {isManajemenOpen && (
                <div className="mt-1 pl-4 space-y-1 border-l border-slate-800 ml-5 text-xs text-slate-400">
                  <a href="/admin/manajemen/peserta" className="block px-3 py-2 hover:text-white transition">Data Peserta</a>
                </div>
              )}
            </div>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 text-xs font-bold py-2 rounded-xl transition"
        >
          Keluar Admin
        </button>
      </aside>

      {/* KONTEN KANAN */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR HEADER */}
        <header className="bg-white shadow-sm border-b border-slate-200/60 px-8 py-3.5 flex justify-between items-center sticky top-0 z-40">
          <h2 className="font-bold text-base tracking-tight text-slate-700 uppercase">Sistem CBT Online - Backend Management</h2>
          
          <div className="relative">
            <button 
              onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
              className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-xl transition text-left focus:outline-none"
            >
              <div className="text-right hidden sm:block">
                <p className="font-extrabold text-xs text-slate-800 flex items-center gap-1">
                  Super Admin Pusat <span className="text-[9px] text-slate-400">{isAdminMenuOpen ? '▲' : '▼'}</span>
                </p>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">SUPER ADMIN</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center rounded-xl shadow-inner">
                S
              </div>
            </button>

            {/* DROPDOWN MENU KANAN ATAS */}
            {isAdminMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200/80 py-1.5 z-50">
                <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Peran Masuk: Admin
                </div>
                
                {/* AKSI: Sekarang memicu pemanggilan membuka Modal pop-up */}
                <button 
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-left"
                  onClick={() => {
                    setIsModalPasswordOpen(true);
                    setIsAdminMenuOpen(false);
                  }}
                >
                  🔑 Ubah Password
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition text-left"
                >
                  🚪 Log Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* AREA HALAMAN UTAMA */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* ========================================== */}
      {/* MODAL POP-UP UBAH PASSWORD (STYLE PESERTA) */}
      {/* ========================================== */}
      {isModalPasswordOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                🔑 Ubah Password
              </h3>
              <button 
                onClick={() => setIsModalPasswordOpen(false)}
                className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Form Box */}
            <form onSubmit={handleSimpanPassword} className="p-5 space-y-4">
              {pesanError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
                  ⚠️ {pesanError}
                </div>
              )}

              {/* Username Field */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  USERNAME / NIM ANDA
                </label>
                <input 
                  type="text" 
                  value={usernameAdmin}
                  disabled
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed"
                />
              </div>

              {/* Password Baru Field */}
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
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              {/* Konfirmasi Password Field */}
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
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              {/* Tombol Aksi Bawah */}
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
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition shadow-md shadow-blue-600/10"
                >
                  {loading ? 'Memproses...' : 'Simpan Sandi'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(15, 23, 42, 1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(51, 65, 85, 1); border-radius: 10px; }
      `}</style>
    </div>
  );
}
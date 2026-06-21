'use client';

import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // State untuk dropdown menu sidebar
  const [isDataUserOpen, setIsDataUserOpen] = useState(false);
  const [isUjianOnlineOpen, setIsUjianOnlineOpen] = useState(false);
  const [isManajemenOpen, setIsManajemenOpen] = useState(false);
  const [isRekapDataOpen, setIsRekapDataOpen] = useState(false);

  // State baru untuk dropdown profil Admin di kanan atas
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/admin-login';
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
                <span className="text-xs transition-transform duration-200">{isDataUserOpen ? '▼' : '▶'}</span>
              </button>

              {/* SUB-MENU DATA USER */}
              {isDataUserOpen && (
                <div className="mt-1 pl-4 space-y-1 border-l border-slate-800 ml-5 text-xs text-slate-400 font-medium">
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
                <span className="text-xs transition-transform duration-200">{isUjianOnlineOpen ? '▼' : '▶'}</span>
              </button>

              {/* SUB-MENU UJIAN ONLINE */}
              {isUjianOnlineOpen && (
                <div className="mt-1 pl-4 space-y-1 border-l border-slate-800 ml-5 text-xs text-slate-400 font-medium">
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Kategori Materi</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Paket Soal</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Sesi Pelaksanaan</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Ruang Ujian</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Koreksi Ujian</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Laporan</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Reset Data</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Pembelian Poin</a>
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
                <span className="text-xs transition-transform duration-200">{isManajemenOpen ? '▼' : '▶'}</span>
              </button>

              {/* SUB-MENU MANAJEMEN */}
              {isManajemenOpen && (
                <div className="mt-1 pl-4 space-y-1 border-l border-slate-800 ml-5 text-xs text-slate-400 font-medium">
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Data Lembaga</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Data Operator</a>
                  <a href="/admin/manajemen/peserta" className="block px-3 py-2 hover:text-white transition">Data Peserta</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Kelompok Peserta</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Data Ruang</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Konversi Skor</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Email System</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Artikel</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Template Email</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Modul</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Pengawasan Ruang</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Grup Sesi</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Antrian Broadcast WA</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Histori Token AI</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Rangking Peserta</a>
                </div>
              )}
            </div>

            {/* 5. REKAP DATA */}
            <div>
              <button 
                onClick={() => setIsRekapDataOpen(!isRekapDataOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-left ${
                  isRekapDataOpen ? 'bg-slate-800/80 text-blue-400' : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <span className="flex items-center gap-3">📉 Rekap Data</span>
                <span className="text-xs transition-transform duration-200">{isRekapDataOpen ? '▼' : '▶'}</span>
              </button>

              {/* SUB-MENU REKAP DATA */}
              {isRekapDataOpen && (
                <div className="mt-1 pl-4 space-y-1 border-l border-slate-800 ml-5 text-xs text-slate-400 font-medium">
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Rekap Jadwal Ujian</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Rekap Peserta</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Rekap Jumlah Peserta</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Laporan Kasus</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Operator Lapangan</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Pengawas Lapangan</a>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Tombol Keluar Samping */}
        <button 
          onClick={handleLogout}
          className="w-full bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 text-xs font-bold py-2 rounded-xl transition border border-slate-800/40 mt-4 shrink-0"
        >
          Keluar Admin
        </button>
      </aside>

      {/* KONTEN KANAN */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="bg-white shadow-sm border-b border-slate-200/60 px-8 py-3.5 flex justify-between items-center sticky top-0 z-50">
          <h2 className="font-bold text-base tracking-tight text-slate-700 uppercase">Sistem CBT Online - Backend Management</h2>
          
          {/* MENU PROFIL ADMIN KANAN ATAS */}
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
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200/80 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
    <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
      Peran Masuk: Admin
    </div>
    
    {/* Tombol Ubah Password - SEKARANG DIARAHKAN KE RUTE /admin/ubah-password */}
    <a 
      href="/admin/ubah-password" 
      className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
      onClick={() => setIsAdminMenuOpen(false)}
    >
      🔑 Ubah Password
    </a>
    
    {/* Tombol Log Out */}
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

      {/* CSS internal mini untuk scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(51, 65, 85, 1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
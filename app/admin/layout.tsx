'use client';

import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isDataUserOpen, setIsDataUserOpen] = useState(true);
  const [isUjianOpen, setIsUjianOpen] = useState(false);
  const [namaAdmin, setNamaAdmin] = useState('Admin');
  const [usernameAdmin, setUsernameAdmin] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    const nama = localStorage.getItem('user_nama');
    const username = localStorage.getItem('user_username');

    if (role !== 'admin' || !nama) {
      localStorage.clear();
      window.location.href = '/login';
      return;
    }

    setNamaAdmin(nama);
    setUsernameAdmin(username || '');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans antialiased">
      <title>Panel Dashboard Admin - CBT Online</title>

      {/* SIDEBAR UTAMA ADMIN (SISTEM MENU UTUH - TIDAK ADA YANG DIHAPUS) */}
      <div className="w-64 bg-slate-900 text-slate-200 flex flex-col justify-between p-5 hidden md:flex min-h-screen sticky top-0">
        <div>
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-emerald-500 p-2 rounded-lg font-black text-sm text-slate-900">CBT</div>
            <span className="font-bold text-lg tracking-wider text-white">PANEL ADMIN</span>
          </div>

          {/* NAVIGASI UTAMA */}
          <nav className="space-y-1">
            <a href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition text-sm">
              📊 Dashboard Utama
            </a>

            {/* 1. DROPDOWN: DATA USER */}
            <div>
              <button 
                onClick={() => setIsDataUserOpen(!isDataUserOpen)} 
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition text-sm text-left focus:outline-none"
              >
                <span className="flex items-center gap-3">👥 Data User</span>
                <span className="text-xs text-slate-500">{isDataUserOpen ? '▲' : '▼'}</span>
              </button>

              {isDataUserOpen && (
                <div className="mt-1 ml-6 space-y-1 border-l border-slate-700/60 pl-3">
                  <a href="/admin/data-user-admin" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-slate-800 hover:text-emerald-400 text-slate-400">
                    • Data User Admin
                  </a>
                  <a href="/admin/manajemen/peserta" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-slate-800 hover:text-emerald-400 text-slate-400">
                    • Data Master Peserta
                  </a>
                </div>
              )}
            </div>

            {/* 2. DROPDOWN: UJIAN ONLINE */}
            <div>
              <button 
                onClick={() => setIsUjianOpen(!isUjianOpen)} 
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition text-sm text-left focus:outline-none"
              >
                <span className="flex items-center gap-3">📝 Ujian Online</span>
                <span className="text-xs text-slate-500">{isUjianOpen ? '▲' : '▼'}</span>
              </button>

              {isUjianOpen && (
                <div className="mt-1 ml-6 space-y-1 border-l border-slate-700/60 pl-3">
                  <a href="/admin/ujian-online/paket-soal" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-slate-800 hover:text-emerald-400 text-slate-400">
                    • Paket Soal
                  </a>
                </div>
              )}
            </div>

            {/* 3. MENU: REKAPITULASI NILAI */}
            <a href="/admin/rekap-nilai" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition text-sm">
              🏆 Rekap Perolehan Nilai
            </a>
          </nav>
        </div>

        {/* TOMBOL LOGOUT */}
        <button onClick={handleLogout} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition shadow-md text-sm">
          Keluar Sistem
        </button>
      </div>

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-40">
          <h2 className="font-bold text-xl text-slate-700 tracking-wide">SISTEM KONTROL CBT</h2>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-sm text-slate-800">{namaAdmin}</p>
              <p className="text-xs font-semibold text-emerald-600 uppercase">Role: Admin ({usernameAdmin})</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center rounded-xl uppercase">
              {namaAdmin.charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
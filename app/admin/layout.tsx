'use client';

import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isDataUserOpen, setIsDataUserOpen] = useState(true);
  const [isUjianOpen, setIsUjianOpen] = useState(false);
  const [namaAdmin, setNamaAdmin] = useState('Super Admin Pusat');
  const [roleAdmin, setRoleAdmin] = useState('ADMIN (2010312310001)');

  useEffect(() => {
    // Sinkronisasi data login admin dari localStorage jika ada
    const storedNama = localStorage.getItem('user_nama');
    const storedRole = localStorage.getItem('user_role');
    const storedUsername = localStorage.getItem('user_username');
    
    if (storedNama) setNamaAdmin(storedNama);
    if (storedRole && storedUsername) setRoleAdmin(`ROLE: ${storedRole.toUpperCase()} (${storedUsername})`);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans antialiased">
      <title>Panel Kontrol CBT - Administrator</title>

      {/* SIDEBAR UTAMA ADMIN */}
      <div className="w-64 bg-slate-900 text-slate-200 flex flex-col justify-between p-5 hidden md:flex min-h-screen sticky top-0">
        <div>
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-emerald-500 p-2 rounded-lg font-black text-sm text-slate-900">CBT</div>
            <span className="font-bold text-md tracking-wider text-white uppercase">Panel Admin</span>
          </div>

          {/* NAVIGASI MENU */}
          <nav className="space-y-1">
            <a href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition text-sm">
              📊 Dashboard Utama
            </a>

            {/* DROPDOWN: DATA USER (4 SUB-MENU BARU) */}
            <div>
              <button 
                onClick={() => setIsDataUserOpen(!isDataUserOpen)} 
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition text-sm text-left focus:outline-none"
              >
                <span className="flex items-center gap-3">👥 Data User</span>
                <span className="text-[10px] text-slate-500">{isDataUserOpen ? '▲' : '▼'}</span>
              </button>

              {isDataUserOpen && (
                <div className="mt-1 ml-6 space-y-1 border-l border-slate-700/60 pl-3">
                  <a href="/admin/data-user-admin" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-slate-800 hover:text-emerald-400 text-slate-400 transition">
                    • Data User Admin
                  </a>
                  <a href="/admin/data-user-dosen" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-slate-800 hover:text-emerald-400 text-slate-400 transition">
                    • Data User Dosen
                  </a>
                  <a href="/admin/data-user-pengawas" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-slate-800 hover:text-emerald-400 text-slate-400 transition">
                    • Data User Pengawas
                  </a>
                  <a href="/admin/data-user-operator" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-slate-800 hover:text-emerald-400 text-slate-400 transition">
                    • Data User Operator
                  </a>
                </div>
              )}
            </div>

            {/* DROPDOWN: UJIAN ONLINE */}
            <div>
              <button 
                onClick={() => setIsUjianOpen(!isUjianOpen)} 
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition text-sm text-left focus:outline-none"
              >
                <span className="flex items-center gap-3">📝 Ujian Online</span>
                <span className="text-[10px] text-slate-500">{isUjianOpen ? '▲' : '▼'}</span>
              </button>

              {isUjianOpen && (
                <div className="mt-1 ml-6 space-y-1 border-l border-slate-700/60 pl-3">
                  <a href="/admin/ujian-online/paket-soal" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-slate-800 hover:text-emerald-400 text-slate-400 transition">
                    • Paket Soal
                  </a>
                </div>
              )}
            </div>

            <a href="/admin/rekap-nilai" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition text-sm">
              🏆 Rekap Perolehan Nilai
            </a>
          </nav>
        </div>

        {/* LOGOUT */}
        <button onClick={handleLogout} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition shadow-md text-sm">
          Keluar Admin
        </button>
      </div>

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-40">
          <h2 className="font-bold text-xl text-slate-700 tracking-wide">SISTEM KONTROL CBT</h2>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-sm text-slate-800">{namaAdmin}</p>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{roleAdmin}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center rounded-xl uppercase shadow-xs">
              {namaAdmin.charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
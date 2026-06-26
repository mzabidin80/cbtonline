'use client';

import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isDataUserOpen, setIsDataUserOpen] = useState(true); // Dropdown menu otomatis terbuka
  const [namaAdmin, setNamaAdmin] = useState('Admin');
  const [usernameAdmin, setUsernameAdmin] = useState('');

  useEffect(() => {
    // Kunci Pengaman: Cek apakah yang login benar-benar admin
    const role = localStorage.getItem('user_role');
    const nama = localStorage.getItem('user_nama');
    const username = localStorage.getItem('user_username');

    if (role !== 'admin' || !nama) {
      localStorage.clear();
      window.location.href = '/login'; // Sesuaikan dengan rute halaman login admin Anda
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

      {/* SIDEBAR ADMIN (WARNA SLATE GELAP) */}
      <div className="w-64 bg-slate-900 text-slate-200 flex flex-col justify-between p-5 hidden md:flex min-h-screen sticky top-0">
        <div>
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-emerald-500 p-2 rounded-lg font-black text-sm text-slate-900">CBT</div>
            <span className="font-bold text-lg tracking-wider text-white">PANEL ADMIN</span>
          </div>

          {/* MENU NAVIGASI */}
          <nav className="space-y-1">
            <a href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition text-sm">
              📊 Dashboard Utama
            </a>

            {/* MENU DROPDOWN: DATA USER */}
            <div>
              <button 
                onClick={() => setIsDataUserOpen(!isDataUserOpen)} 
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800 rounded-xl font-medium transition text-sm text-left focus:outline-none"
              >
                <span className="flex items-center gap-3">👥 Data User</span>
                <span>{isDataUserOpen ? '▴' : '▾'}</span>
              </button>

              {/* SUB MENU */}
              {isDataUserOpen && (
                <div className="mt-1 ml-6 space-y-1 border-l border-slate-700 pl-3">
                  <a href="/admin/data-user-admin" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-slate-800 text-emerald-400 bg-slate-800/50">
                    • Data User Admin
                  </a>
                  {/* Anda bisa menambah sub-menu lain di sini nanti, misal: Data Siswa, Data Pengawas */}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* TOMBOL LOGOUT */}
        <button onClick={handleLogout} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition shadow-md text-sm">
          Keluar Sistem
        </button>
      </div>

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* NAVBAR ATAS */}
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

        {/* TEMPAT HALAMAN ANAK MUNCUL */}
        <main className="flex-1 bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
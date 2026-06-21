'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [namaAdmin, setNamaAdmin] = useState('Administrator');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    // Mengambil nama admin dari localStorage jika ada
    setNamaAdmin(localStorage.getItem('user_nama') || 'Admin Utama');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // Daftar Menu Sidebar sesuai referensi rancangan Backend CBT
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Master Data', path: '/admin/master', icon: 'M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4' },
    { name: 'Bank Soal', path: '/admin/soal', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'Jadwal Ujian', path: '/admin/ujian', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Rekap Hasil Nilai', path: '/admin/nilai', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-sans antialiased overflow-hidden">
      
      {/* 1. SIDEBAR (Kiri) */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shadow-xl z-20 flex-shrink-0">
        <div>
          {/* Logo / Judul CBT */}
          <div className="h-16 bg-slate-950 flex items-center px-6 border-b border-slate-800">
            <span className="text-xl font-black text-white tracking-wider flex items-center space-x-2">
              <span className="bg-blue-600 text-white p-1.5 rounded-lg text-xs font-mono">CBT</span>
              <span>PANEL ADMIN</span>
            </span>
          </div>

          {/* List Menu */}
          <nav className="mt-6 px-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Info Footer Sidebar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 text-center text-xs text-slate-500 font-medium">
          Dashboard Backend v1.0
        </div>
      </aside>

      {/* AREA KANAN (Header + Konten Utama) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* 2. HEADER (Atas) */}
        <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-8 z-10 flex-shrink-0">
          
          {/* Judul Halaman Dinamis */}
          <div className="flex items-center space-x-2">
            <h2 className="text-md font-black text-gray-800 tracking-tight uppercase">
              {menuItems.find(item => item.path === pathname)?.name || 'Panel Utama'}
            </h2>
          </div>

          {/* Menu Profil Kanan */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 focus:outline-none hover:bg-gray-50 p-2 rounded-xl transition"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-between justify-center font-bold text-blue-700 text-xs">
                {namaAdmin.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-black text-gray-800 leading-none">{namaAdmin}</p>
                <p className="text-[10px] font-bold text-blue-600 uppercase mt-0.5 tracking-tight">Super Admin</p>
              </div>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu Logout */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-1 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-400 font-bold uppercase">
                  Aksi Akun
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center space-x-2 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Keluar Sistem</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* 3. KONTEN UTAMA (Bawah Header) */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
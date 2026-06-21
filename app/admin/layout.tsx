'use client';

import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isManajemenOpen, setIsManajemenOpen] = useState(true); // Default terbuka sesuai fokus kita

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/admin-login';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans antialiased text-slate-800">
      {/* SIDEBAR LEFT */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4 shadow-xl border-r border-slate-800 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Logo Brand */}
          <div className="flex items-center gap-3 mb-6 px-2 py-1">
            <div className="bg-blue-600 p-2 rounded-xl font-black text-xs text-white tracking-wider shadow-md shadow-blue-500/20">CBT</div>
            <span className="font-extrabold text-base text-white tracking-widest">PANEL ADMIN</span>
          </div>
          
          {/* Menu Navigation */}
          <nav className="space-y-1.5 text-sm font-semibold">
            <a href="/admin" className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-800 hover:text-white rounded-xl transition text-slate-400">
              📊 Dashboard
            </a>

            {/* KELOMPOK MENU: MANAJEMEN DROPDOWN */}
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

              {/* SUB-MENU KASKADE (Sesuai Gambar Referensi Anda) */}
              {isManajemenOpen && (
                <div className="mt-1 pl-4 space-y-1 border-l border-slate-800 ml-5 text-xs text-slate-400 font-medium">
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Data Lembaga</a>
                  <a href="#" className="block px-3 py-2 hover:text-white transition">Data Operator</a>
                  {/* Menu Aktif yang Kita Bangun */}
                  <a href="/admin/manajemen/peserta" className="block px-3 py-2 bg-blue-600/10 text-blue-400 rounded-lg font-bold transition">Data Peserta</a>
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

            <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-800 hover:text-white rounded-xl transition text-slate-400">
              📝 Bank Soal
            </a>
            <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-800 hover:text-white rounded-xl transition text-slate-400">
              📅 Jadwal Ujian
            </a>
            <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-800 hover:text-white rounded-xl transition text-slate-400">
              📊 Rekap Hasil Nilai
            </a>
          </nav>
        </div>

        {/* Tombol Logout Samping */}
        <button 
          onClick={handleLogout}
          className="w-full bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 text-xs font-bold py-2 rounded-xl transition border border-slate-800/40"
        >
          Keluar Admin
        </button>
      </aside>

      {/* KONTEN KANAN */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="bg-white shadow-sm border-b border-slate-200/60 px-8 py-3.5 flex justify-between items-center sticky top-0 z-10">
          <h2 className="font-bold text-base tracking-tight text-slate-700 uppercase">Sistem CBT Online - Backend Management</h2>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-extrabold text-xs text-slate-800">Super Admin Pusat</p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">SUPER ADMIN</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center rounded-xl shadow-inner">
              S
            </div>
          </div>
        </header>

        {/* AREA HALAMAN UTAMA */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
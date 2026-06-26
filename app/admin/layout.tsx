'use client';

import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // State Kontrol Dropdown Menu Accordion
  const [isDataUserOpen, setIsDataUserOpen] = useState(false);
  const [isDataPesertaOpen, setIsDataPesertaOpen] = useState(false);
  const [isManajemenOpen, setIsManajemenOpen] = useState(false);
  const [isRekapDataOpen, setIsRekapDataOpen] = useState(false);
  const [isPengumumanOpen, setIsPengumumanOpen] = useState(true); // Di-set true secara bawaan agar langsung terlihat

  const [namaAdmin, setNamaAdmin] = useState('Super Admin Pusat');
  const [roleAdmin, setRoleAdmin] = useState('ADMIN (2010312310001)');

  useEffect(() => {
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
      <title>Panel Kontrol CBT - Master Administrator</title>

      {/* SIDEBAR UTAMA ADMIN (Dengan Scroll Otomatis Jika Menu Penuh) */}
      <div className="w-72 bg-slate-900 text-slate-200 flex flex-col justify-between p-5 hidden md:flex h-screen sticky top-0 overflow-y-auto select-none border-r border-slate-800">
        <div className="space-y-6">
          {/* LOGO PANEL */}
          <div className="flex items-center gap-3 px-2 py-1 border-b border-slate-800/60 pb-4">
            <div className="bg-emerald-500 p-2 rounded-xl font-black text-xs text-slate-900 shadow-sm">CBT</div>
            <div>
              <span className="font-black text-sm tracking-wider text-white block uppercase">Sistem Kontrol</span>
              <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">Backend Management</span>
            </div>
          </div>

          {/* NAVIGASI MENU UTAMA */}
          <nav className="space-y-1.5">
            
            {/* 1. DASHBOARD UTAMA */}
            <a href="/admin" className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-800 rounded-xl font-bold transition text-xs tracking-wide">
              📊 Dashboard Utama
            </a>

            <div className="pt-2 pb-1 px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase">Master Data & Akses</div>

            {/* 2. MENU UTAMA: DATA USER */}
            <div>
              <button onClick={() => setIsDataUserOpen(!isDataUserOpen)} className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-800 rounded-xl font-bold transition text-xs text-left focus:outline-none">
                <span className="flex items-center gap-3">👥 Data User</span>
                <span className="text-[9px] text-slate-500">{isDataUserOpen ? '▲' : '▼'}</span>
              </button>
              {isDataUserOpen && (
                <div className="mt-1 ml-5 border-l border-slate-800 pl-3.5 space-y-1">
                  <a href="/admin/data-user-admin" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Data User Admin</a>
                  <a href="/admin/data-user-dosen" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Data User Dosen</a>
                  <a href="/admin/data-user-pengawas" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Data User Pengawas</a>
                  <a href="/admin/data-user-operator" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Data User Operator</a>
                </div>
              )}
            </div>

            {/* 3. MENU UTAMA: DATA PESERTA */}
            <div>
              <button onClick={() => setIsDataPesertaOpen(!isDataPesertaOpen)} className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-800 rounded-xl font-bold transition text-xs text-left focus:outline-none">
                <span className="flex items-center gap-3">🎓 Data Peserta</span>
                <span className="text-[9px] text-slate-500">{isDataPesertaOpen ? '▲' : '▼'}</span>
              </button>
              {isDataPesertaOpen && (
                <div className="mt-1 ml-5 border-l border-slate-800 pl-3.5 space-y-1">
                  <a href="/admin/data-peserta" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Data Peserta</a>
                  <a href="/admin/data-peserta/jumlah-peserta" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Jumlah Peserta (Per Kelas & Ruang)</a>
                </div>
              )}
            </div>

            <div className="pt-3 pb-1 px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase">Operasional Ujian</div>

            {/* 4. MENU UTAMA: MANAJEMEN */}
            <div>
              <button onClick={() => setIsManajemenOpen(!isManajemenOpen)} className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-800 rounded-xl font-bold transition text-xs text-left focus:outline-none">
                <span className="flex items-center gap-3">⚙️ Manajemen</span>
                <span className="text-[9px] text-slate-500">{isManajemenOpen ? '▲' : '▼'}</span>
              </button>
              {isManajemenOpen && (
                <div className="mt-1 ml-5 border-l border-slate-800 pl-3.5 space-y-1">
                  <a href="/admin/manajemen/kelas-peserta" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Kelas Peserta</a>
                  <a href="/admin/manajemen/kelompok-peserta" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Kelompok Peserta</a>
                  <a href="/admin/manajemen/ruang-ujian" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Ruang Ujian</a>
                  <a href="/admin/manajemen/dosen-kelas" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Dosen Kelas</a>
                  <a href="/admin/manajemen/pengawas-kelas" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Pengawas Kelas</a>
                  <a href="/admin/manajemen/paket-soal-kelas" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Paket Soal Kelas</a>
                  <a href="/admin/manajemen/jadwal-ujian" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Jadwal Ujian</a>
                </div>
              )}
            </div>

            {/* 5. MENU UTAMA: REKAP DATA */}
            <div>
              <button onClick={() => setIsRekapDataOpen(!isRekapDataOpen)} className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-800 rounded-xl font-bold transition text-xs text-left focus:outline-none">
                <span className="flex items-center gap-3">📈 Rekap Data</span>
                <span className="text-[9px] text-slate-500">{isRekapDataOpen ? '▲' : '▼'}</span>
              </button>
              {isRekapDataOpen && (
                <div className="mt-1 ml-5 border-l border-slate-800 pl-3.5 space-y-0.5">
                  <a href="/admin/rekap-data/jadwal-ujian" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Rekap Jadwal Ujian</a>
                  <a href="/admin/rekap-data/peserta" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Rekap Peserta</a>
                  <a href="/admin/rekap-data/kelas-peserta" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Rekap Kelas Peserta</a>
                  <a href="/admin/rekap-data/kelompok-peserta" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Rekap Kelompok Peserta</a>
                  <a href="/admin/rekap-data/pengawas-ujian" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Rekap Pengawas Ujian</a>
                  <a href="/admin/rekap-data/jadwal-dosen" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Rekap Jadwal Dosen Ujian</a>
                  <a href="/admin/rekap-data/jadwal-operator" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Rekap Jadwal Operator</a>
                  <a href="/admin/rekap-data/hasil-ujian" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Rekap Hasil Ujian (Per Kelas)</a>
                  <a href="/admin/rekap-data/kasus-kecurangan" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">• Rekap Kasus</a>
                </div>
              )}
            </div>

            <div className="pt-3 pb-1 px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase">Pusat Informasi</div>

            {/* 6. MENU UTAMA: PENGUMUMAN (SEKARANG SUDAH 3 SUB-MENU UTUH & LENGKAP) */}
            <div>
              <button onClick={() => setIsPengumumanOpen(!isPengumumanOpen)} className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-slate-800 rounded-xl font-bold transition text-xs text-left focus:outline-none">
                <span className="flex items-center gap-3">📢 Pengumuman</span>
                <span className="text-[9px] text-slate-500">{isPengumumanOpen ? '▲' : '▼'}</span>
              </button>
              {isPengumumanOpen && (
                <div className="mt-1 ml-5 border-l border-slate-800 pl-3.5 space-y-1">
                  <a href="/admin/pengumuman/jadwal-ujian" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">
                    • Pengumuman Jadwal Ujian
                  </a>
                  <a href="/admin/pengumuman/nilai-kelas" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">
                    • Pengumuman Nilai Ujian (Per Kelas)
                  </a>
                  <a href="/admin/pengumuman/jadwal-remedial" className="block px-3 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition">
                    • Pengumuman Jadwal Ujian Remedial
                  </a>
                </div>
              )}
            </div>

          </nav>
        </div>

        {/* LOGOUT */}
        <div className="pt-6 border-t border-slate-800 mt-6">
          <button onClick={handleLogout} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition shadow-md text-xs tracking-wide">
            Keluar Panel Admin
          </button>
        </div>
      </div>

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="bg-white shadow-xs px-8 py-4 flex justify-between items-center sticky top-0 z-40 border-b border-slate-100">
          <h2 className="font-black text-sm text-slate-700 tracking-wider uppercase">SISTEM KONTROL UTAMA CBT</h2>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-bold text-xs text-slate-800">{namaAdmin}</p>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{roleAdmin}</p>
            </div>
            <div className="w-9 h-9 bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center rounded-xl uppercase shadow-sm">
              {namaAdmin.charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
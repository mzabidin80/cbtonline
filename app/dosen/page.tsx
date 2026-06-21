'use client';

import { useEffect, useState } from 'react';

export default function DosenDashboard() {
  const [namaDosen, setNamaDosen] = useState('Dosen');

  useEffect(() => {
    const nama = localStorage.getItem('user_nama');
    const role = localStorage.getItem('user_role');

    // PERBAIKAN: Proteksi ketat, hanya role 'dosen' yang diizinkan masuk ke portal ini
    if (!nama || role !== 'dosen') {
      window.location.href = '/dosen-login';
    } else {
      setNamaDosen(nama);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/dosen-login';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <title>Dashboard Dosen - CBT Online</title>
      
      {/* SIDEBAR DOSEN */}
      <div className="w-64 bg-emerald-900 text-white flex flex-col justify-between p-5 hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-emerald-500 p-2 rounded-lg font-black text-sm text-slate-900">CBT</div>
            <span className="font-bold text-lg tracking-wider">PANEL DOSEN</span>
          </div>
          
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-emerald-800 rounded-xl font-medium">
              📊 Dashboard
            </a>
            {/* PERBAIKAN: Menyesuaikan fungsionalitas pengajar/dosen */}
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/50 rounded-xl transition text-slate-300 hover:text-white">
              📅 Jadwal Kuliah & Ujian
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/50 rounded-xl transition text-slate-300 hover:text-white">
              📊 Rekap Nilai Mahasiswa
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-800/50 rounded-xl transition text-slate-300 hover:text-white">
              ⚠️ Laporan Kasus Ujian
            </a>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition"
        >
          Keluar Sistem
        </button>
      </div>

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h2 className="font-bold text-xl text-slate-700">DASHBOARD DOSEN</h2>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-bold text-sm text-slate-800">{namaDosen}</p>
              {/* PERBAIKAN: Mengubah sub-teks dari "Dosen / Pengawas" menjadi murni "Dosen" */}
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Dosen</p>
            </div>
            <div className="w-10 h-10 bg-emerald-200 text-emerald-800 font-bold flex items-center justify-center rounded-full shadow-inner">
              {namaDosen.charAt(0)}
            </div>
          </div>
        </header>

        {/* UTAMA */}
        <main className="p-8 flex-1 space-y-6">
          {/* BANNER SELAMAT DATANG */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white p-6 rounded-2xl shadow-md">
            {/* PERBAIKAN: Sapaan dinamis tanpa embel-embel teks statis pengawas */}
            <h3 className="text-2xl font-black">Selamat Datang, {namaDosen}! 👋</h3>
            <p className="text-sm text-emerald-100 mt-1">
              Selamat datang di ruang kendali Dosen. Monitor presensi kehadiran mahasiswa secara real-time dan rekap perolehan nilai ujian di sini.
            </p>
          </div>

          {/* KARTU STATISTIK */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jadwal Ujian Hari Ini</p>
              <p className="text-3xl font-black text-slate-800 mt-2">1 <span className="text-sm font-normal text-slate-500">Kelas</span></p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mahasiswa Ujian</p>
              <p className="text-3xl font-black text-emerald-600 mt-2">32 <span className="text-sm font-normal text-slate-500">Orang</span></p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Belum Mengumpul</p>
              <p className="text-3xl font-black text-amber-500 mt-2">5 <span className="text-sm font-normal text-slate-500">Orang</span></p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';

export default function PengawasDashboard() {
  const [namaPengawas, setNamaPengawas] = useState('Pengawas');

  useEffect(() => {
    const nama = localStorage.getItem('user_nama');
    const role = localStorage.getItem('user_role');

    // Kunci keamanan: Pastikan hanya role 'pengawas' yang bisa mengakses halaman ini
    if (!nama || role !== 'pengawas') {
      window.location.href = '/pengawas-login';
    } else {
      setNamaPengawas(nama);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/pengawas-login';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <title>Dashboard Pengawas - CBT Online</title>
      
      {/* SIDEBAR PENGAWAS (TEMA INDIGO) */}
      <div className="w-64 bg-indigo-900 text-white flex flex-col justify-between p-5 hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-indigo-500 p-2 rounded-lg font-black text-sm text-slate-900">CBT</div>
            <span className="font-bold text-md tracking-wider">PANEL PENGAWAS</span>
          </div>
          
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-800 rounded-xl font-medium">
              📊 Dashboard Utama
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-800/50 rounded-xl transition text-slate-300 hover:text-white">
              📅 Jadwal Mengawas Hari Ini
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-800/50 rounded-xl transition text-slate-300 hover:text-white">
              👥 Monitoring Aktivitas Siswa
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-800/50 rounded-xl transition text-slate-300 hover:text-white">
              ⚠️ Catat Kasus Kecurangan
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
          <h2 className="font-bold text-xl text-slate-700">MONITORING RUANG UJIAN</h2>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-bold text-sm text-slate-800">{namaPengawas}</p>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Pengawas Lapangan</p>
            </div>
            <div className="w-10 h-10 bg-indigo-200 text-indigo-800 font-bold flex items-center justify-center rounded-full shadow-inner">
              {namaPengawas.charAt(0)}
            </div>
          </div>
        </header>

        {/* UTAMA */}
        <main className="p-8 flex-1 space-y-6">
          {/* BANNER SELAMAT DATANG */}
          <div className="bg-gradient-to-r from-indigo-700 to-violet-600 text-white p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-black">Selamat Mengawas, {namaPengawas}! 👋</h3>
            <p className="text-sm text-indigo-100 mt-1">
              Pantau aktivitas pengerjaan ujian peserta secara real-time. Laporkan segera jika ditemukan kendala teknis atau indikasi kecurangan di ruang ujian.
            </p>
          </div>

          {/* KARTU MONITORING */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sesi Berjalan</p>
              <p className="text-3xl font-black text-slate-800 mt-2">1 <span className="text-sm font-normal text-slate-500">Sesi</span></p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Siswa Aktif di Ruangan</p>
              <p className="text-3xl font-black text-indigo-600 mt-2">40 <span className="text-sm font-normal text-slate-500">Mahasiswa</span></p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pelanggaran Terdeteksi</p>
              <p className="text-3xl font-black text-rose-500 mt-2">0 <span className="text-sm font-normal text-slate-500">Kasus</span></p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
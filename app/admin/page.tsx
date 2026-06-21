'use client';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Kartu Selamat Datang */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <h1 className="text-2xl font-black tracking-tight">Selamat Datang di Panel Utama Dashboard Backend 👋</h1>
        <p className="text-blue-100 text-sm font-medium mt-1">Kelola data master, bank soal, dan konfigurasikan jadwal sesi ujian secara terpusat.</p>
      </div>

      {/* Grid Statistik Singkat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Total Bank Soal</p>
          <p className="text-3xl font-black text-gray-800 mt-1">120 <span className="text-xs font-medium text-gray-400">Butir</span></p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Jadwal Ujian Aktif</p>
          <p className="text-3xl font-black text-emerald-600 mt-1">2 <span className="text-xs font-medium text-gray-400">Sesi</span></p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Mahasiswa Ujian</p>
          <p className="text-3xl font-black text-blue-600 mt-1">45 <span className="text-xs font-medium text-gray-400">Orang</span></p>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';

export default function PengawasDashboard() {
  const [namaPengawas, setNamaPengawas] = useState('Pengawas');

  useEffect(() => {
    // Sinkronkan nama di halaman dalam dengan nama di memori browser
    const nama = localStorage.getItem('user_nama');
    if (nama) {
      setNamaPengawas(nama);
    }
  }, []);

  return (
    <div className="p-8 space-y-6">
      {/* BANNER SELAMAT DATANG */}
      <div className="bg-gradient-to-r from-indigo-700 to-violet-600 text-white p-6 rounded-2xl shadow-md">
        <h3 className="text-2xl font-black">Selamat Mengawas, {namaPengawas}! 🌐</h3>
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
    </div>
  );
}
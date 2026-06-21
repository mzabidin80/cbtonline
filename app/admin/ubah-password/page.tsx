'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalSoal: 120, // Nilai default statis awal Anda
    totalSesi: 2,
    totalMahasiswa: 0,
    totalDosen: 0,
    totalPengawas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboardStats() {
      try {
        // Ambil hitungan user berdasarkan role masing-masing dari tabel database
        const { data: users, error } = await supabase
          .from('users_cbt')
          .select('role');

        if (!error && users) {
          const mhs = users.filter(u => u.role === 'mahasiswa').length;
          const dsn = users.filter(u => u.role === 'dosen').length;
          const pws = users.filter(u => u.role === 'pengawas').length;

          setStats(prev => ({
            ...prev,
            totalMahasiswa: mhs,
            totalDosen: dsn,
            totalPengawas: pws
          }));
        }
      } catch (err) {
        console.error('Gagal memuat statistik database:', err);
      } finally {
        setLoading(false);
      }
    }

    getDashboardStats();
  }, []);

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      <title>Dashboard Admin - CBT Online</title>

      {/* BANNER UTAMA */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-6 rounded-2xl shadow-md">
        <h3 className="text-2xl font-black tracking-tight">Selamat Datang di Panel Utama Dashboard Backend 👋</h3>
        <p className="text-sm text-blue-100 mt-1">
          Kelola data master peserta, manajemen bank soal, dan konfigurasikan jadwal sesi pelaksanaan ujian secara terpusat.
        </p>
      </div>

      {/* KARTU STATISTIK UTAMA (SINKRON DENGAN PORTAL BARU) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Bank Soal */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bank Soal</p>
          <div className="flex justify-between items-baseline mt-2">
            <p className="text-3xl font-black text-slate-800">{stats.totalSoal} <span className="text-sm font-normal text-slate-500">Butir</span></p>
            <a href="/admin/ujian-online/paket-soal" className="text-xs text-blue-600 font-bold hover:underline">Lihat Detail</a>
          </div>
        </div>

        {/* Jadwal Ujian Aktif */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jadwal Ujian Aktif</p>
          <div className="flex justify-between items-baseline mt-2">
            <p className="text-3xl font-black text-emerald-600">{stats.totalSesi} <span className="text-sm font-normal text-slate-500">Sesi</span></p>
            <a href="/admin/ujian-online/sesi" className="text-xs text-emerald-600 font-bold hover:underline">Lihat Sesi</a>
          </div>
        </div>

        {/* Mahasiswa Terdaftar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mahasiswa (Peserta)</p>
          <div className="flex justify-between items-baseline mt-2">
            <p className="text-3xl font-black text-blue-600">
              {loading ? '...' : stats.totalMahasiswa} <span className="text-sm font-normal text-slate-500">Orang</span>
            </p>
            <a href="/admin/manajemen/peserta" className="text-xs text-blue-600 font-bold hover:underline">Kelola</a>
          </div>
        </div>

        {/* Staf Pengajar & Lapangan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dosen & Pengawas</p>
          <div className="flex justify-between items-baseline mt-2">
            <p className="text-3xl font-black text-indigo-600">
              {loading ? '...' : `${stats.totalDosen} / ${stats.totalPengawas}`}
            </p>
            <span className="text-xs text-slate-400 font-medium font-mono">Dsn / Pws</span>
          </div>
        </div>
      </div>

      {/* PANEL PINTU PINTAS ADMINISTRATOR */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Akses Cepat Pengaturan Akun</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="/admin/manajemen/peserta" className="p-4 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition border border-slate-200/60 font-semibold text-sm text-slate-600 flex items-center gap-2">
            👥 Atur Data Master Pengguna
          </a>
          <a href="/admin/ujian-online/paket-soal" className="p-4 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition border border-slate-200/60 font-semibold text-sm text-slate-600 flex items-center gap-2">
            📝 Buat & Sunting Paket Soal
          </a>
          <a href="/admin/rekap-hasil-nilai" className="p-4 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition border border-slate-200/60 font-semibold text-sm text-slate-600 flex items-center gap-2">
            📊 Rekapitulasi Perolehan Nilai
          </a>
        </div>
      </div>
    </div>
  );
}
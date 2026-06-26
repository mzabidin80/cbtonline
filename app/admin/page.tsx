'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalSoal: 120, 
    totalSesi: 2,   
    totalMahasiswa: 0,
    totalDosen: 0,
    totalPengawas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboardStats() {
      try {
        const [
          { count: countMhs },
          { count: countDsn },
          { count: countPws }
        ] = await Promise.all([
          supabase.from('user_peserta').select('*', { count: 'exact', head: true }),
          supabase.from('user_dosen').select('*', { count: 'exact', head: true }),
          supabase.from('user_pengawas').select('*', { count: 'exact', head: true })
        ]);

        setStats(prev => ({
          ...prev,
          totalMahasiswa: countMhs || 0,
          totalDosen: countDsn || 0,
          totalPengawas: countPws || 0
        }));
      } catch (error) {
        console.error('Gagal memuat statistik dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    getDashboardStats();
  }, []);

  return (
    <div className="p-8 space-y-7 bg-slate-50 min-h-screen">
      
      {/* BANNER SELAMAT DATANG */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-950 text-white p-7 rounded-2xl shadow-lg border border-slate-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-black tracking-wide">Selamat Datang di Utama Administrator! 🔐</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl font-medium">
            Gunakan bilah menu navigasi di sebelah kiri untuk mengatur manajemen data master pengguna, melakukan sinkronisasi konfigurasi ujian, serta memantau kesehatan server CBT online.
          </p>
        </div>
        <div className="bg-slate-700/50 backdrop-blur px-4 py-2 rounded-xl border border-slate-600 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status Server</p>
          <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5 justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE
          </p>
        </div>
      </div>

      {/* INDIKATOR KARTU STATISTIK REAL-TIME */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Paket Soal</p>
            <p className="text-3xl font-black text-slate-800 mt-1.5">{stats.totalSoal}</p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-3 pt-2 border-t border-slate-100">Aktif & Tersedia</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sesi Ujian Aktif</p>
            <p className="text-3xl font-black text-indigo-600 mt-1.5">{stats.totalSesi}</p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-3 pt-2 border-t border-slate-100">Sedang Berjalan</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mahasiswa Terdaftar</p>
            <p className="text-3xl font-black text-emerald-600 mt-1.5">
              {loading ? <span className="text-sm font-normal text-slate-300 animate-pulse">...</span> : stats.totalMahasiswa}
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-3 pt-2 border-t border-slate-100">Akun Peserta Ujian</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Dosen / Pengawas</p>
            <p className="text-3xl font-black text-amber-500 mt-1.5">
              {loading ? <span className="text-sm font-normal text-slate-300 animate-pulse">...</span> : `${stats.totalDosen} / ${stats.totalPengawas}`}
            </p>
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-3 pt-2 border-t border-slate-100">Dsn / Pws Aktif</span>
        </div>
      </div>

      {/* PANEL PINTU PINTAS ADMINISTRATOR (SESUAI GAMBAR ASLI - UTUH) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">
          ⚡ Akses Cepat Pengaturan Akun
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <a href="/admin/manajemen/peserta" className="p-4 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition border border-slate-200/60 font-semibold text-xs text-slate-600 flex items-center gap-2.5">
            👥 Atur Data Master Pengguna
          </a>

          <a href="/admin/ujian-online/paket-soal" className="p-4 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition border border-slate-200/60 font-semibold text-xs text-slate-600 flex items-center gap-2.5">
            📝 Buat & Sunting Paket Soal
          </a>

          <a href="/admin/rekap-nilai" className="p-4 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 rounded-xl transition border border-slate-200/60 font-semibold text-xs text-slate-600 flex items-center gap-2.5">
            📊 Rekapitulasi Perolehan Nilai
          </a>

        </div>
      </div>

    </div>
  );
}
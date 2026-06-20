'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [role, setRole] = useState('');
  const [nama, setNama] = useState('');

  useEffect(() => {
    // Ambil data login dari browser
    const savedRole = localStorage.getItem('user_role') || 'mahasiswa';
    const savedNama = localStorage.getItem('user_nama') || 'Pengguna';
    setRole(savedRole);
    setNama(savedNama);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar Atas */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white font-bold p-2 rounded-lg">MZA</div>
          <span className="font-bold text-lg border-l pl-3 border-gray-200">CBT Portal</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium uppercase">
            {role}
          </span>
          <button onClick={handleLogout} className="text-sm text-red-600 hover:underline font-medium">
            Keluar
          </button>
        </nav>

      {/* Konten Utama */}
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold">Halo, {nama}! 👋</h1>
          <p className="text-gray-500 mt-1">Selamat datang di panel kendali utama ujian online.</p>
        </div>

        {/* 🎓 MENU KHUSUS MAHASISWA */}
        {role === 'mahasiswa' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-blue-600">📝 Daftar Ujian Tersedia</h3>
              <p className="text-gray-500 text-sm mt-1">Klik untuk mulai masuk ke ruang ujian aktif.</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium w-full">
                Mulai Ujian
              </button>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-emerald-600">📊 Lihat Nilai & Hasil</h3>
              <p className="text-gray-500 text-sm mt-1">Lihat riwayat nilai ujian yang telah selesai dilakukan.</p>
              <button className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium w-full">
                Buka Riwayat Nilai
              </button>
            </div>
          </div>
        )}

        {/* 👁️ MENU KHUSUS PENGAWAS / DOSEN */}
        {role === 'pengawas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-purple-600">👁️ Monitoring Realtime</h3>
              <p className="text-gray-500 text-sm mt-1">Pantau status mahasiswa yang sedang ujian secara langsung.</p>
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium w-full">
                Pantau Kamera & Layar
              </button>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-orange-600">✍️ Pembuatan Bank Soal</h3>
              <p className="text-gray-500 text-sm mt-1">Tambah, edit, atau hapus butir-butir soal ujian.</p>
              <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium w-full">
                Kelola Bank Soal
              </button>
            </div>
          </div>
        )}

        {/* 🛠️ MENU KHUSUS ADMINISTRATOR */}
        {role === 'admin' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-red-600">⚙️ Konfigurasi Sistem Utama</h3>
            <p className="text-gray-500 text-sm mt-1 mb-4">Kelola akun pengguna database, setting server, dan ekspor seluruh data laporan.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="bg-gray-100 p-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200">
                👥 Kelola User
              </button>
              <button className="bg-gray-100 p-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200">
                🏫 Kelola Kelas
              </button>
              <button className="bg-gray-100 p-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200">
                📥 Backup Database
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
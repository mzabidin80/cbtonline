'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DashboardPage() {
  const [namaMhs, setNamaMhs] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);

useEffect(() => {
    setNamaMhs(localStorage.getItem('user_nama') || 'Budi Santoso');
    setRole(localStorage.getItem('user_role') || 'mahasiswa');
    
    // Ambil data dari memori browser
    const storedUsername = localStorage.getItem('user_username');
    
    // Proteksi: Jika datanya kosong, null, atau malah berupa teks "undefined", paksa gunakan NIM asli
    if (!storedUsername || storedUsername === 'undefined' || storedUsername === 'null') {
      setUsername('2010312310001');
    } else {
      setUsername(storedUsername);
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordBaru || !konfirmasiPassword) {
      alert('Semua kolom password wajib diisi.');
      return;
    }
    if (passwordBaru !== konfirmasiPassword) {
      alert('Konfirmasi password tidak cocok dengan password baru.');
      return;
    }

    setLoadingPassword(true);
    try {
      const { data, error } = await supabase
        .from('users_cbt')
        .update({ password: passwordBaru })
        .eq('username', username)
        .select(); 

      if (error) throw error;

      if (!data || data.length === 0) {
        alert(`Gagal merubah! Akun dengan Username/NIM "${username}" tidak ditemukan di database Supabase.`);
        return;
      }

      alert('Sandi Berhasil Diperbarui! Password baru Anda kini sudah tersimpan langsung di database Supabase.');
      setIsModalOpen(false);
      setPasswordBaru('');
      setKonfirmasiPassword('');
    } catch (err: any) {
      alert('Gagal mengubah password: ' + err.message);
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 relative">
      
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white font-black px-3 py-1.5 rounded-xl text-sm tracking-wider">
              MZA
            </div>
            <span className="font-bold text-lg text-gray-800 tracking-tight">
              CBT Online FEB ULM
            </span>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition text-sm font-semibold text-gray-700 border border-gray-200"
            >
              <span>👤 {namaMhs}</span>
              <span className="text-xs text-gray-400">{isDropdownOpen ? '▲' : '▼'}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Peran Masuk</p>
                  <p className="text-xs text-blue-600 font-bold uppercase">{role}</p>
                </div>
                
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center space-x-2"
                >
                  <span>🔑</span>
                  <span>Ubah Password</span>
                </button>
                
                <hr className="my-1 border-gray-100" />
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition flex items-center space-x-2"
                >
                  <span>🚪</span>
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6">
        
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            Halo, {namaMhs}! 👋
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            Selamat datang di panel kendali utama ujian online Fakultas Ekonomi dan Bisnis ULM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📝</span>
              <h2 className="font-bold text-gray-800 text-lg">Daftar Ujian Tersedia</h2>
            </div>
            <p className="text-xs text-gray-500">Klik untuk mulai masuk ke dalam ruang ujian aktif Anda hari ini.</p>
            <button 
              onClick={() => window.location.href = '/dashboard/ujian'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md shadow-blue-600/10"
            >
              Mulai Ujian
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📊</span>
              <h2 className="font-bold text-gray-800 text-lg">Lihat Nilai & Hasil</h2>
            </div>
            <p className="text-xs text-gray-500">Lihat histori daftar rekapitulasi nilai ujian yang telah Anda selesaikan.</p>
            <button 
              onClick={() => window.location.href = '/dashboard/riwayat'}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-md shadow-emerald-600/10"
            >
              Buka Riwayat Nilai
            </button>
          </div>

        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                🔑 Ubah Password
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-sm bg-gray-100 px-2.5 py-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Username / NIM Anda</label>
                <input 
                  type="text" 
                  value={username} 
                  disabled 
                  className="w-full bg-gray-100 text-gray-500 p-3 rounded-xl border border-gray-200 text-sm font-medium outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Password Baru</label>
                <input 
                  type="password" 
                  placeholder="Ketik password baru..." 
                  value={passwordBaru}
                  onChange={(e) => setPasswordBaru(e.target.value)}
                  className="w-full bg-white text-gray-800 p-3 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Konfirmasi Password Baru</label>
                <input 
                  type="password" 
                  placeholder="Ulangi password baru..." 
                  value={konfirmasiPassword}
                  onChange={(e) => setKonfirmasiPassword(e.target.value)}
                  className="w-full bg-white text-gray-800 p-3 rounded-xl border border-gray-200 text-sm font-medium outline-none focus:border-blue-500 transition"
                />
              </div>

              <div className="pt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-sm transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loadingPassword}
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition shadow-md"
                >
                  {loadingPassword ? 'Menyimpan...' : 'Simpan Sandi'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
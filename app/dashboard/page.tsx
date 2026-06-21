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
  
  // State untuk dropdown menu profil & modal ubah password
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State form ubah password
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);

  useEffect(() => {
    setNamaMhs(localStorage.getItem('user_nama') || 'Budi Santoso');
    setRole(localStorage.getItem('user_role') || 'mahasiswa');
    
    // MENGAMBIL USERNAME / NIM ASLI (Contoh: 2010312310001)
    setUsername(localStorage.getItem('user_username') || '2010312310001');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // Fungsi memproses pembaruan password di Supabase tabel users_cbt
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
      // ✨ PERBAIKAN UTAMA: Pencarian data menggunakan kolom 'username' (NIM), bukan 'nama_lengkap'
      const { data, error } = await supabase
        .from('users_cbt')
        .update({ password: passwordBaru })
        .eq('username', username)
        .select(); 

      if (error) throw error;

      // Proteksi mendeteksi jika baris di Supabase tidak ada yang berubah
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
      
      {/* 🏙️ HEADER NAVIGASI DENGAN DROPDOWN MENU PENGGUNA */}
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

          {/* 👤 MENU PROFIL INTERAKTIF */}
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
                  className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-
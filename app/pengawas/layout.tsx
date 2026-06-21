'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PengawasDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);
  
  const [usernamePengawas, setUsernamePengawas] = useState('');
  const [namaPengawas, setNamaPengawas] = useState('Pengawas');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesanError, setPesanError] = useState('');

  useEffect(() => {
    // 🔍 MEMBACA DATA DARI LOGIN YANG SUDAH KITA PERBAIKI
    const storedNama = localStorage.getItem('user_nama');
    const role = localStorage.getItem('user_role');
    const storedUsername = localStorage.getItem('user_username');

    // 🔥 SISTEM KEAMANAN: Tendang jika belum login atau ID tidak ditemukan
    if (!storedNama || role !== 'pengawas' || !storedUsername) {
      localStorage.clear();
      window.location.href = '/pengawas-login';
      return;
    }

    setNamaPengawas(storedNama);
    setUsernamePengawas(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/pengawas-login'; 
  };

  const handleSimpanPasswordPengawas = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesanError('');

    if (passwordBaru !== konfirmasiPassword) return setPesanError('Konfirmasi password tidak cocok!');
    if (passwordBaru.length < 6) return setPesanError('Password minimal 6 karakter!');

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_pengawas')
        .update({ password: passwordBaru })
        .eq('username', usernamePengawas)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) throw new Error('ID Pengguna tidak ditemukan di database.');

      alert('Password berhasil diperbarui!');
      setIsModalPasswordOpen(false);
      setPasswordBaru('');
      setKonfirmasiPassword('');
    } catch (err: any) {
      setPesanError('Gagal update: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans antialiased">
      <title>Dashboard Pengawas - CBT Online</title>
      
      {/* SIDEBAR PENGAWAS (WARNA INDIGO KIRI) */}
      <div className="w-64 bg-indigo-900 text-white flex flex-col justify-between p-5 hidden md:flex min-h-screen sticky top-0">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-indigo-500 p-2 rounded-lg font-black text-sm text-slate-900">CBT</div>
            <span className="font-bold text-md tracking-wider">PANEL PENGAWAS</span>
          </div>
          <nav className="space-y-2">
            <a href="/pengawas" className="flex items-center gap-3 px-4 py-3 bg-indigo-800 rounded-xl font-medium">📊 Dashboard Utama</a>
          </nav>
        </div>
        <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition shadow-md">Keluar Sistem</button>
      </div>

      {/* KONTEN UTAMA & NAVBAR ATAS */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-40">
          <h2 className="font-bold text-xl text-slate-700 tracking-wide">MONITORING UJIAN</h2>
          
          <div className="relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-3 p-1 rounded-xl transition text-left focus:outline-none">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-sm text-slate-800 flex items-center gap-1">{namaPengawas} <span className="text-[10px] text-slate-400">▾</span></p>
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">ID: {usernamePengawas}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center rounded-xl shadow-sm uppercase">{namaPengawas.charAt(0)}</div>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800">
                <button onClick={() => { setIsModalPasswordOpen(true); setIsMenuOpen(false); }} className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 text-left">🔑 Ubah Password</button>
                <button onClick={handleLogout} className="w-full px-3.5 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 text-left border-t border-slate-100">🚪 Keluar Sistem</button>
              </div>
            )}
          </div>
        </header>

        {/* TEMPAT HALAMAN ANAK (page.tsx) MUNCUL */}
        <main className="flex-1">{children}</main>
      </div>

      {/* MODAL GANTI PASSWORD */}
      {isModalPasswordOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-800">🔑 Ubah Password Pengawas</h3>
              <button onClick={() => setIsModalPasswordOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleSimpanPasswordPengawas} className="p-5 space-y-4">
              {pesanError && <div className="p-2.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl">⚠️ {pesanError}</div>}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">ID PENGGUNA</label>
                <input type="text" value={usernamePengawas} disabled className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">PASSWORD BARU</label>
                <input type="password" value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} required className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">KONFIRMASI PASSWORD BARU</label>
                <input type="password" value={konfirmasiPassword} onChange={(e) => setKonfirmasiPassword(e.target.value)} required className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none" />
              </div>
              <div className="flex gap-2 pt-2 text-xs font-bold">
                <button type="button" onClick={() => setIsModalPasswordOpen(false)} className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl">Batal</button>
                <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl shadow-md">{loading ? 'Memproses...' : 'Simpan Sandi'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
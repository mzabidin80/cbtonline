'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase Client
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
    // Sinkronisasi data dari browser
    const storedNama = localStorage.getItem('user_nama') || localStorage.getItem('pengawas_nama') || localStorage.getItem('nama');
    const role = localStorage.getItem('user_role');
    const detectUsername = localStorage.getItem('user_username') || localStorage.getItem('username') || localStorage.getItem('pengawas_username');

    // 🔥 SISTEM KICK OTOMATIS BERSIHKAN CACHE
    // Jika tidak ada nama, role salah, ATAU ID TIDAK DITEMUKAN -> Langsung hapus memori & paksa login ulang!
    if (!storedNama || role !== 'pengawas' || !detectUsername) {
      localStorage.clear();
      window.location.href = '/pengawas-login';
      return;
    }

    // Jika aman, tampilkan datanya
    setNamaPengawas(storedNama);
    setUsernamePengawas(detectUsername);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/pengawas-login'; 
  };

  const handleSimpanPasswordPengawas = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesanError('');

    if (!usernamePengawas) {
      setPesanError('Sesi tidak ditemukan atau ID kosong. Silakan masuk kembali.');
      return;
    }

    if (passwordBaru !== konfirmasiPassword) {
      setPesanError('Konfirmasi password baru tidak cocok!');
      return;
    }

    if (passwordBaru.length < 6) {
      setPesanError('Password baru minimal harus 6 karakter!');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_pengawas')
        .update({ password: passwordBaru })
        .eq('username', usernamePengawas)
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        setPesanError(`Gagal: Akun pengawas dengan ID "${usernamePengawas}" tidak ditemukan di database.`);
        setLoading(false);
        return;
      }

      alert('Password Pengawas BERHASIL diperbarui di database!');
      setIsModalPasswordOpen(false);
      setPasswordBaru('');
      setKonfirmasiPassword('');
    } catch (err: any) {
      console.error(err);
      setPesanError('Gagal mengubah password: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans antialiased">
      <title>Dashboard Pengawas - CBT Online</title>
      
      {/* SIDEBAR PENGAWAS (TEMA INDIGO KIRI) */}
      <div className="w-64 bg-indigo-900 text-white flex flex-col justify-between p-5 hidden md:flex min-h-screen sticky top-0">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-indigo-500 p-2 rounded-lg font-black text-sm text-slate-900">CBT</div>
            <span className="font-bold text-md tracking-wider">PANEL PENGAWAS</span>
          </div>
          
          <nav className="space-y-2">
            <a href="/pengawas" className="flex items-center gap-3 px-4 py-3 bg-indigo-800 rounded-xl font-medium">
              📊 Dashboard Utama
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-800/50 rounded-xl transition text-slate-300 hover:text-white">
              📅 Jadwal Mengawas Hari Ini
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-800/50 rounded-xl transition text-slate-300 hover:text-white">
              🖥️ Monitoring Aktivitas Siswa
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-800/50 rounded-xl transition text-slate-300 hover:text-white">
              📝 Catat Kasus Kecurangan
            </a>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition shadow-md"
        >
          Keluar Sistem
        </button>
      </div>

      {/* KONTEN UTAMA + NAVBAR KANAN ATAS */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR / HEADER BARU */}
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-40">
          <h2 className="font-bold text-xl text-slate-700 tracking-wide">MONITORING RUANG UJIAN</h2>
          
          {/* MENU PROFIL DROPDOWN KANAN ATAS */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 hover:bg-slate-50 p-1 rounded-xl transition text-left focus:outline-none"
            >
              <div className="text-right hidden sm:block">
                <p className="font-bold text-sm text-slate-800 flex items-center gap-1">
                  {namaPengawas} <span className="text-[10px] text-slate-400">{isMenuOpen ? '▲' : '▼'}</span>
                </p>
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  ID: {usernamePengawas || 'TIDAK TERDETEKSI'}
                </p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center rounded-xl shadow-sm uppercase">
                {namaPengawas.charAt(0)}
              </div>
            </button>

            {/* ISI DROPDOWN MENU */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800 animate-in fade-in duration-100">
                <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Opsi Pengawas
                </div>
                <button 
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition text-left"
                  onClick={() => {
                    setIsModalPasswordOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  🔑 Ubah Password
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition text-left border-t border-slate-100"
                >
                  🚪 Keluar Sistem
                </button>
              </div>
            )}
          </div>
        </header>

        {/* AREA UTAMA TEMPAT HALAMAN ANAK */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* MODAL POP-UP UBAH PASSWORD PENGAWAS */}
      {isModalPasswordOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-800">🔑 Ubah Password Pengawas</h3>
              <button onClick={() => setIsModalPasswordOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleSimpanPasswordPengawas} className="p-5 space-y-4">
              {pesanError && <div className="p-2.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl">⚠️ {pesanError}</div>}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">ID PENGGUNA</label>
                <input type="text" value={usernamePengawas || "Tidak Terdeteksi"} disabled className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">PASSWORD BARU</label>
                <input type="password" placeholder="••••••" value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} required className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">KONFIRMASI PASSWORD BARU</label>
                <input type="password" placeholder="Ulangi..." value={konfirmasiPassword} onChange={(e) => setKonfirmasiPassword(e.target.value)} required className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition" />
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
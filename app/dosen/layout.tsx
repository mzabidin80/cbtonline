'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DosenDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);
  const [usernameDosen, setUsernameDosen] = useState('');
  const [namaDosen, setNamaDosen] = useState('Dosen Pengajar');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pesanError, setPesanError] = useState('');

  useEffect(() => {
    // Membaca session yang disimpan oleh /dosen-login
    const storedUsername = localStorage.getItem('dosen_username') || localStorage.getItem('username') || localStorage.getItem('user_username');
    const storedNama = localStorage.getItem('dosen_nama') || localStorage.getItem('nama') || localStorage.getItem('user_nama');
    
    if (storedUsername) setUsernameDosen(storedUsername);
    if (storedNama) setNamaDosen(storedNama);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/dosen-login'; 
  };

  const handleSimpanPasswordDosen = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesanError('');

    if (!usernameDosen) {
      setPesanError('Sesi tidak terdeteksi. Silakan logout dan login kembali melalui /dosen-login.');
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
        .from('user_dosen')
        .update({ password: passwordBaru })
        .eq('username', usernameDosen)
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        setPesanError(`Gagal: Akun dengan username "${usernameDosen}" tidak ditemukan di database.`);
        setLoading(false);
        return;
      }

      alert('Sandi Dosen BERHASIL diperbarui di database Supabase!');
      setIsModalPasswordOpen(false);
      setPasswordBaru('');
      setKonfirmasiPassword('');
    } catch (err: any) {
      console.error(err);
      setPesanError('Gagal mengubah sandi database: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased">
      <header className="bg-emerald-600 text-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl font-black text-xs tracking-wider">CBT</div>
          <span className="font-extrabold text-sm sm:text-base tracking-wide uppercase">Sistem CBT - Panel Dosen</span>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 hover:bg-emerald-700 p-1.5 rounded-xl transition text-left focus:outline-none"
          >
            <div className="text-right hidden sm:block">
              <p className="font-extrabold text-xs text-white flex items-center gap-1">
                {namaDosen} <span className="text-[10px] text-emerald-200">{isMenuOpen ? '▲' : '▼'}</span>
              </p>
              <p className="text-[9px] font-bold text-emerald-200 uppercase tracking-widest">
                USER: {usernameDosen ? usernameDosen : 'BELUM LOGIN'}
              </p>
            </div>
            <div className="w-8 h-8 bg-white text-emerald-700 font-black text-xs flex items-center justify-center rounded-xl shadow-md uppercase">
              {namaDosen.charAt(0)}
            </div>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200/80 py-1.5 z-50 text-slate-800">
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

      <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
        {children}
      </main>

      {isModalPasswordOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-800">🔑 Ubah Password Akun</h3>
              <button onClick={() => setIsModalPasswordOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleSimpanPasswordDosen} className="p-5 space-y-4">
              {pesanError && <div className="p-2.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl">⚠️ {pesanError}</div>}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">USERNAME / ID DOSEN</label>
                <input 
                  type="text" 
                  value={usernameDosen || "Tidak Terdeteksi"} 
                  disabled 
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 cursor-not-allowed" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">PASSWORD BARU</label>
                <input type="password" placeholder="••••••" value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} required className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">KONFIRMASI PASSWORD BARU</label>
                <input type="password" placeholder="Ulangi..." value={konfirmasiPassword} onChange={(e) => setKonfirmasiPassword(e.target.value)} required className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs" />
              </div>
              <div className="flex gap-2 pt-2 text-xs font-bold">
                <button type="button" onClick={() => setIsModalPasswordOpen(false)} className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl">Batal</button>
                <button type="submit" disabled={loading} className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl">{loading ? 'Memproses...' : 'Simpan Sandi'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
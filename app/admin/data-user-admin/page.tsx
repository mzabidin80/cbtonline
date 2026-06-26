'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AdminUser {
  id: string;
  username: string;
  nama_lengkap: string;
  hak_akses: string;
}

export default function DataUserAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listAdmin, setListAdmin] = useState<AdminUser[]>([]);
  
  // State Form Input Tambah Admin Baru
  const [form, setForm] = useState({
    username: '',
    password: '',
    nama_lengkap: ''
  });

  // Fetch Data Real dari Table 'user_admin' Supabase
  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_admin')
        .select('id, username, nama_lengkap, hak_akses');
      
      if (error) throw error;
      setListAdmin(data || []);
    } catch (err: any) {
      console.error('Gagal mengambil data admin:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Simpan Administrator Baru ke Database
  const handleSimpanAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password || !form.nama_lengkap) {
      alert('Mohon lengkapi seluruh field formulir!');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_admin')
        .insert([
          {
            username: form.username,
            password: form.password, // Catatan: Di produksi, pastikan menggunakan enkripsi/hashing
            nama_lengkap: form.nama_lengkap,
            hak_akses: 'ADMIN'
          }
        ]);

      if (error) throw error;

      alert('Akun Administrator BERHASIL ditambahkan ke database!');
      setIsModalOpen(false);
      setForm({ username: '', password: '', nama_lengkap: '' });
      fetchAdminData(); // Refresh data tabel
    } catch (err: any) {
      alert('Gagal menambah admin: ' + err.message);
    }
  };

  // Handle Hapus Admin
  const handleHapusAdmin = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus akun administrator ini?')) {
      try {
        const { error } = await supabase
          .from('user_admin')
          .delete()
          .eq('id', id);

        if (error) throw error;
        alert('Akun berhasil dihapus!');
        fetchAdminData();
      } catch (err: any) {
        alert('Gagal menghapus data: ' + err.message);
      }
    }
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen text-slate-700">
      <title>Data User Admin - Panel Kontrol CBT</title>

      {/* HEADER PAGE */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200/60">
        <h3 className="text-base font-black text-slate-800 tracking-wider uppercase flex items-center gap-2">
          🛡️ Sub-Menu Kontrol Data User Admin
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Kelola hak akses administratif tertinggi, pembaruan password enkripsi, dan manajemen akun pengontrol sistem utama.
        </p>
      </div>

      {/* KARTU INFORMASI UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 rounded-2xl text-white shadow-xs">
          <h4 className="font-bold text-sm uppercase tracking-wide">📋 Daftar Data User</h4>
          <p className="text-[11px] text-blue-100 mt-1">Fitur modifikasi profil & pembaruan password baru admin pusat.</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs flex items-center gap-3">
          <div className="text-2xl">🕒</div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wide">Historis Login User Admin</h4>
            <p className="text-[11px] text-slate-400 font-medium">Jejak digital waktu login dan IP address administrator aktif.</p>
          </div>
        </div>
      </div>

      {/* STRUKTUR TABEL DATA UTAMA */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
          <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">DATABASE ADMINISTRATOR</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            ➕ Tambah Akun Admin
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 text-slate-400 text-[10px] font-bold tracking-wider uppercase border-b border-slate-200/60">
                <th className="px-6 py-3.5">ID</th>
                <th className="px-6 py-3.5">Username</th>
                <th className="px-6 py-3.5">Nama Lengkap Administrator</th>
                <th className="px-6 py-3.5 text-center">Hak Akses</th>
                <th className="px-6 py-3.5 text-center">Aksi Atur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-semibold">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    Memuat data administrator server...
                  </td>
                </tr>
              ) : listAdmin.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    Tidak ada akun admin yang ditemukan.
                  </td>
                </tr>
              ) : (
                listAdmin.map((admin) => (
                  <tr key={admin.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-400 max-w-[180px] truncate">{admin.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{admin.username}</td>
                    <td className="px-6 py-4 text-slate-600">{admin.nama_lengkap}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-blue-50 text-blue-600 font-bold px-2.5 py-0.5 rounded text-[10px] uppercase border border-blue-100">
                        {admin.hak_akses}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-3">
                        <button className="text-[11px] font-bold text-amber-600 hover:underline">
                          ✏️ Edit & Sandi
                        </button>
                        <button 
                          onClick={() => handleHapusAdmin(admin.id)}
                          className="text-[11px] font-bold text-rose-600 hover:underline"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POP-UP MODAL TAMBAH ADMIN */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide">➕ Tambah Akun Administrator</h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            
            <form onSubmit={handleSimpanAdmin} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Lengkap Admin *</label>
                <input required type="text" placeholder="Masukkan nama lengkap" value={form.nama_lengkap} onChange={(e) => setForm({...form, nama_lengkap: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 transition" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Username Kontrol *</label>
                <input required type="text" placeholder="Contoh: admin_pusat" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 transition" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Password Akses *</label>
                <input required type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 transition" />
              </div>

              <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl text-[10px] font-bold tracking-wide uppercase border border-blue-100 text-center">
                🔒 Otorisasi Otomatis Tingkat: ADMIN
              </div>

              <div className="flex gap-2 pt-2 text-xs font-bold">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl">Batal</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl shadow-md">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
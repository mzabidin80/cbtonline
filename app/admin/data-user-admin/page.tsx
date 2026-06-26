'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AdminUser {
  id: number;
  username: string;
  nama_lengkap: string;
  role: string;
}

export default function DataUserAdminPage() {
  const [activeSubTab, setActiveSubTab] = useState<'daftar' | 'historis'>('daftar');
  const [adminList, setAdminList] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'tambah' | 'edit'>('tambah');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');

  // Dummy data log historis login admin (dapat dihubungkan ke tabel logs jika ada)
  const [loginLogs] = useState([
    { id: 1, admin: 'Super Admin Pusat', ip: '182.253.44.11', device: 'Chrome / Windows 11', waktu: '26-06-2026 11:22', status: 'Berhasil' },
    { id: 2, admin: 'admin_fitur', ip: '114.122.12.90', device: 'Firefox / Ubuntu Linux', waktu: '26-06-2026 09:15', status: 'Berhasil' }
  ]);

  const loadDataAdmin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_admin')
        .select('id, username, nama_lengkap, role')
        .order('id', { ascending: true });

      if (error) throw error;
      setAdminList(data || []);
    } catch (err: any) {
      alert('Gagal memuat data administrator: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDataAdmin();
  }, []);

  const handleOpenModal = (mode: 'tambah' | 'edit', data?: AdminUser) => {
    setFormMode(mode);
    if (mode === 'edit' && data) {
      setSelectedId(data.id);
      setUsername(data.username);
      setNamaLengkap(data.nama_lengkap);
      setPasswordBaru(''); // Kosongkan, hanya diisi jika ingin update password baru
    } else {
      setSelectedId(null);
      setUsername('');
      setNamaLengkap('');
      setPasswordBaru('');
    }
    setIsModalOpen(true);
  };

  const handleSaveAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formMode === 'tambah') {
        if (!passwordBaru) return alert('Password wajib diisi untuk pengguna baru!');
        const { error } = await supabase
          .from('user_admin')
          .insert([{ username, nama_lengkap: namaLengkap, password: passwordBaru, role: 'admin' }]);
        
        if (error) throw error;
        alert('Pengguna admin baru berhasil didaftarkan!');
      } else if (formMode === 'edit' && selectedId) {
        const updatePayload: any = { username, nama_lengkap: namaLengkap };
        
        // JIKA INPUT PASSWORD BARU DIISI, MAKA AKAN IKUT DIUPDATE
        if (passwordBaru) {
          updatePayload.password = passwordBaru;
        }

        const { error } = await supabase
          .from('user_admin')
          .update(updatePayload)
          .eq('id', selectedId);

        if (error) throw error;
        alert('Data admin & password baru berhasil diperbarui!');
      }
      setIsModalOpen(false);
      loadDataAdmin();
    } catch (err: any) {
      alert('Gagal memproses data admin: ' + err.message);
    }
  };

  const handleHapusAdmin = async (id: number, targetName: string) => {
    if (confirm(`Apakah anda yakin ingin menghapus administrator "${targetName}"?`)) {
      try {
        const { error } = await supabase.from('user_admin').delete().eq('id', id);
        if (error) throw error;
        alert('Akun administrator berhasil dihapus.');
        loadDataAdmin();
      } catch (err: any) {
        alert('Gagal menghapus akun: ' + err.message);
      }
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* HEADER HALAMAN */}
      <div className="border-b border-slate-200 pb-4">
        <h3 className="text-xl font-black text-slate-800">🛡️ Sub-Menu Kontrol Data User Admin</h3>
        <p className="text-xs text-slate-400 mt-1">Kelola hak akses administratif tertinggi, pembaruan password enkripsi, dan tracking log masuk ke dalam dashboard.</p>
      </div>

      {/* DUA ICON BARU PENGGANTI AKSES CEPAT LAMA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* ICON 1: DAFTAR DATA USER */}
        <button 
          onClick={() => setActiveSubTab('daftar')}
          className={`p-5 rounded-2xl border text-left flex items-center gap-4 transition shadow-xs ${
            activeSubTab === 'daftar' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-700' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="text-3xl">📋</div>
          <div>
            <h4 className="font-bold text-sm">Daftar Data User</h4>
            <p className={`text-[11px] mt-0.5 ${activeSubTab === 'daftar' ? 'text-blue-100' : 'text-slate-400'}`}>
              Fitur modifikasi profile & pembaruan password baru admin
            </p>
          </div>
        </button>

        {/* ICON 2: HISTORIS LOGIN */}
        <button 
          onClick={() => setActiveSubTab('historis')}
          className={`p-5 rounded-2xl border text-left flex items-center gap-4 transition shadow-xs ${
            activeSubTab === 'historis' 
              ? 'bg-gradient-to-r from-slate-800 to-slate-950 text-white border-slate-900' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="text-3xl">🕒</div>
          <div>
            <h4 className="font-bold text-sm">Historis Login User Admin</h4>
            <p className={`text-[11px] mt-0.5 ${activeSubTab === 'historis' ? 'text-slate-300' : 'text-slate-400'}`}>
              Jejak digital waktu login dan IP address administrator
            </p>
          </div>
        </button>

      </div>

      {/* KONTEN TABEL 1: DAFTAR DATA USER ADMIN */}
      {activeSubTab === 'daftar' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Database Administrator</span>
            <button 
              onClick={() => handleOpenModal('tambah')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
            >
              ➕ Tambah Akun Admin
            </button>
          </div>

          {loading ? (
            <div className="p-10 text-center text-xs font-bold text-slate-400 animate-pulse">Menghubungkan ke tabel user_admin...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-200">
                    <th className="px-6 py-3 text-center w-16">ID</th>
                    <th className="px-6 py-3">USERNAME</th>
                    <th className="px-6 py-3">NAMA LENGKAP ADMINISTRATOR</th>
                    <th className="px-6 py-3">HAK AKSES</th>
                    <th className="px-6 py-3 text-center w-40">AKSI ATUR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                  {adminList.map((admin) => (
                    <tr key={admin.id} className="hover:bg-slate-50/40 transition">
                      <td className="px-6 py-4 text-center text-slate-400">{admin.id}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{admin.username}</td>
                      <td className="px-6 py-4 text-slate-500">{admin.nama_lengkap}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{admin.role}</span>
                      </td>
                      <td className="px-6 py-4 text-center space-x-1">
                        <button onClick={() => handleOpenModal('edit', admin)} className="bg-amber-50 text-amber-700 hover:bg-amber-100 px-3 py-1.5 rounded-lg text-[10px] font-bold transition">✏️ Edit & Sandi</button>
                        <button onClick={() => handleHapusAdmin(admin.id, admin.username)} className="bg-rose-50 text-rose-700 hover:bg-rose-100 px-3 py-1.5 rounded-lg text-[10px] font-bold transition">🗑️ Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* KONTEN TABEL 2: HISTORIS LOGIN */}
      {activeSubTab === 'historis' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aktivitas Autentikasi Sistem</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-200">
                  <th className="px-6 py-3 w-12 text-center">NO</th>
                  <th className="px-6 py-3">PENGGUNA</th>
                  <th className="px-6 py-3">ALAMAT IP</th>
                  <th className="px-6 py-3">browser / os</th>
                  <th className="px-6 py-3">WAKTU LOGIN</th>
                  <th className="px-6 py-3 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {loginLogs.map((log, index) => (
                  <tr key={log.id} className="hover:bg-slate-50/40 transition">
                    <td className="px-6 py-4 text-center text-slate-400">{index + 1}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{log.admin}</td>
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-500">{log.ip}</td>
                    <td className="px-6 py-4 text-slate-500">{log.device}</td>
                    <td className="px-6 py-4 text-slate-400 font-mono">{log.waktu}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold">{log.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL EDIT DATA & UPDATE PASSWORD BARU */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                {formMode === 'tambah' ? '➕ Registrasi Admin Baru' : '✏️ Sunting Admin & Password'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            
            <form onSubmit={handleSaveAdmin} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Username Kontrol</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3.5 py-2 border rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 transition" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Lengkap</label>
                <input type="text" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} required className="w-full px-3.5 py-2 border rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 transition" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Password Baru {formMode === 'edit' && <span className="text-amber-500 font-medium">(Kosongkan jika tak diubah)</span>}
                </label>
                <input type="password" value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} required={formMode === 'tambah'} placeholder="••••••••" className="w-full px-3.5 py-2 border rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 transition" />
              </div>
              
              <div className="flex gap-2 pt-2 text-xs font-bold">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl transition">Batal</button>
                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl shadow-md transition">Simpan Konfigurasi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
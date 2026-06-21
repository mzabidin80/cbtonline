'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface UserCBT {
  id: string;
  username: string;
  nama_lengkap: string;
  role: 'admin' | 'mahasiswa' | 'dosen' | 'pengawas';
  created_at: string;
}

export default function ManajemenPesertaPage() {
  const [users, setUsers] = useState<UserCBT[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Form Input (Tambah User)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [role, setRole] = useState<'mahasiswa' | 'dosen' | 'pengawas'>('mahasiswa');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // 1. Ambil Data dari Supabase
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users_cbt')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Fungsi Tambah User Baru
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setMsg({ type: '', text: '' });

    const { data, error } = await supabase
      .from('users_cbt')
      .insert([{ username, password, nama_lengkap: namaLengkap, role }]);

    if (error) {
      setMsg({ type: 'error', text: `Gagal menambah data: ${error.message}` });
    } else {
      setMsg({ type: 'success', text: 'User baru berhasil didaftarkan!' });
      setUsername('');
      setPassword('');
      setNamaLengkap('');
      fetchUsers(); // Refresh tabel
    }
    setSubmitLoading(false);
  };

  // 3. Fungsi Hapus User
  const handleDeleteUser = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus akun ${name}?`)) {
      const { error } = await supabase
        .from('users_cbt')
        .delete()
        .eq('id', id);

      if (!error) {
        setMsg({ type: 'success', text: `Akun ${name} berhasil dihapus.` });
        fetchUsers();
      } else {
        setMsg({ type: 'error', text: 'Gagal menghapus akun.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <title>Manajemen Peserta - Admin Panel</title>
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">MANAJEMEN DATA PESERTA</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Kelola hak akses dan registrasi akun Mahasiswa, Dosen, serta Pengawas CBT.</p>
        </div>

        {/* NOTIFIKASI */}
        {msg.text && (
          <div className={`p-4 rounded-xl border text-sm font-bold ${
            msg.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}>
            {msg.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* FORM TAMBAH USER */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
            <h2 className="text-md font-bold text-slate-800 mb-4 tracking-tight">Tambah Akun Baru</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                <input 
                  type="text" required value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)}
                  placeholder="Contoh: Budi Santoso, S.Kom."
                  className="w-full border border-slate-200 px-3.5 py-2 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Username / NIM</label>
                <input 
                  type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username login..."
                  className="w-full border border-slate-200 px-3.5 py-2 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Kata Sandi / Password</label>
                <input 
                  type="text" required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password akun..."
                  className="w-full border border-slate-200 px-3.5 py-2 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Hak Akses / Peran (Role)</label>
                <select 
                  value={role} onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="mahasiswa">🎓 Mahasiswa (Peserta)</option>
                  <option value="dosen">👨‍🏫 Dosen (Pengajar)</option>
                  <option value="pengawas">👁️ Pengawas Lapangan</option>
                </select>
              </div>

              <button 
                type="submit" disabled={submitLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {submitLoading ? 'Menyimpan...' : 'Daftarkan Akun'}
              </button>
            </form>
          </div>

          {/* TABEL DATA AKUN */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-md font-bold text-slate-800 tracking-tight">Daftar Akun Pengguna</h2>
              <button onClick={fetchUsers} className="text-xs font-bold text-blue-600 hover:underline">🔄 Segarkan</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/50 border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider">
                    <th className="p-4 pl-6">Nama Lengkap</th>
                    <th className="p-4">Username</th>
                    <th className="p-4">Role</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-400 font-semibold">Memuat data akun...</td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-400 font-semibold">Belum ada data pengguna.</td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-4 pl-6 font-bold text-slate-800">{user.nama_lengkap}</td>
                        <td className="p-4 font-mono text-xs bg-slate-50/40">{user.username}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            user.role === 'admin' ? 'bg-slate-100 text-slate-700' :
                            user.role === 'dosen' ? 'bg-emerald-50 text-emerald-700' :
                            user.role === 'pengawas' ? 'bg-indigo-50 text-indigo-700' :
                            'bg-blue-50 text-blue-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {user.role !== 'admin' ? (
                            <button 
                              onClick={() => handleDeleteUser(user.id, user.nama_lengkap)}
                              className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-3 py-1.5 rounded-lg transition"
                            >
                              Hapus
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 font-semibold">Utama</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
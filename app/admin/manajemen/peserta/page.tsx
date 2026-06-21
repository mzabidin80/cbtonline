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

export default function DataPesertaPage() {
  const [users, setUsers] = useState<UserCBT[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [role, setRole] = useState<'mahasiswa' | 'dosen' | 'pengawas'>('mahasiswa');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users_cbt')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setMsg({ type: '', text: '' });

    const { error } = await supabase
      .from('users_cbt')
      .insert([{ username, password, nama_lengkap: namaLengkap, role }]);

    if (error) {
      setMsg({ type: 'error', text: `Gagal menyimpan: ${error.message}` });
    } else {
      setMsg({ type: 'success', text: 'Peserta baru berhasil ditambahkan ke database!' });
      setUsername('');
      setPassword('');
      setNamaLengkap('');
      fetchUsers();
    }
    setSubmitLoading(false);
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (confirm(`Hapus permanen akun milik: ${name}?`)) {
      const { error } = await supabase.from('users_cbt').delete().eq('id', id);
      if (!error) {
        setMsg({ type: 'success', text: 'Data peserta berhasil dihapus!' });
        fetchUsers();
      }
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h3 className="text-xl font-black text-slate-800 tracking-tight">DATA PESERTA</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Manajemen registrasi, enkripsi login, dan hak akses peserta ujian online.</p>
      </div>

      {msg.text && (
        <div className={`p-3.5 rounded-xl border text-xs font-bold ${
          msg.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
        }`}>
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* INPUT FORM CARD */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/70">
          <h4 className="text-sm font-bold text-slate-800 mb-4 tracking-tight">Formulir Tambah Peserta</h4>
          <form onSubmit={handleAddUser} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1">Nama Lengkap</label>
              <input type="text" required value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} className="w-full border border-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:border-blue-500 text-sm" placeholder="Nama & Gelar..." />
            </div>
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1">Username / NIM</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border border-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:border-blue-500 text-sm" placeholder="ID Akun unik..." />
            </div>
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1">Password</label>
              <input type="text" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:border-blue-500 text-sm" placeholder="Kunci sandi..." />
            </div>
            <div>
              <label className="block font-bold text-slate-500 uppercase mb-1">Otoritas Peran (Role)</label>
              <select value={role} onChange={(e) => setRole(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none text-sm font-semibold text-slate-600">
                <option value="mahasiswa">🎓 Mahasiswa (Peserta)</option>
                <option value="dosen">👨‍🏫 Dosen (Pengajar)</option>
                <option value="pengawas">👁️ Pengawas Ruangan</option>
              </select>
            </div>
            <button type="submit" disabled={submitLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition disabled:opacity-50 text-sm shadow-md shadow-blue-500/10 mt-2">
              {submitLoading ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </form>
        </div>

        {/* DATA TABLE CARD */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Entri Pengguna Terdaftar</span>
            <button onClick={fetchUsers} className="text-xs font-bold text-blue-600 hover:underline">🔄 Reload</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100/40 border-b border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                  <th className="p-3.5 pl-5">Nama Anggota</th>
                  <th className="p-3.5">Username</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                {loading ? (
                  <tr><td colSpan={4} className="p-6 text-center text-slate-400">Loading data...</td></tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/60 transition">
                      <td className="p-3.5 pl-5 font-bold text-slate-800">{user.nama_lengkap}</td>
                      <td className="p-3.5 font-mono text-slate-500 bg-slate-50/30">{user.username}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                          user.role === 'admin' ? 'bg-slate-100 text-slate-600' :
                          user.role === 'dosen' ? 'bg-emerald-50 text-emerald-700' :
                          user.role === 'pengawas' ? 'bg-indigo-50 text-indigo-700' : 'bg-blue-50 text-blue-700'
                        }`}>{user.role}</span>
                      </td>
                      <td className="p-3.5 text-center">
                        {user.role !== 'admin' && (
                          <button onClick={() => handleDeleteUser(user.id, user.nama_lengkap)} className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-2 py-1 rounded-md transition text-[11px]">Hapus</button>
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
  );
}
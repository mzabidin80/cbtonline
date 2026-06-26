'use client';

import { useState } from 'react';

interface Pengawas {
  id: string;
  username: string;
  nama_lengkap: string;
  nip_nidn: string;
  jabatan: string;
  sub_bidang: string;
  homebase: string;
  fakultas: string;
  hak_akses: string;
}

export default function DataUserPengawasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listPengawas, setListPengawas] = useState<Pengawas[]>([
    {
      id: 'pws-1102-uuid',
      username: 'pengawas_hendra',
      nama_lengkap: 'Hendra Wijaya, S.Kom.',
      nip_nidn: '198911042015041002',
      jabatan: 'Staf Administrasi Akademik',
      sub_bidang: 'Seksi Ujian & Penjadwalan',
      homebase: 'Gedung Rektorat Lt. 2',
      fakultas: 'Fakultas Kedokteran',
      hak_akses: 'PENGAWAS',
    }
  ]);

  const [form, setForm] = useState({
    username: '', password: '', nama_lengkap: '', nip_nidn: '',
    jabatan: '', sub_bidang: '', homebase: '', fakultas: ''
  });

  const handleSimpanPengawas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.nama_lengkap) {
      alert('Mohon lengkapi Username dan Nama Lengkap!');
      return;
    }

    const pwsBaru: Pengawas = {
      id: `pws-${Math.floor(1000 + Math.random() * 9000)}-uuid`,
      username: form.username,
      nama_lengkap: form.nama_lengkap,
      nip_nidn: form.nip_nidn || '-',
      jabatan: form.jabatan || '-',
      sub_bidang: form.sub_bidang || '-',
      homebase: form.homebase || '-',
      fakultas: form.fakultas || '-',
      hak_akses: 'PENGAWAS'
    };

    setListPengawas([...listPengawas, pwsBaru]);
    setIsModalOpen(false);
    setForm({
      username: '', password: '', nama_lengkap: '', nip_nidn: '',
      jabatan: '', sub_bidang: '', homebase: '', fakultas: ''
    });
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      <title>Data User Pengawas - Panel Kontrol CBT</title>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-xs border border-slate-200/60 gap-4">
        <div>
          <h3 className="text-base font-black text-slate-800 tracking-wider uppercase flex items-center gap-2">
            🕵️‍♂️ Sub-Menu Kontrol Data User Pengawas
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Kelola data staf pengawas ujian, pembagian sub bidang kerja, penugasan fakultas, dan hak monitoring ruang.
          </p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm flex items-center gap-2">
          ➕ Tambah Akun Pengawas
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-200 text-[10px] font-bold tracking-wider uppercase border-b border-slate-800">
                <th className="px-4 py-3.5">ID</th>
                <th className="px-4 py-3.5">Username</th>
                <th className="px-4 py-3.5">Nama Lengkap</th>
                <th className="px-4 py-3.5">NIP / NIDN</th>
                <th className="px-4 py-3.5">Jabatan</th>
                <th className="px-4 py-3.5">Sub Bidang</th>
                <th className="px-4 py-3.5">Homebase</th>
                <th className="px-4 py-3.5">Fakultas</th>
                <th className="px-4 py-3.5 text-center">Hak Akses</th>
                <th className="px-4 py-3.5 text-center">Aksi Atur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-medium">
              {listPengawas.map((pws) => (
                <tr key={pws.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{pws.id}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{pws.username}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{pws.nama_lengkap}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">{pws.nip_nidn}</td>
                  <td className="px-4 py-3 text-slate-600">{pws.jabatan}</td>
                  <td className="px-4 py-3 text-slate-600">{pws.sub_bidang}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px]">{pws.homebase}</td>
                  <td className="px-4 py-3 text-slate-600">{pws.fakultas}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-md text-[10px] uppercase border border-indigo-100">
                      {pws.hak_akses}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-1.5">
                      <button className="text-[11px] font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg transition">✏️ Edit</button>
                      <button className="text-[11px] font-bold text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-lg transition">🗑️ Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div>
                <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide">➕ Form Tambah Akun Pengawas</h4>
                <p className="text-[11px] text-slate-500 font-medium">Buat otorisasi akun pengawas ruang ujian baru.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleSimpanPengawas} className="p-6 space-y-4 overflow-y-auto text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap beserta Gelar *</label>
                  <input required type="text" value={form.nama_lengkap} onChange={(e) => setForm({...form, nama_lengkap: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NIP / NIDN (Opsional)</label>
                  <input type="text" value={form.nip_nidn} onChange={(e) => setForm({...form, nip_nidn: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Username Login *</label>
                  <input required type="text" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Password *</label>
                  <input required type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Jabatan Kontrol</label>
                  <input type="text" placeholder="Contoh: Penata Akademik" value={form.jabatan} onChange={(e) => setForm({...form, jabatan: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Sub Bidang Kerja</label>
                  <input type="text" placeholder="Contoh: Bagian Kepegawaian" value={form.sub_bidang} onChange={(e) => setForm({...form, sub_bidang: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fakultas Koordinasi</label>
                  <input type="text" value={form.fakultas} onChange={(e) => setForm({...form, fakultas: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Homebase Tugas</label>
                  <input type="text" value={form.homebase} onChange={(e) => setForm({...form, homebase: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-xl text-[11px] font-semibold flex justify-between items-center">
                <span>🔒 HAK AKSES SISTEM OTOMATIS:</span>
                <span className="bg-indigo-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">PENGAWAS</span>
              </div>
              <div className="flex gap-2.5 pt-4 border-t border-slate-100 text-xs font-bold">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl">Batal</button>
                <button type="submit" className="flex-1 bg-emerald-600 text-white py-3 rounded-xl shadow-md">Simpan Akun Pengawas</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';

interface Operator {
  id: string;
  username: string;
  nama_lengkap: string;
  nip_nidn: string;
  jab_operator_teknisi: string;
  penempatan: string;
  homebase: string;
  fakultas: string;
  hak_akses: string;
}

export default function DataUserOperatorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listOperator, setListOperator] = useState<Operator[]>([
    {
      id: 'opr-4409-uuid',
      username: 'proktor_andri',
      nama_lengkap: 'Andri Wijaya, S.T.',
      nip_nidn: '199105142018031005',
      jab_operator_teknisi: 'Proktor Utama IT',
      penempatan: 'Lab Komputer Rekayasa Gedung C',
      homebase: 'Pusat Komputer (PUSKOM)',
      fakultas: 'Fakultas Teknik',
      hak_akses: 'OPERATOR',
    }
  ]);

  const [form, setForm] = useState({
    username: '', password: '', nama_lengkap: '', nip_nidn: '',
    jab_operator_teknisi: 'Proktor Utama', penempatan: '', homebase: '',AppFakultas: '', fakultas: ''
  });

  const handleSimpanOperator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.nama_lengkap) {
      alert('Mohon isi field utama!');
      return;
    }

    const oprBaru: Operator = {
      id: `opr-${Math.floor(1000 + Math.random() * 9000)}-uuid`,
      username: form.username,
      nama_lengkap: form.nama_lengkap,
      nip_nidn: form.nip_nidn || '-',
      jab_operator_teknisi: form.jab_operator_teknisi,
      penempatan: form.penempatan || '-',
      homebase: form.homebase || '-',
      fakultas: form.fakultas || '-',
      hak_akses: 'OPERATOR'
    };

    setListOperator([...listOperator, oprBaru]);
    setIsModalOpen(false);
    setForm({
      username: '', password: '', nama_lengkap: '', nip_nidn: '',
      jab_operator_teknisi: 'Proktor Utama', penempatan: '', homebase: '', AppFakultas: '', fakultas: ''
    });
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      <title>Data User Operator - Panel Kontrol CBT</title>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-xs border border-slate-200/60 gap-4">
        <div>
          <h3 className="text-base font-black text-slate-800 tracking-wider uppercase flex items-center gap-2">
            🛠️ Sub-Menu Kontrol Data User Operator / Teknisi
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Kelola akun proktor server, teknisi jaringan komputer, penempatan lab ujian, dan sinkronisasi server lokal.
          </p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm flex items-center gap-2">
          ➕ Tambah Akun Operator
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
                <th className="px-4 py-3.5">Jab. Operator/Teknisi</th>
                <th className="px-4 py-3.5">Penempatan</th>
                <th className="px-4 py-3.5">Homebase</th>
                <th className="px-4 py-3.5">Fakultas</th>
                <th className="px-4 py-3.5 text-center">Hak Akses</th>
                <th className="px-4 py-3.5 text-center">Aksi Atur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-medium">
              {listOperator.map((opr) => (
                <tr key={opr.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{opr.id}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{opr.username}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{opr.nama_lengkap}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">{opr.nip_nidn}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <span className="bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded text-[11px] border border-amber-100">
                      {opr.jab_operator_teknisi}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-[11px]">{opr.penempatan}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px]">{opr.homebase}</td>
                  <td className="px-4 py-3 text-slate-600">{opr.fakultas}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-teal-50 text-teal-700 font-bold px-2.5 py-1 rounded-md text-[10px] uppercase border border-teal-100">
                      {opr.hak_akses}
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
                <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide">➕ Form Tambah Akun Operator</h4>
                <p className="text-[11px] text-slate-500 font-medium">Registrasi infrastruktur penugasan tim IT dan Proktor.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleSimpanOperator} className="p-6 space-y-4 overflow-y-auto text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap & Gelar *</label>
                  <input required type="text" value={form.nama_lengkap} onChange={(e) => setForm({...form, nama_lengkap: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NIP / NIK Pegawai</label>
                  <input type="text" value={form.nip_nidn} onChange={(e) => setForm({...form, nip_nidn: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Username Login *</label>
                  <input required type="text" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Password Kontrol *</label>
                  <input required type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Jabatan Operator / Teknisi</label>
                  <select value={form.jab_operator_teknisi} onChange={(e) => setForm({...form, jab_operator_teknisi: e.target.value})} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs bg-white outline-none focus:border-emerald-600">
                    <option value="Proktor Utama">Proktor Utama</option>
                    <option value="Proktor Pembantu">Proktor Pembantu</option>
                    <option value="Teknisi Jaringan">Teknisi Jaringan</option>
                    <option value="Admin Lab Server">Admin Lab Server</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Penempatan Unit Lab / Ruang</label>
                  <input type="text" placeholder="Contoh: Lab Multimedia 3" value={form.penempatan} onChange={(e) => setForm({...form, penempatan: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fakultas</label>
                  <input type="text" value={form.fakultas} onChange={(e) => setForm({...form, fakultas: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Homebase Admin</label>
                  <input type="text" value={form.homebase} onChange={(e) => setForm({...form, homebase: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600" />
                </div>
              </div>
              <div className="p-3 bg-teal-50 text-teal-700 border border-teal-100 rounded-xl text-[11px] font-semibold flex justify-between items-center">
                <span>🔒 HAK AKSES SISTEM OTOMATIS:</span>
                <span className="bg-teal-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">OPERATOR</span>
              </div>
              <div className="flex gap-2.5 pt-4 border-t border-slate-100 text-xs font-bold">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl">Batal</button>
                <button type="submit" className="flex-1 bg-emerald-600 text-white py-3 rounded-xl shadow-md">Simpan Akun Operator</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
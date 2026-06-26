'use client';

import { useState } from 'react';

// Interface untuk tipe data Dosen sesuai field yang diminta
interface Dosen {
  id: string;
  username: string;
  nama_lengkap: string;
  nip_nidn: string;
  program_studi: string;
  jurusan: string;
  homebase: string;
  fakultas: string;
  hak_akses: string;
}

export default function DataUserDosenPage() {
  // State Kontrol Modal Pop-up
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State Dummy Data Awal untuk contoh visualisasi tabel
  const [listDosen, setListDosen] = useState<Dosen[]>([
    {
      id: 'dsn-8921-uuid',
      username: 'dosen_budi',
      nama_lengkap: 'Dr. Budi Santoso, M.T.',
      nip_nidn: '198503122010121003',
      program_studi: 'Teknik Informatika',
      jurusan: 'Teknologi Informasi',
      homebase: 'Kampus Utama Pusat',
      fakultas: 'Fakultas Teknik',
      hak_akses: 'DOSEN',
    }
  ]);

  // State Form Input Tambah Dosen
  const [form, setForm] = useState({
    username: '',
    password: '',
    nama_lengkap: '',
    nip_nidn: '',
    program_studi: '',
    jurusan: '',
    homebase: '',
    fakultas: ''
  });

  // Handle Simpan Akun Dosen Baru
  const handleSimpanDosen = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi Sederhana
    if (!form.username || !form.nama_lengkap || !form.nip_nidn) {
      alert('Mohon lengkapi data utama Dosen!');
      return;
    }

    const dosenBaru: Dosen = {
      id: `dsn-${Math.floor(1000 + Math.random() * 9000)}-uuid`, // Auto-generate ID unik singkat
      username: form.username,
      nama_lengkap: form.nama_lengkap,
      nip_nidn: form.nip_nidn,
      program_studi: form.program_studi || '-',
      jurusan: form.jurusan || '-',
      homebase: form.homebase || '-',
      fakultas: form.fakultas || '-',
      hak_akses: 'DOSEN' // Terkunci otomatis sebagai DOSEN
    };

    setListDosen([...listDosen, dosenBaru]);
    setIsModalOpen(false); // Tutup Modal
    
    // Reset Form
    setForm({
      username: '', password: '', nama_lengkap: '', nip_nidn: '',
      program_studi: '', jurusan: '', homebase: '', fakultas: ''
    });

    alert('Akun Dosen BERHASIL ditambahkan ke dalam daftar temporary frontend!');
  };

  // Handle Hapus Dosen
  const handleHapusDosen = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus akun dosen ini?')) {
      setListDosen(listDosen.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      <title>Data User Dosen - Panel Kontrol CBT</title>

      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-xs border border-slate-200/60 gap-4">
        <div>
          <h3 className="text-base font-black text-slate-800 tracking-wider uppercase flex items-center gap-2">
            👨‍🏫 Sub-Menu Kontrol Data User Dosen
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Kelola hak akses pengajar, konfigurasi program studi, homebase akademik, dan data profil dosen prodi.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm flex items-center gap-2 select-none"
        >
          ➕ Tambah Akun Dosen
        </button>
      </div>

      {/* TABEL RESPONSIVE LIST DOSEN */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-200 text-[10px] font-bold tracking-wider uppercase border-b border-slate-800">
                <th className="px-4 py-3.5">ID</th>
                <th className="px-4 py-3.5">Username</th>
                <th className="px-4 py-3.5">Nama Lengkap</th>
                <th className="px-4 py-3.5">NIP / NIDN</th>
                <th className="px-4 py-3.5">Program Studi</th>
                <th className="px-4 py-3.5">Jurusan</th>
                <th className="px-4 py-3.5">Homebase</th>
                <th className="px-4 py-3.5">Fakultas</th>
                <th className="px-4 py-3.5 text-center">Hak Akses</th>
                <th className="px-4 py-3.5 text-center">Aksi Atur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-medium">
              {listDosen.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-slate-400 font-bold">
                    Belum ada data akun dosen. Klik tombol diatas untuk menambahkan.
                  </td>
                </tr>
              ) : (
                listDosen.map((dosen) => (
                  <tr key={dosen.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{dosen.id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{dosen.username}</td>
                    <td className="px-4 py-3 font-bold text-slate-800">{dosen.nama_lengkap}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{dosen.nip_nidn}</td>
                    <td className="px-4 py-3 text-slate-600">{dosen.program_studi}</td>
                    <td className="px-4 py-3 text-slate-600">{dosen.jurusan}</td>
                    <td className="px-4 py-3 text-slate-500 text-[11px]">{dosen.homebase}</td>
                    <td className="px-4 py-3 text-slate-600">{dosen.fakultas}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-md text-[10px] tracking-wide uppercase border border-blue-100">
                        {dosen.hak_akses}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center items-center gap-1.5">
                        <button className="text-[11px] font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg transition">
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleHapusDosen(dosen.id)}
                          className="text-[11px] font-bold text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-lg transition"
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

      {/* MODAL POP-UP TAMBAH AKUN DOSEN */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div>
                <h4 className="font-black text-sm text-slate-800 uppercase tracking-wide">➕ Form Tambah Akun Dosen</h4>
                <p className="text-[11px] text-slate-500 font-medium">Isi kelengkapan data dosen pengajar baru di bawah ini.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm p-1">✕</button>
            </div>

            {/* Form Konten (Dengan Scroll jika layar vertikal kecil) */}
            <form onSubmit={handleSimpanDosen} className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
              
              {/* Baris 1: Nama & NIP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap beserta Gelar *</label>
                  <input required type="text" placeholder="Contoh: Dr. Ir. H. Ahmad, M.Kom." value={form.nama_lengkap} onChange={(e) => setForm({...form, nama_lengkap: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NIP / NIDN Pegawai *</label>
                  <input required type="text" placeholder="Contoh: 199208112019031012" value={form.nip_nidn} onChange={(e) => setForm({...form, nip_nidn: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-emerald-600 transition" />
                </div>
              </div>

              {/* Baris 2: Username & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Username Login *</label>
                  <input required type="text" placeholder="Contoh: ahmad_cbt" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Password Akses Akun *</label>
                  <input required type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 transition" />
                </div>
              </div>

              {/* Baris 3: Fakultas & Jurusan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fakultas</label>
                  <input type="text" placeholder="Contoh: Fakultas Ilmu Komputer" value={form.fakultas} onChange={(e) => setForm({...form, fakultas: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Jurusan</label>
                  <input type="text" placeholder="Contoh: Informatika" value={form.jurusan} onChange={(e) => setForm({...form, jurusan: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 transition" />
                </div>
              </div>

              {/* Baris 4: Program Studi & Homebase */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Program Studi</label>
                  <input type="text" placeholder="Contoh: S1 Teknik Informatika" value={form.program_studi} onChange={(e) => setForm({...form, program_studi: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 transition" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Homebase Pangkalan Induk</label>
                  <input type="text" placeholder="Contoh: Kampus Banjarbaru" value={form.homebase} onChange={(e) => setForm({...form, homebase: e.target.value})} className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-600 transition" />
                </div>
              </div>

              {/* Info Terkunci */}
              <div className="p-3 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-[11px] font-semibold flex justify-between items-center">
                <span>🔒 HAK AKSES SISTEM OTOMATIS:</span>
                <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">DOSEN</span>
              </div>

              {/* Footer / Aksi Atur di dalam Modal */}
              <div className="flex gap-2.5 pt-4 border-t border-slate-100 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-xl transition"
                >
                  Batal / Tutup
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl shadow-md transition"
                >
                  Simpan Akun Dosen
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
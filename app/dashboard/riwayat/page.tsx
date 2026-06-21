'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Riwayat {
  id: number;
  nama_lengkap: string;
  skor: number;
  total_soal: number;
  waktu_selesai: string;
}

export default function RiwayatNilaiPage() {
  const [daftarRiwayat, setDaftarRiwayat] = useState<Riwayat[]>([]);
  const [loading, setLoading] = useState(true);
  const [namaMhs, setNamaMhs] = useState('');

  useEffect(() => {
    const nama = localStorage.getItem('user_nama') || 'Pengguna';
    setNamaMhs(nama);
    ambilRiwayat(nama);
  }, []);

  const ambilRiwayat = async (nama: string) => {
    try {
      const { data, error } = await supabase
        .from('results_cbt')
        .select('*')
        .eq('nama_lengkap', nama)
        .order('waktu_selesai', { ascending: false });

      if (error) throw error;
      if (data) setDaftarRiwayat(data as Riwayat[]);
    } catch (err) {
      console.error('Gagal mengambil riwayat:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi memformat tanggal agar mudah dibaca
  const formatTanggal = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      
      {/* Header Navigasi */}
      <nav className="bg-[#2C1B12] text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-amber-100 hover:text-white transition text-sm font-bold">
            ⬅ Kembali ke Dashboard
          </Link>
          <span className="border-l border-amber-900/50 h-6"></span>
          <span className="font-bold text-lg tracking-wide uppercase text-amber-100">
            Riwayat Hasil Ujian
          </span>
        </div>
        <div className="text-sm font-medium">Mahasiswa: {namaMhs}</div>
      </nav>

      {/* Konten Utama */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6">
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-extrabold text-xl text-gray-800">Daftar Nilai Anda</h2>
            <button 
              onClick={() => ambilRiwayat(namaMhs)} 
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg font-bold text-gray-600 transition"
            >
              🔄 Refresh Data
            </button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 text-center text-gray-400 font-medium">⏳ Menghubungkan ke database...</div>
            ) : daftarRiwayat.length === 0 ? (
              <div className="p-20 text-center space-y-3">
                <div className="text-4xl">📭</div>
                <p className="text-gray-500 font-medium">Belum ada riwayat ujian yang tersimpan.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest font-bold">
                    <th className="px-6 py-4">Waktu Selesai</th>
                    <th className="px-6 py-4">Mata Uji</th>
                    <th className="px-6 py-4 text-center">Total Soal</th>
                    <th className="px-6 py-4 text-center">Skor Akhir</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {daftarRiwayat.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                        {formatTanggal(item.waktu_selesai)}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">
                        Ujian Kompetensi CBT
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-600">
                        {item.total_soal} Butir
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-lg font-black ${item.skor >= 70 ? 'text-emerald-600' : 'text-orange-600'}`}>
                          {item.skor}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                          item.skor >= 70 ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'
                        }`}>
                          {item.skor >= 70 ? 'Lulus' : 'Remedial'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Informasi Bantuan */}
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start space-x-4">
          <span className="text-xl">💡</span>
          <p className="text-xs text-blue-700 leading-relaxed font-medium">
            Nilai yang muncul di atas adalah hasil murni pengerjaan sistem CBT Online MZA FEB ULM. 
            Jika terdapat ketidaksinkronan data, silakan hubungi bagian akademik atau pengawas ujian terkait.
          </p>
        </div>

      </main>

      <footer className="py-6 text-center text-gray-400 text-[10px] uppercase tracking-widest font-bold">
        &copy; FEB ULM Portal - Hasil Ujian Mahasiswa
      </footer>
    </div>
  );
}
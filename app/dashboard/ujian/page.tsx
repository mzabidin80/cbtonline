'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Soal {
  id: number;
  pertanyaan: string;
  pilihan_a: string;
  pilihan_b: string;
  pilihan_c: string;
  pilihan_d: string;
  kunci_jawaban: string;
}

export default function RuangUjianPage() {
  const [namaMhs, setNamaMhs] = useState('');
  const [daftarSoal, setDaftarSoal] = useState<Soal[]>([]);
  const [nomorAktif, setNomorAktif] = useState(0);
  const [jawabanTerpilih, setJawabanTerpilih] = useState<{ [key: number]: string }>({});
  const [sisaWaktu, setSisaWaktu] = useState(3600); // 1 Jam
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNamaMhs(localStorage.getItem('user_nama') || 'Budi Santoso');
    ambilSoalDariSupabase();
  }, []);

  // 📥 Ambil Soal langsung dari Supabase
  const ambilSoalDariSupabase = async () => {
    try {
      const { data, error } = await supabase.from('questions_cbt').select('*').order('id', { ascending: true });
      if (data) setDaftarSoal(data as Soal[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ⏱️ Fungsi Hitung Mundur Waktu
  useEffect(() => {
    if (loading || daftarSoal.length === 0) return;
    if (sisaWaktu <= 0) {
      handleSelesaiUjian();
      return;
    }
    const timer = setInterval(() => setSisaWaktu((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [sisaWaktu, loading, daftarSoal]);

  const formatWaktu = (detik: number) => {
    const h = Math.floor(detik / 3600).toString().padStart(2, '0');
    const m = Math.floor((detik % 3600) / 60).toString().padStart(2, '0');
    const s = (detik % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // 📝 Menyimpan Jawaban Sementara (Format 'A', 'B', 'C', 'D')
  const handlePilihJawaban = (opsi: string) => {
    setJawabanTerpilih({ ...jawabanTerpilih, [daftarSoal[nomorAktif].id]: opsi });
  };

  // 🚀 Proses Hitung Nilai & Simpan Hasil ke Supabase
  const handleSelesaiUjian = async () => {
    let jumlahBenar = 0;
    
    daftarSoal.forEach((soal) => {
      if (jawabanTerpilih[soal.id] === soal.kunci_jawaban) {
        jumlahBenar += 1;
      }
    });

    const nilaiAkhir = Math.round((jumlahBenar / daftarSoal.length) * 100);

    try {
      // Mengirimkan data nilai ke tabel results_cbt Supabase
      await supabase.from('results_cbt').insert([
        {
          nama_lengkap: namaMhs,
          skor: nilaiAkhir,
          total_soal: daftarSoal.length
        }
      ]);

      alert(`Ujian selesai! Skor Anda: ${nilaiAkhir}. Nilai sukses terekam aman di database.`);
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Terjadi kendala pengiriman nilai.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 font-medium">
        ⏳ Memuat Lembar Soal Ujian FEB ULM...
      </div>
    );
  }

  if (daftarSoal.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600 font-medium">
        ⚠️ Bank soal masih kosong di database Supabase Anda.
      </div>
    );
  }

  const soalSekarang = daftarSoal[nomorAktif];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      <nav className="bg-[#2C1B12] text-white px-8 py-4 flex justify-between items-center shadow-md">
        <span className="font-bold text-lg uppercase text-amber-100">CBT Online FEB ULM - Ruang Ujian</span>
        <span className="text-sm">Peserta: <strong className="text-white">{namaMhs}</strong></span>
      </nav>

      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Kolom Soal */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-xl font-bold text-sm block w-max mb-4">
              SOAL NOMOR {nomorAktif + 1} Dari {daftarSoal.length}
            </span>
            <p className="text-gray-800 text-lg font-medium mb-6 leading-relaxed">{soalSekarang.pertanyaan}</p>

            <div className="space-y-3">
              {[
                { kode: 'A', teks: soalSekarang.pilihan_a },
                { kode: 'B', teks: soalSekarang.pilihan_b },
                { kode: 'C', teks: soalSekarang.pilihan_c },
                { kode: 'D', teks: soalSekarang.pilihan_d }
              ].map((pil) => {
                const isSelected = jawabanTerpilih[soalSekarang.id] === pil.kode;
                return (
                  <button
                    key={pil.kode}
                    onClick={() => handlePilihJawaban(pil.kode)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition flex items-center space-x-3 ${
                      isSelected ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg border font-bold text-xs flex items-center justify-center ${
                      isSelected ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-500 border-gray-300'
                    }`}>{pil.kode}</div>
                    <span>{pil.teks}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigasi Bawah */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100">
            <button
              disabled={nomorAktif === 0}
              onClick={() => setNomorAktif(nomorAktif - 1)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
            >
              ⬅ Sebelumnya
            </button>
            {nomorAktif < daftarSoal.length - 1 ? (
              <button onClick={() => setNomorAktif(nomorAktif + 1)} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold">
                Selanjutnya ➡
              </button>
            ) : (
              <button onClick={handleSelesaiUjian} className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md">
                ✓ Selesai & Kirim Ujian
              </button>
            )}
          </div>
        </div>

        {/* Kolom Indikator Waktu & Kotak Nomor */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Sisa Waktu Anda</h4>
            <div className="text-3xl font-mono font-black text-red-600">{formatWaktu(sisaWaktu)}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-gray-700 text-xs font-bold uppercase tracking-wider mb-3 text-center">Navigasi Kotak Soal</h4>
            <div className="grid grid-cols-4 gap-2">
              {daftarSoal.map((soal, idx) => (
                <button
                  key={soal.id}
                  onClick={() => setNomorAktif(idx)}
                  className={`py-2 text-center text-xs font-bold rounded-lg ${
                    idx === nomorAktif ? 'bg-blue-600 text-white' : jawabanTerpilih[soal.id] ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
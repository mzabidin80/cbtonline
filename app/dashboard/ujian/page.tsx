'use client';

import { useEffect, useState } from 'react';

// Data simulasi soal ujian (Nanti bisa kita hubungkan ke Supabase)
const daftarSoalDummy = [
  {
    id: 1,
    pertanyaan: "Manakah di bawah ini yang merupakan komponen utama dalam laporan keuangan menurut SAK?",
    pilihan: [
      "A. Laporan Posisi Keuangan, Laporan Laba Rugi, Laporan Perubahan Ekuitas, Arus Kas",
      "B. Nota Penjualan, Kuitansi, Faktur Pajak, Slip Gaji",
      "C. Buku Besar, Jurnal Umum, Neraca Saldo, Jurnal Penutup",
      "D. Surat Perintah Kerja, Berita Acara, Amandemen Kontrak"
    ]
  },
  {
    id: 2,
    pertanyaan: "Dalam teori ekonomi makro, apa yang dimaksud dengan inflasi?",
    pilihan: [
      "A. Kenaikan harga barang tertentu secara mendadak",
      "B. Proses penurunan harga barang-barang secara umum dan terus-menerus",
      "C. Proses kenaikan harga-harga secara umum dan terus-menerus",
      "D. Kebijakan pemerintah untuk memotong nilai mata uang"
    ]
  },
  {
    id: 3,
    pertanyaan: "Fungsi utama dari manajemen keuangan pada sebuah perusahaan adalah...",
    pilihan: [
      "A. Melakukan rekrutmen pegawai baru di bagian keuangan",
      "B. Mengatur perencanaan, penganggaran, pemeriksaan, pengelolaan, dan penyimpanan dana",
      "C. Menjual produk langsung ke konsumen akhir",
      "D. Membuat desain kemasan produk agar menarik minat investor"
    ]
  }
];

export default function RuangUjianPage() {
  const [namaMhs, setNamaMhs] = useState('');
  const [nomorAktif, setNomorAktif] = useState(0); // Index soal dimulai dari 0
  const [jawabanTerpilih, setJawabanTerpilih] = useState<{ [key: number]: string }>({});
  const [sisaWaktu, setSisaWaktu] = useState(3600); // 1 Jam dalam hitungan detik

  // Ambil nama mahasiswa dari localStorage
  useEffect(() => {
    setNamaMhs(localStorage.getItem('user_nama') || 'Budi Santoso');
  }, []);

  // Hitung Mundur Waktu (Timer)
  useEffect(() => {
    if (sisaWaktu <= 0) {
      alert("Waktu ujian telah habis! Jawaban Anda akan otomatis dikirim.");
      handleSelesaiUjian();
      return;
    }
    const timer = setInterval(() => {
      setSisaWaktu((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [sisaWaktu]);

  // Format detik menjadi HH:MM:SS
  const formatWaktu = (detik: number) => {
    const h = Math.floor(detik / 3600).toString().padStart(2, '0');
    const m = Math.floor((detik % 3600) / 60).toString().padStart(2, '0');
    const s = (detik % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handlePilihJawaban = (pilihanTeks: string) => {
    setJawabanTerpilih({
      ...jawabanTerpilih,
      [daftarSoalDummy[nomorAktif].id]: pilihanTeks
    });
  };

  const handleSelesaiUjian = () => {
    alert("Ujian Selesai! Terima kasih telah mengerjakan ujian dengan jujur.");
    // Di sini nanti kita pasang fungsi insert ke tabel 'results_cbt' Supabase
    window.location.href = '/dashboard';
  };

  const soalSekarang = daftarSoalDummy[nomorAktif];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
      
      {/* Top Navigation Bar */}
      <nav className="bg-[#2C1B12] text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div>
          <span className="font-bold text-lg tracking-wide uppercase text-amber-100">
            CBT Online FEB ULM - Ruang Ujian
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-300">Peserta: <strong className="text-white">{namaMhs}</strong></span>
        </div>
      </nav>

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Kolom Kiri: Lembar Soal (Mengambil 3 Bagian Kolom) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-xl font-bold text-sm">
                SOAL NOMOR {nomorAktif + 1} Dari {daftarSoalDummy.length}
              </span>
            </div>

            {/* Teks Pertanyaan */}
            <p className="text-gray-800 text-lg font-medium leading-relaxed mb-6">
              {soalSekarang.pertanyaan}
            </p>

            {/* Pilihan Jawaban */}
            <div className="space-y-3">
              {soalSekarang.pilihan.map((pil, idx) => {
                const isSelected = jawabanTerpilih[soalSekarang.id] === pil;
                return (
                  <button
                    key={idx}
                    onClick={() => handlePilihJawaban(pil)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition flex items-center space-x-3 ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400 bg-white'
                    }`}>
                      {isSelected && '✓'}
                    </div>
                    <span>{pil}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tombol Navigasi Soal */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100">
            <button
              disabled={nomorAktif === 0}
              onClick={() => setNomorAktif(nomorAktif - 1)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold border border-gray-300 disabled:opacity-40 hover:bg-gray-50 transition"
            >
              ⬅ Sebelumnya
            </button>

            {nomorAktif < daftarSoalDummy.length - 1 ? (
              <button
                onClick={() => setNomorAktif(nomorAktif + 1)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition"
              >
                Selanjutnya ➡
              </button>
            ) : (
              <button
                onClick={handleSelesaiUjian}
                className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition shadow-md shadow-emerald-600/20"
              >
                ✓ Selesai & Kirim Ujian
              </button>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Timer & Nomor Peta Soal (1 Bagian Kolom) */}
        <div className="space-y-6">
          {/* Box Penunjuk Waktu */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center space-y-2">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Sisa Waktu Anda</h4>
            <div className="text-3xl font-mono font-black text-red-600 tracking-tight">
              {formatWaktu(sisaWaktu)}
            </div>
          </div>

          {/* Box Grid Nomor Soal */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-gray-700 text-xs font-bold uppercase tracking-wider mb-3 text-center">Navigasi Kotak Soal</h4>
            <div className="grid grid-cols-4 gap-2">
              {daftarSoalDummy.map((soal, idx) => {
                const sudahDijawab = !!jawabanTerpilih[soal.id];
                const sedangAktif = idx === nomorAktif;

                return (
                  <button
                    key={idx}
                    onClick={() => setNomorAktif(idx)}
                    className={`w-full py-2.5 text-center text-xs font-bold rounded-lg transition ${
                      sedangAktif
                        ? 'bg-blue-600 text-white shadow-sm'
                        : sudahDijawab
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
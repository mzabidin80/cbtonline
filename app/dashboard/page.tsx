'use client';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900">Selamat Datang di Dashboard Ujian 🎉</h1>
        <p className="mt-2 text-gray-600">Anda telah berhasil masuk ke sistem CBT Online MZA FEB ULM.</p>
        <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-xl">
          Menu ujian, daftar soal, dan hasil nilai Anda akan muncul di halaman ini.
        </div>
      </div>
    </div>
  );
}
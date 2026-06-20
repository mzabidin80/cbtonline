'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [role, setRole] = useState('mahasiswa');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi autentikasi sementara sebelum dicolok penuh ke fungsi database Supabase
    setTimeout(() => {
      alert(`Login berhasil sebagai ${role.toUpperCase()}!\nUsername: ${username}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        {/* Header Form */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-2xl">
            MZA
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            Selamat Datang
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sistem CBT Online MZA FEB ULM
          </p>
        </div>

        {/* Form Login */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md space-y-4">
            
            {/* Pilihan Role / Peran */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Masuk Sebagai
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              >
                <option value="mahasiswa">🎓 Mahasiswa (Peserta Ujian)</option>
                <option value="pengawas">👁️ Pengawas / Dosen</option>
                <option value="admin">🛠️ Administrator Sistem</option>
              </select>
            </div>

            {/* Input Username / NIM */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {role === 'mahasiswa' ? 'Nomor Induk Mahasiswa (NIM)' : 'Username / NIP'}
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === 'mahasiswa' ? 'Contoh: 2010312310001' : 'Contoh: admin_feb'}
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kata Sandi (Password)
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Tombol Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memproses...
                </span>
              ) : (
                'Masuk Ke Sistem'
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
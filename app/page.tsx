"use client";

import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [activeMenu, setActiveMenu] = useState("Beranda");

  const menus = ["Beranda", "Jadwal Ujian", "Info Lembaga", "Login"];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      
      {/* 1. Bar Atas Warna Cokelat/Kuning Pastel */}
      <div className="bg-[#e6c294] py-1.5 px-4 text-xs font-mono text-gray-800 border-b border-gray-300">
        CBT Online FEB ULM
      </div>

      {/* 2. Header & Navigasi Menu */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
          
          {/* Logo dan Identitas Lembaga */}
          <div className="flex items-center gap-4">
            {/* Logo Universitas Lambung Mangkurat (Placeholder Lingkaran Kuning) */}
            <div className="w-14 h-14 bg-yellow-400 rounded-full border-2 border-amber-500 flex items-center justify-center shadow-inner flex-shrink-0">
              <span className="text-[10px] font-bold text-center text-amber-900 leading-none">ULM<br/>LOGO</span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">MZA FEB ULM</h1>
              <p className="text-xs text-gray-500 font-medium">Jl. Brigjend H. Hasan Basri Kayu Tangi, Banjarmasin 70123</p>
            </div>
          </div>

          {/* Menu Navigasi Kanan */}
          <nav className="flex items-center">
            {menus.map((menu) => (
              <button
                key={menu}
                onClick={() => setActiveMenu(menu)}
                className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
                  activeMenu === menu
                    ? "bg-[#cfe2f3] text-blue-800 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {menu === "Login" ? (
                  <Link href="/login" className="w-full h-full block">Login</Link>
                ) : (
                  menu
                )}
              </button>
            ))}
          </nav>

        </div>
      </header>

      {/* 3. Banner Utama (Hero Section) */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="relative w-full h-[320px] md:h-[400px] rounded-lg overflow-hidden shadow-md border border-gray-200">
            
            {/* Gambar Latar Belakang Laptop (Menggunakan placeholder resolusi tinggi dari Unsplash) */}
            <img 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80" 
              alt="CBT Background" 
              className="w-full h-full object-cover brightness-[0.85]"
            />

            {/* Kotak Teks Sisi Kanan (Computer Based Test MZA FEB ULM) */}
            <div className="absolute inset-y-0 right-0 w-full md:w-1/2 flex flex-col justify-center items-start p-8 bg-gradient-to-l from-white/90 via-white/70 to-transparent md:to-transparent text-right md:text-left">
              <div className="bg-[#b6e2a1] text-gray-900 text-lg md:text-2xl font-black px-4 py-2 rounded-md shadow-sm border border-green-300 inline-block mb-3">
                Computer Based Test (CBT)
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight drop-shadow-sm">
                CBT ONLINE MZA FEB ULM
              </h2>
            </div>

          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-2">
          <span>&copy; 2020-2026</span>
          <a href="https://e-ujian.com" className="text-blue-600 hover:underline">e-ujian.com</a>
          <span className="hidden sm:inline">|</span>
          <span>SRV-1781910141</span>
          <span className="hidden sm:inline">|</span>
          <span>Your IP: 182.8.131.191</span>
        </div>
      </footer>

    </div>
  );
}
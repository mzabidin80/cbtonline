'use client';

export default function PengawasLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      {children}
    </div>
  );
}
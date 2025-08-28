"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react';

// Komponen ini menerima 'children' dari komponen server
const DashboardClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Jika sesi tidak terautentikasi, alihkan ke halaman login
    if (status === "unauthenticated") {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Tampilkan pesan loading saat status sesi sedang diperiksa
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Hanya render konten jika pengguna sudah terautentikasi
  if (status === "authenticated" || session) {
    return (
      <div className="container">
        <div className="grid">
          {/* Render komponen server yang dikirim sebagai children */}
          {children}
        </div>
      </div>
    );
  }

  // Jangan render apa pun jika belum terautentikasi (karena akan dialihkan)
  return null;
}

export default DashboardClientLayout;
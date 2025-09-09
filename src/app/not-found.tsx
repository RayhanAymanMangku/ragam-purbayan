import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Halaman Tidak Ditemukan</h1>
      <Link href="/" className="text-blue-500 hover:underline">
        Kembali ke beranda
      </Link>
    </div>
  )
}

export default NotFound
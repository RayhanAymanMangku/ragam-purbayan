"use client"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {

    const nav = [
        {
            id: 1,
            title: "Beranda",
            href: "/",
        },
        {
            id: 2,
            title: "Kerajinan",
            href: "/craft",
        },
        {
            id: 3,
            title: "Profil Kelurahan",
            href: "/profile",
        },
        {
            id: 4,
            title: "Kontak Kelurahan",
            href: "/contact",
        }
    ]


    return (
        <footer className="w-full border-t border-gray-200 bg-white">
            <div className="mx-auto w-full px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/assets/logo-pemkot.png"
                                width={100}
                                height={100}
                                alt='logo'
                                className='object-cover w-6 h-10 md:w-8 md:h-12'
                                priority
                            />
                            <h1 className='text-sm md:text-lg font-semibold'>Purbayan Craft</h1>
                        </Link>

                        <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="mr-2 h-4 w-4" />
                                <span>Jalan Kemasan Nomor 39 A Kotagede Yogyakarta</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Phone className="mr-2 h-4 w-4" />
                                <span>(0274) 417010 </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Mail className="mr-2 h-4 w-4" />
                                <span>purbayan@jogjakota.go.id</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className={`mb-4 text-sm font-semibold tracking-wider text-gray-900 `}>Tautan Cepat</h3>
                        <ul className="space-y-2">
                            {nav.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                                            {item.title}
                                        </Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className={`mb-4 text-sm font-semibold tracking-wider text-gray-900 `}>Kerajinan Lokal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/craft" className="text-sm text-gray-600 hover:text-gray-900">
                                    Logam
                                </Link>
                            </li>
                            <li>
                                <Link href="/craft" className="text-sm text-gray-600 hover:text-gray-900">
                                    Silver
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Media & Copyright */}
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <div className="flex space-x-6">

                            <Link href="https://www.instagram.com/mekanuma/?hl=en" className="text-gray-600 hover:text-gray-900" target='_blank' rel='noopener noreferrer'>
                                <span className="sr-only">Instagram</span>
                                {/* <FaInstagram className="h-5 w-5" /> */}
                            </Link>
                            <Link href="https://www.tiktok.com/@mekanuma?traffic_type=others&referer_url=amp_dankormarcup2021&referer_video_id=7030043175297273114" target='_blank' rel='noopener noreferrer' className="text-gray-600 hover:text-gray-900">
                                <span className="sr-only">Tiktok</span>
                                {/* <FaTiktok className="h-5 w-5" /> */}
                            </Link>

                        </div>
                        <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 md:flex-row md:space-x-4 md:space-y-0">
                            <span>© {new Date().getFullYear()} Purbayancraft. All rights reserved.</span>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
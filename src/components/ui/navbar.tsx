"use client"

import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'

export function Navbar() {
    const navLink = [
        {
            id: 1,
            name: "Beranda",
            href: "/"
        },
        {
            id: 2, name: "Kerajinan",
            href: "/craft"
        },
        {
            id: 3,
            name: "Profil Kelurahan",
            href: "/profile"
        },
        {
            id: 4,
            name: "Kontak Kelurahan",
            href: "/contact"
        },

    ]

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full flex h-20 items-center justify-between px-4 md:px-8">
                <Sheet>
                    <SheetTrigger asChild className='border w-fit h-fit px-2 py-1 rounded-3xl'>
                        <Button variant="ghost" size="icon" className='shadow-xs'>
                            <div className="flex items-center gap-2">
                                <Menu className="h-5 w-5" />
                                <h1 className='text-sm'>Menu</h1>
                            </div>
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription>
                                Jelajahi berbagai fitur yang tersedia
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 p-4">
                            <div className="grid grid-cols-1 gap-2">
                                {navLink.map((item) => (
                                    <Link href={item.href} key={item.name}>
                                        <Button variant="ghost" className="justify-start w-full">
                                            {item.name}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Center - Logo */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div>
                        <Link href="/" className='flex gap-2 items-center'>
                            <Image
                                src="/assets/logo-pemkot.png"
                                width={100}
                                height={100}
                                alt='logo'
                                className='object-cover w-6 h-10 md:w-8 md:h-12'
                                priority
                            />
                            <h1 className={`text-sm md:text-lg font-semibold`}>Purbayan Craft</h1>
                        </Link>
                    </div>
                </div>

                {/* <Link href="/craft">
                    <Button variant="ghost" size="sm" className="border w-fit h-fit px-2 py-1 rounded-3xl bg-transparent text-black hidden md:block">
                        Jelajahi Kerajinan
                    </Button>
                </Link> */}
                <svg width="25" height="25" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="drop-shadow">
                            <feDropShadow
                                dx="1" dy="1" stdDeviation="4" floodColor="#000000" floodOpacity="0.2" />
                        </filter>
                    </defs>

                    <g filter="url(#drop-shadow)">
                        <path fill="#FF0000" d="M 0 50 A 50 50 0 0 1 100 50 Z" />
                        <path fill="#FFFFFF" d="M 0 50 A 50 50 0 0 0 100 50 Z" />
                    </g>
                </svg>

            </div>
        </nav>
    )
}
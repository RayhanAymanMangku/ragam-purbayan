"use client"
import React from 'react'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import DashboardMenu from './dashboard-menu'
import { User } from 'lucide-react'
import Link from 'next/link'


const DashboardSidebar = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const pageTitle = useMemo(() => {
        switch (pathname) {
            case "/dashboard":
                return "Dashboard"
            case "/dashboard/craft":
                return "Craft"
            case "/dashboard/craft/create":
                return "Create Craft"
            case "/dashboard/profile":
                return "Profile"
            default:
                return "Dashboard"
        }
    }, [pathname])


    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <DashboardMenu currentPath={pathname} />
                <SidebarInset className="rounded-none">
                    <div className="flex pr-5 items-center justify-between  border-b">
                        <div className="flex h-15 items-center px-4">
                            <SidebarTrigger />
                            <h1 className="ml-4 text-xl font-semibold">{pageTitle}</h1>
                        </div>
                        <Link href="/dashboard/profile" className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                                <User className="w-5 h-5 text-gray-600" />
                            </div>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto p-4 bg-gray-50/50">{children}</div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}

export default DashboardSidebar
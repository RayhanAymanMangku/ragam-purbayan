"use client"
import React from 'react'
// import { useState } from 'react'
import { Landmark, LogOutIcon } from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { sidebarItem } from '../lib/constants'


const DashboardMenu = ({ currentPath }: { currentPath: string }) => {
    // const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    
    return (
        <>
            <Sidebar className="border-r">
                <SidebarHeader className="border-b p-4 h-[61px] bg-white">
                    <div className="flex gap-1 items-center">
                       <Landmark className="w-6 h-6 text-orange-500" />
                        <h1 className="text-lg font-semibold pt-2">Purbayan</h1>
                    </div>
                </SidebarHeader>
                <SidebarContent className="p-4 bg-white">
                    <SidebarMenu className="gap-2">
                        {sidebarItem.map((item) => {
                            return (
                                <SidebarMenuItem key={item.id} >
                                    <SidebarMenuButton
                                        asChild
                                        isActive={currentPath === item.href}
                                    >
                                        <Link href={item.href}>
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarContent>
                <div className="mt-auto border-t bg-white p-4">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Button className='bg-white shadow-none hover:bg-destructive/10 active:bg-destructive/10' >
                                    <LogOutIcon className="h-4 w-4 text-red-500" />
                                    <span className="text-red-500">Logout</span>
                                </Button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
            </Sidebar>
        </>
    )
}

export default DashboardMenu;
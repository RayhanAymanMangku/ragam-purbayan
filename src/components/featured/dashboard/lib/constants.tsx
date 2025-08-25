import { Layers, LayoutTemplate } from "lucide-react";

export const sidebarItem = [
    {
        id: 1,
        name: "Dashboard",
        icon: <LayoutTemplate className="h-4 w-4" />,
        href: "/dashboard",
    },
    {
        id: 2,
        name: "Crafts",
        icon: <Layers className="h-4 w-4" />,
        href: "/dashboard/craft",
    },
]

export const dashboardCardData = [
    {
        id: 1,
        title: "Total Crafts",
        value: 40,
        description: "Total number of craft registered",
        icon: <Layers className="h-4 w-4 text-orange-500" />,
        color: "bg-orange-100"
    },
   
]

export const craftTypeOptions = [
    {
        value: "logam",
        label: "Logam"
    },
    {
        value: "kayu",
        label: "Kayu"
    },
    {
        value: "emas",
        label: "Emas"
    },
    {
        value: "perak",
        label: "Perak"
    },
    {
        value: "makanan",
        label: "Makanan"
    },
    {
        value: "lainnya",
        label: "Lainnya"
    },
]
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


export const craftTypeOptions = [
    {
        value: "logam",
        label: "Logam",
        color: "bg-gray-200"
    },
    {
        value: "kayu",
        label: "Kayu",
        color: "bg-brown-200"
    },
    {
        value: "emas",
        label: "Emas",
        color: "bg-yellow-200"
    },
    {
        value: "perak",
        label: "Perak",
        color: "bg-gray-100"
    },
]
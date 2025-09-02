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
]
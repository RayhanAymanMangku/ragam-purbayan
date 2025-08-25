import { Card } from '@/components/ui/card'
import React from 'react'

interface DashboardCardProps {
    title: string;
    value: number;
    description: string;
    color: string;
    icon: React.ReactNode;
}

const DashboardCard = ({title, value, description, color, icon }:DashboardCardProps) => {
    return (
        <Card className='w-full rounded-sm p-6 shadow-none'>
            <div className="flex flex-col gap-2">
               <div className={`w-10 h-10 rounded-full ${color} items-center justify-center flex`}>
                    {icon}
               </div>
                <h1 className='text-lg'>{title}</h1>
                <h1 className='text-gray-500 text-xl font-semibold'>{value}</h1>
                <p className='text-gray-500 text-sm'>{description}</p>
            </div>
        </Card>
    )
}

export default DashboardCard
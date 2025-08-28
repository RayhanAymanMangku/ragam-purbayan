import { Card } from '@/components/ui/card'
import { Layers } from 'lucide-react';
import React from 'react'

interface DashboardCardProps {
   value: number
}

const DashboardCard = ({ value }: DashboardCardProps) => {
    return (
        <Card className='w-full rounded-sm p-6 shadow-none'>
            <div className="flex flex-col gap-2">
                <div className={`w-10 h-10 rounded-full bg-orange-100 items-center justify-center flex`}>
                    <Layers className="h-4 w-4 text-orange-500" />
                </div>
                <h1 className='text-lg'>Total Crafts</h1>
                <h1 className='text-gray-500 text-xl font-semibold'>{value}</h1>
                <p className='text-gray-500 text-sm'>Total number of craft registered</p>
            </div>
        </Card>
    )
}

export default DashboardCard
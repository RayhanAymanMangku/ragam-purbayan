import { Card } from '@/components/ui/card'
import React from 'react'

const DashboardProfileCard = ({ email }: { email: string }) => {
    return (
        <Card className='max-w-96 mx-auto p-6 shadow-sm rounded-sm'>
            <h2 className='text-lg font-semibold'>Profile Information</h2>
            <p className='text-gray-600'>Manage your profile settings and preferences.</p>
            <div className="flex justify-between w-full">
                <p className='font-semibold'>Email</p>
                <p>{email}</p>
            </div>
        </Card>

    )
}

export default DashboardProfileCard
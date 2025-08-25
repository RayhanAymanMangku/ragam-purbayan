import DashboardProfileCard from '@/components/featured/dashboard/components/dashboard-profile-card'
import { getSession } from '@/lib/auth-options'
import React from 'react'

const page = async () => {
  const session = await getSession();
  return (
    <div className='container'>
      <DashboardProfileCard email={session?.user?.email || ""} />
    </div>
  )
}

export default page
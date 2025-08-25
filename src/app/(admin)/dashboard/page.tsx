"use client"
import React, { useEffect } from 'react'
import DashboardCard from '@/components/featured/dashboard/components/dashboard-card'
import { dashboardCardData } from '@/components/featured/dashboard/lib/constants'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter()
  console.log('Session data:', session);


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/login');
    }
  }, [status, router]);

  return (
    <div className="container">
      <div className="grid">
        {dashboardCardData.map((card) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
            color={card.color}
    
          />
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
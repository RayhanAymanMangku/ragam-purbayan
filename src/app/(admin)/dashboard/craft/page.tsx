import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DashboardAssetsTableList from '@/components/featured/dashboard/components/dashboard-assets-tablelist'


const AssetsPage = () => {
  return (
    <div className="container flex flex-col gap-4">
      <header className='flex w-full justify-end items-center py-4'>
        <Link href="/dashboard/craft/create">
          <Button className='bg-orange-500 text-white hover:bg-orange-700 transition-all duration-300 rounded-sm'>
            Add Craft
          </Button>
        </Link>
      </header>
      <section>
        <DashboardAssetsTableList/>
      </section>
    </div>
  )
}

export default AssetsPage
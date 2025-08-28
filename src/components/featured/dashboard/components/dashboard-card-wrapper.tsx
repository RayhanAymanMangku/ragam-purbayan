import React from 'react'
import { countCraft } from '../services/craft.service'
import DashboardCard from './dashboard-card';

const DashboardCardWrapper = async () => {
    const data = await countCraft();

    return (
        <div className="">
            <DashboardCard value={data || 0} />
        </div>
    )
}

export default DashboardCardWrapper
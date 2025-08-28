import React from 'react';
import DashboardCardWrapper from '@/components/featured/dashboard/components/dashboard-card-wrapper';
import DashboardClientLayout from '@/components/featured/dashboard/components/dashboard-client-layout';


const DashboardPage = () => {
  return (
    <DashboardClientLayout>
      <DashboardCardWrapper />
    </DashboardClientLayout>
  );
};

export default DashboardPage;

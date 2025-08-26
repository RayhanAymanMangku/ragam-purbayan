import DashboardAssetsEditForm from '@/components/featured/dashboard/components/dashboard-assets-edit-form';
import { getCraftById } from '@/components/featured/dashboard/services/craft.service';

import React from 'react';

const AssetsEditPage = async ({ params }: { params: { id: string } }) => {
  
  const craftItem = await getCraftById(params.id);

  if (!craftItem) {
    return (
      <div className="container text-center p-10">
        <h2>Kerajinan Tidak Ditemukan</h2>
        <p>Data yang Anda cari tidak ada.</p>
      </div>
    );
  }

  return <DashboardAssetsEditForm initialData={craftItem} />;
};

export default AssetsEditPage;

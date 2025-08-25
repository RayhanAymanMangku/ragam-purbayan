import { LayoutGrid } from '@/components/featured/craft/components/layout-grid-image';
import { getCraftBySlug } from '@/components/featured/dashboard/services/craft.service';
import React from 'react';

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const craftItem = await getCraftBySlug((await params).slug);

    if (!craftItem || !craftItem.images || craftItem.images.length === 0) {
        return <div className="p-6 text-center">Kerajinan tidak ditemukan atau tidak memiliki gambar.</div>;
    }

    const formattedCards = craftItem.images.map((imageUrl: string, index: number) => ({
        id: `${craftItem.id}-${index}`, 
        thumbnail: imageUrl,
        email: craftItem.email,
        phone: craftItem.phone,
        className: '',
        maps: craftItem.maps,
        name: craftItem.name,
        owner: craftItem.owner,
        description: craftItem.description
    }));

    return (
        <main>
            <section>
                <LayoutGrid cards={formattedCards} />
            </section>
        </main>
    );
};

export default Page;
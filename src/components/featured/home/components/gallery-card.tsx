import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

interface GalleryCardProps {
    imgSrc: string
    cardTitle: string
    cardDescription: string
    badgeType: string
}

const GalleryCard = ({ imgSrc, cardTitle, cardDescription, badgeType }: GalleryCardProps) => {
    return (
        <Card className="w-full rounded-none p-0 shadow-none border-none flex flex-col">
            <CardContent className="p-0">
                <Image
                    src={imgSrc}
                    alt='img'
                    width={300}
                    height={300}
                    priority
                    className='rounded-md object-cover w-full h-80 hover:shadow-md transition-all duration-200'
                />
            </CardContent>
            <div className='flex flex-col p-0 gap-4'>
                <h1 className='text-2xl'>{cardTitle}</h1>
                <p className='text-gray-500 text-justify text-wrap text-sm'>
                    {cardDescription.split(' ').slice(0, 12).join(' ')}...
                </p>
                <Badge variant="secondary">{badgeType}</Badge>
            </div>
        </Card>
    )
}

export default GalleryCard
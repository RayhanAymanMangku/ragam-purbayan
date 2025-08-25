import { ArrowDownLeft } from 'lucide-react'
import React from 'react'

interface CardLocationProps {
  loc: string
  title: string
}
const CardLocation = ({ loc, title }: CardLocationProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-row justify-between items-center">
        <h1 className='text-2xl md:text-4xl'>{title}</h1>
        <ArrowDownLeft size={36} className='text-4xl' />
      </div>
      <iframe src={loc} style={{ border: 0 }} className="w-full h-96 rounded-xl" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

export default CardLocation
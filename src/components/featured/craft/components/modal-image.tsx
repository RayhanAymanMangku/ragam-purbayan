"use client"
import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { CardType } from '../../dashboard/types/Craft'

interface ModalImageProps {
    craft: CardType
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const ModalImage = ({ isOpen, onOpenChange, craft }: ModalImageProps) => {
    const [isZoomed, setIsZoomed] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const imageContainerRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current) return

        const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()

        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100

        setPosition({ x, y })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className='sm:max-w-md'>
                <DialogTitle></DialogTitle>
                <div className="">
                    <div
                        ref={imageContainerRef}
                        className="relative aspect-square overflow-hidden rounded-xl cursor-zoom-in"
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <Image
                            src={craft.thumbnail}
                            alt="thumbnail"
                            fill
                            className={`object-cover transition-transform duration-200  ${isZoomed ? "scale-150" : "scale-100"}`}
                            style={{
                                transformOrigin: `${position.x}% ${position.y}%`,
                            }}
                            priority={true}
                        />
                    </div>
                    </div>
            </DialogContent>
        </Dialog>
    )
}

export default ModalImage
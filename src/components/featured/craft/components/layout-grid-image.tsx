"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { CardType } from "../../dashboard/types/Craft"
import dynamic from "next/dynamic"

const DynamicCraftDetailModal = dynamic(() => import("./modal-image"))

export const LayoutGrid = ({ cards }: { cards: CardType[] }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null)

  if (!cards || cards.length < 0) {
    return <div className="w-full h-full p-4">No images to display</div>
  }

  const mainCard = cards[0] // First card as main image
  const thumbnailCards = cards.slice(1, 5) // Next 4 cards as thumbnails

  const handleClickCard = (card: CardType) => {
    setSelectedCard(card)
    setShowModal(true)
  }

  return (
     <div className="flex flex-col space-y-6">
      <div className="flex w-full flex-col md:flex-row gap-4">
        <div className="w-full md:w-[70%] h-full gap-4">
          <div className="flex flex-col gap-4">
            {/* Main image - full width on mobile, left side on desktop */}
            <div className="flex flex-col md:flex-row md:gap-4 h-auto md:h-[600px]">
              <div className="flex-1 h-64 md:h-full">
                <div className="relative overflow-hidden bg-white rounded-xl h-full w-full">
                  <Image
                    src={mainCard?.thumbnail || ""}
                    className="object-cover object-center h-full w-full transition-transform duration-200 hover:scale-105"
                    alt="main image"
                    fill
                  />
                </div>
              </div>

              {/* Thumbnails - row on mobile, column on desktop */}
              <div className="w-full md:w-48 flex flex-row md:flex-col gap-4 mt-4 md:mt-0 md:h-full">
                {thumbnailCards.slice(0, 3).map((card, i) => (
                  <div key={card.id} className="flex-1 md:flex-1">
                    <div className="relative overflow-hidden bg-white rounded-xl h-20 md:h-full w-full">
                      <Image
                        src={card.thumbnail || ""}
                        className="object-cover object-center h-full w-full transition-transform duration-200 hover:scale-105"
                        alt={`thumbnail ${i + 1}`}
                        onClick={() => handleClickCard(card)}
                        fill
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[30%] grid gap-4">
          <Card className="shadow-none border-gray-300">
            <CardContent className="space-y-4">
              <CardTitle>Hubungi Kami</CardTitle>
              <CardDescription>
                <div className="flex w-full flex-row justify-between">
                  <p>Owner</p>
                  <p>{mainCard.owner || "-"}</p>
                </div>
                <div className="flex w-full flex-row justify-between">
                  <p>Email</p>
                  <p>{mainCard.email || "-"}</p>
                </div>
                <div className="flex w-full flex-row justify-between">
                  <p>Telepon</p>
                  <p>{mainCard.phone || "-"}</p>
                </div>
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-none border-none p-0">
            <CardContent className="space-y-4 px-0">
              <CardDescription className="p-0">
                <iframe
                  src={mainCard.maps}
                  style={{ border: 0 }}
                  className="w-full h-48 md:h-80 lg:h-96 rounded-2xl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </CardDescription>
            </CardContent>
          </Card>

          <Link href={`https://wa.me/${mainCard.phone}`}>
            <Button
              variant="default"
              className="w-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 rounded-sm border-none"
            >
              Hubungi via WhatsApp
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 pt-4 border-t border-gray-200">
        <h1 className="text-xl md:text-2xl font-semibold">{mainCard.name}</h1>
        <p className="text-sm text-gray-500 leading-relaxed">{mainCard.description}</p>
      </div>

      {selectedCard && <DynamicCraftDetailModal isOpen={showModal} onOpenChange={setShowModal} craft={selectedCard} />}
    </div>
  )
}

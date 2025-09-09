"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import { useState, useEffect } from "react"

interface HeroImageProps {
  images?: Array<{
    src: string
    title: string
  }>
  image?: {
    src: string
    title: string
  }
  isDisplayed: boolean
}

const HeroImage = ({ images, image, isDisplayed }: HeroImageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const isRotatingMode = images && images.length > 1
  const imageArray = images || (image ? [image] : [])

  useEffect(() => {
    if (!isRotatingMode) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isRotatingMode, imageArray.length])

  const handleScrollById = () => {
    const element = document.getElementById("gallery")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const currentImage = imageArray[currentImageIndex] || imageArray[0]

  return (
    <div className="relative w-full h-[600px] md:h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={currentImage?.src || ""}
          alt="main"
          fill
          className="object-cover rounded-2xl transition-opacity duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-2xl md:text-6xl lg:text-7xl font-bold text-white text-center w-full md:max-w-6xl leading-tight md:px-8 md:py-6 transition-opacity duration-1000 drop-shadow-2xl">
          {currentImage?.title || "Hero Title"}
        </h1>

        {isDisplayed && (
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-white border-2 border-white rounded-3xl transition-all duration-300 hover:bg-white hover:text-black mt-8 shadow-2xl"
            onClick={handleScrollById}
          >
            Jelajahi Kerajinan
            <MoveRight className="ml-2" />
          </Button>
        )}
      </div>

      {/* Image indicators */}
      {isRotatingMode && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {imageArray.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg ${
                index === currentImageIndex ? "bg-white scale-125" : "bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default HeroImage

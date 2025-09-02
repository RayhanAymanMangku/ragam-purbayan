"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"

interface HeroImageProps {
  src: string
  title: string
  isDisplayed: boolean
}

const HeroImage = ({ src, title, isDisplayed }: HeroImageProps) => {

  const handleScrollById = () => {
    const element = document.getElementById("gallery");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="relative space-y-8">
      <Image
        src={src || "/"}
        alt="main"
        width={1280}
        height={720}
        className="object-cover rounded-2xl w-full h-full brightness-75"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1
          className={`relative text-2xl md:text-6xl lg:text-7xl font-bold text-white text-center max-w-6xl leading-tight px-8 py-6`}
        >
          {title}
        </h1>
        <Button  size="lg" variant="outline" className={`${isDisplayed ? "bg-transparent text-white border border-white rounded-3xl transition-all duration-300 hover:bg-white hover:text-black" : "hidden"}`} onClick={handleScrollById}>
          Jelajahi Kerajinan
          <MoveRight />
        </Button>

      </div>
    </div>
  )
}

export default HeroImage

import Image from "next/image"
import { HeliosFont } from "@/lib/utils"

interface HeroImageProps {
  src: string
}

const HeroImage = ({ src }: HeroImageProps) => {
  return (
    <div className="relative space-y-8">
      <Image
        src={src || "/placeholder.svg"}
        alt="main"
        width={1280}
        height={720}
        className="object-cover rounded-2xl w-full"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">


        <h1
          className={`relative text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center max-w-6xl leading-tight px-8 py-6 ${HeliosFont}`}
        >
          Jelajahi Ragam Kerajinan di Kelurahan Purbayan
        </h1>

      </div>
    </div>
  )
}

export default HeroImage

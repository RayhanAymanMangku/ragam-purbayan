import { craftTypeOptions } from "@/components/featured/dashboard/lib/constants"
import { getAllCraftGallery, getCraftByCategory } from "@/components/featured/dashboard/services/craft.service"
import GalleryCard from "@/components/featured/home/components/gallery-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export async function generateMetadata() {
  const craft = await getAllCraftGallery()
  return {
    openGraph: {
      title: "Kerajinan",
      description: craft.map((item) => item.name).join(" | ") || "Kerajinan",
      images: [...craft.map((item) => item.images)],
    },
  }
}

const CraftPage = async () => {
  return (
    <div className="">
      <div className="flex flex-row w-full">
        <Tabs defaultValue="logam" className="w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-4xl">Cari Berdasarkan Kategori</h1>
            <div className="w-full overflow-x-auto">
              <TabsList className="w-full justify-start min-w-fit bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
                {craftTypeOptions.map((type) => (
                  <TabsTrigger
                    key={type.value}
                    value={type.value}
                    className="whitespace-nowrap bg-transparent border-0 rounded-none px-4 py-3 text-gray-600 hover:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none"
                  >
                    {type.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          {craftTypeOptions.map((type) => (
            <TabsContent key={type.value} value={type.value} className="mt-6">
              <CraftGrid category={type.value} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

async function CraftGrid({ category }: { category: string }) {
  const crafts = await getCraftByCategory(category)

  if (crafts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Tidak ada kerajinan dalam kategori {category}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {crafts.map((item) => (
        <Link key={item.id} href={`/craft/${item.slug}`}>
          <GalleryCard
            imgSrc={item.images[0]}
            cardTitle={item.name}
            cardDescription={item.description}
            badgeType={item.type}
            badgeColor={craftTypeOptions.find((type) => type.value === item.type)?.color ?? "bg-secondary"}
          />
        </Link>
      ))}
    </div>
  )
}

export default CraftPage

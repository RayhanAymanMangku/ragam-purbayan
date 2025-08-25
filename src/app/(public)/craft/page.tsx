import { craftTypeOptions } from "@/components/featured/dashboard/lib/constants"
import { getCraftByCategory } from "@/components/featured/dashboard/services/craft.service"
import GalleryCard from "@/components/featured/home/components/gallery-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"



const CraftPage = async () => {

  return (
    <div className="">
      <div className="flex flex-row w-full">
        <Tabs defaultValue="logam" className="w-full">
          <TabsList className="">
            {craftTypeOptions.map((type) => (
              <TabsTrigger key={type.value} value={type.value}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

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
          />
        </Link>
      ))}
    </div>
  )
}

export default CraftPage

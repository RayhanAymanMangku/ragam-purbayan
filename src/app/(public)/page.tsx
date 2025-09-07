import { craftTypeOptions } from "@/components/featured/dashboard/lib/constants";
import { getAllCraftGallery } from "@/components/featured/dashboard/services/craft.service";
import CardLocation from "@/components/featured/home/components/card-location";
import GalleryCard from "@/components/featured/home/components/gallery-card";
import HeroImage from "@/components/featured/home/components/hero-image";
import { Button } from "@/components/ui/button";
import ScrollTopButton from "@/components/ui/scroll-top-button";
import { MoveRight } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";

const craftData = getAllCraftGallery()

const getCraftData = unstable_cache(
  async () => {
    return await craftData
  },
  ['craft'],
  {
    revalidate: 1,
  }
)

export default async function Home() {

  const fetchData = await getCraftData();

  return (
    <main className="flex flex-col gap-8">
      <div className="fixed bottom-8 right-8 z-50">
        <ScrollTopButton />
      </div>
      <section>
        <HeroImage
          isDisplayed={true}
          title="Jelajahi Ragam Kerajinan di Kelurahan Purbayan"
          src="/assets/depan.JPG"
        />
      </section>

      <section>
        <div className="flex flex-col gap-8 w-full">
          <p className="text-gray-500">Galeri</p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-[70%]">
              <h1 className='text-2xl md:text-4xl md:w-3/5'>Kerajinan Lokal di Kelurahan Purbayan</h1>
            </div>
            <div className="md:w-[30%] justify-end flex">
              <p className="text-gray-500 text-justify">Temukan beragam kerajinan lokal dengan berbagai kategori yang ada di Kelurahan Purbayan</p>

            </div>
          </div>
          <section id="gallery">
            <div className="grid md:grid-cols-4 gap-6 w-full">
              {fetchData && fetchData.length > 0 ? (
                fetchData.slice(0, 4).map((item) => {
                  const firstType = item.type && item.type.length > 0 ? item.type[0] : "";
                  
                  return (
                    <Link key={item.id} href={`/craft/${item.slug}`}>
                      <GalleryCard
                        badgeColor={craftTypeOptions.find((type) => type.value === firstType)?.color ?? "bg-secondary"}
                        imgSrc={item.images[0]}
                        cardTitle={item.name}
                        cardDescription={item.description}
                        badgeType={firstType}
                      />
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-4 text-center text-gray-500 py-10">
                  <p>Tidak ada kerajinan yang tersedia untuk ditampilkan saat ini.</p>
                </div>
              )}
            </div>
          </section>
          <Link href="/craft">
            <Button variant="outline" className="bg-white text-black border rounded-sm border-black w-fit ">
              Selengkapnya
              <MoveRight />
            </Button>
          </Link>
        </div>

      </section>
      <section>
        <CardLocation
          title="Lokasi Kelurahan"
          loc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8492.3908822285!2d110.39861153189149!3d-7.821827621670971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a573d81032dcb%3A0xec066907b154ca5b!2sKANTOR%20KELURAHAN%20PURBAYAN!5e0!3m2!1sen!2sid!4v1755323317195!5m2!1sen!2sid"
        />
      </section>
    </main>
  );
}

import Footer from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://purbayancraft.id"),
  keywords: [
    "Purbayan",
    "Kelurahan Purbayan",
    "Kerajinan Lokal",
    "Kerajinan Lokal Purbayan",
    "Purbayan Craft",
    "Craft Purbayan"
  ],
  title: {
    default: "Beranda",
    template: "%s | Purbayan Craft",
  },
  openGraph: {
    title: "Beranda | Purbayan Craft",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>
      <div className="p-4 md:p-8 min-h-screen">
        <main>{children}</main>
      </div>
      <Footer/>
    </>
  );
}
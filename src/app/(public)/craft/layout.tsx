import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Kerajinan",
  description: "Jelajahi beragam kerajinan lokal berkualitas dari Purbayan, mulai dari perhiasan perak hingga kerajinan tangan unik lainnya. Temukan keindahan dan keahlian pengrajin kami yang menciptakan karya seni yang memukau.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main>
      {children}
    </main>
  );
}
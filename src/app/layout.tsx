import "./globals.css";
import { HeliosFont } from "@/lib/utils";
import { Providers } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://purbayancraft.vercel.app"),
  keywords: [
    "Purbayan",
    "Kelurahan Purbayan",
    "Kerajinan Lokal",
    "Kerajinan Lokal Purbayan",
    "Purbayan Craft",
    "Craft Purbayan"
  ],
  title: {
    default: "Purbayan Craft",
    template: "%s | Purbayan Craft",
  },
  openGraph: {
    description: "Purbayan Craft - Beragam Kerajinan Lokal Berkualitas dari Purbayan",
    images: [
      {
        url: "/assets/logo-pemkot.png",
        width: 580,
        height: 520,
        alt: "Purbayan Craft",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${HeliosFont.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";
import { cn, heliosfont } from "@/lib/utils";
import { Providers } from "./providers";
import { Metadata } from "next";
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  metadataBase: new URL("https://purbayancraft.id"),
  keywords: [
    "Purbayan",
    "Kelurahan Purbayan",
    "Kerajinan Lokal",
    "Kerajinan Lokal Purbayan",
    "Kerajinan Purbayan",
    "Perak Purbayan Kotagede",
    "Pengrajin Perhiasan Logam",
    "Pengrajin Perak Purbayan",
    "Purbayan Craft",
    "Craft Purbayan"
  ],
  title: {
    default: "Purbayan Craft",
    template: "%s | Purbayan Craft",
  },
  icons: {
    icon: "/assets/logo-pemkot.ico",
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

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={cn("font-sans", heliosfont.variable, inter.variable)}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

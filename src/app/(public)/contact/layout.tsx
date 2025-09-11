import { Metadata } from "next";
export const metadata:Metadata = {
  title: "Kontak",
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
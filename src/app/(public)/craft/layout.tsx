import { Metadata } from "next";
export const metadata:Metadata = {
  title: "Kerajinan",
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
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Reviews</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/reviews/analysis">Analysis</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="/reviews/insights">Insights</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Ticket analysis</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/extraction">Enrichment</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <main className="flex flex-col min-h-screen items-center m-auto mt-10 w-[80%] gap-y-6 font-sans">
          { children }
      </main>
      </body>
    </html>
  );
}

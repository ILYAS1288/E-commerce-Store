import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ShopEase | Premium E-commerce Store",
  description: "Find the best shopping deals and premium products at ShopEase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-slate-200`}>
        <Navbar />
        <main className="min-h-screen pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}

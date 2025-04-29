// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Example font
import "./globals.css";
import Header from "@/components/Header"; // Import Header
import Footer from "@/components/Footer"; // Import Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Indrita Fintech Pvt. Ltd. Blog",
  description: "Insights and updates from Indrita Fintech Pvt. Ltd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

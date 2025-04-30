// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Indrita Fintech Pvt. Ltd. Blog",
  description: "Insights and updates from Indrita Fintech Pvt. Ltd.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* Header stays at the top */}
        <Header />

        {/* Main content fills available vertical space */}
        <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer sticks to bottom even with short content */}
        <Footer />
      </body>
    </html>
  );
}

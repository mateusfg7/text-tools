import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Header } from "./_components/header";
import { Navbar } from "./_components/navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Text Tools",
  description: "Text Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} px-24 py-10`}>
        <div className="flex flex-col gap-10">
          <Header />
          <div className="flex-1 flex gap-20">
            <Navbar />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}

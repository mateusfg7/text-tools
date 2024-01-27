import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '~/shared/components/sonner'

import { Header } from './_components/header'
import { Footer } from './_components/footer'
import { Navbar } from './_components/navbar'
import { ThemeProvider } from './_components/theme-provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Text Tools',
  description: 'Text Tools'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} p-5 md:px-24 md:py-10`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <div className="flex flex-col gap-10">
            <Header />
            <div className="flex-1 gap-20 md:flex">
              <div className="hidden md:block">
                <div className="sticky top-2">
                  <Navbar />
                </div>
              </div>
              <div className="flex-1">{children}</div>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '~/shared/components/sonner'

import { Header } from './_components/header'
import { Footer } from './_components/footer'
import { Navbar } from './_components/navbar'
import { ThemeProvider } from './_components/theme-provider'

import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    default: 'Text Tools',
    template: '%s • Text Tools'
  },
  description: 'Text Tools'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://analytics.mateusf.com/script.js"
          data-website-id={process.env.UMAMI_WEBSITE_ID}
        />
      </head>
      <body className={inter.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <div className="flex flex-col gap-7 m-auto min-h-dvh md:w-[1100px] p-5 md:py-6">
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

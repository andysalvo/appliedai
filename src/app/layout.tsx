import type { Metadata } from 'next'
import { inter, robotoSlab } from '@/lib/fonts'
import { siteMetadata } from '@/lib/siteMetadata'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { SmoothScroll } from '@/components/SmoothScroll'
import './globals.css'

export const metadata: Metadata = siteMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoSlab.variable}`}>
      <body className="font-sans text-text bg-white antialiased flex flex-col min-h-screen">
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

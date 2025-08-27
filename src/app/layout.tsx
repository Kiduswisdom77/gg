import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Dr Gebremedhin Gebremeskel Haile | Portfolio',
    template: '%s | Gebremedhin Haile'
  },
  description: 'Personal portfolio of Dr Gebremedhin Gebremeskel Haile, showcasing projects, publications, and professional experience.',
  keywords: ['portfolio', 'International Researcher', 'projects', 'publications'],
  authors: [{ name: 'Gebremedhin Gebremeskel Haile' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gghaile.com/',
    siteName: 'Gebremedhin Haile Portfolio',
    title: 'Gebremedhin Haile | Portfolio',
    description: 'Personal portfolio of Gebremedhin Haile, showcasing projects, publications, and professional experience.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
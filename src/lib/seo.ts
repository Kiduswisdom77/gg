import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
}

export function generateSEOConfig({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg',
  url = 'https://gghaile.com',
}: SEOProps): Metadata {
  return {
    title,
    description,
    keywords: [...keywords, 'portfolio', 'software developer', 'projects', 'publications'],
    openGraph: {
      title,
      description,
      url,
      siteName: 'Ghiorghis Haile Portfolio',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '../lib/utils'
import '../app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Vauntico | AI-Powered Creator Platform',
  description: 'Build landing pages, workshops, and payment flows through your terminal. CLI automation for the creator economy - ship production-ready platforms in minutes.',
  keywords: 'CLI, AI automation, creator economy, landing pages, workshops, payment integration, trust scoring',
  authors: [{ name: 'Vauntico' }],
  creator: 'Vauntico',
  publisher: 'Vauntico',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#6366F1',
  openGraph: {
    title: 'Vauntico | AI-Powered Creator Platform',
    description: 'CLI automation meets trust scoring. Ship creator platforms in minutes.',
    url: 'https://vauntico.com',
    siteName: 'Vauntico',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Vauntico - AI-Powered Creator Platform',
    }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vauntico | AI-Powered Creator Platform',
    description: 'CLI automation meets trust scoring. Ship creator platforms in minutes.',
    creator: '@vauntico',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
  },
}

// Extend Window interface for Google Analytics and Paystack
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    PaystackPop?: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(inter.variable)}>
      <body className={cn(
        "min-h-screen bg-background-primary font-inter text-text-primary antialiased",
        "selection:bg-accent-primary/20 selection:text-accent-primary"
      )}>
        {children}
      </body>
    </html>
  )
}

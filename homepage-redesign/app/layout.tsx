import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '../lib/utils'
import '../app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Vauntico | AI-Powered Creator Platform',
  description: 'Build landing pages, workshops, and payment flows through your terminal. CLI automation for the creator economy.',
  openGraph: {
    title: 'Vauntico | AI-Powered Creator Platform',
    description: 'CLI automation meets trust scoring. Ship creator platforms in minutes.',
  },
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

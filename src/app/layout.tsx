import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { Providers } from './providers'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'AI Learning Coach - Your Personalized AI-Powered Learning Companion',
    template: '%s | AI Learning Coach',
  },
  description: 'Free AI-powered learning platform for JEE, NEET, UPSC, Engineering, Medical, and School exams. Get personalized study plans, handwritten notes, video lectures, and practice quizzes in English, Hindi, and Telugu.',
  keywords: [
    'AI learning',
    'personalized study',
    'JEE preparation',
    'NEET preparation',
    'UPSC preparation',
    'engineering exams',
    'medical exams',
    'free education',
    'handwritten notes',
    'video lectures',
    'practice quizzes',
    'study planner',
  ],
  authors: [{ name: 'AI Learning Coach' }],
  creator: 'AI Learning Coach',
  publisher: 'AI Learning Coach',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ailearningcoach.ai',
    siteName: 'AI Learning Coach',
    title: 'AI Learning Coach - Your Personalized AI-Powered Learning Companion',
    description: 'Free AI-powered learning platform for all competitive exams. Personalized study plans, notes, videos, and quizzes.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Learning Coach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Learning Coach',
    description: 'Free AI-powered learning platform for all competitive exams.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <TooltipProvider>
          <Providers>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              {children}
            </Suspense>
          </Providers>
        </TooltipProvider>
      </body>
    </html>
  )
}
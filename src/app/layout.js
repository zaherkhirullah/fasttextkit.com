import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata = {
  title: {
    default: 'FastTextKit — Free Online Tools',
    template: '%s | FastTextKit',
  },
  description: 'Free online tools for text editing and image processing. Word counter, case converter, remove spaces, text sorter, image compressor. No signup required.',
  keywords: 'free online tools, text tools, word counter, case converter, image compressor, remove extra spaces, sort text alphabetically',
  authors: [{ name: 'FastTextKit' }],
  creator: 'FastTextKit',
  publisher: 'FastTextKit',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fasttextkit.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fasttextkit.com',
    siteName: 'FastTextKit',
    title: 'FastTextKit — Free Online Tools',
    description: 'Fast, simple, and powerful text and image tools. No signup required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FastTextKit — Free Online Tools',
    description: 'Fast, simple, and powerful text and image tools. No signup required.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense — uncomment and replace with real publisher ID after approval */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body>
        {children}

        {/* Google Analytics 4 — only loads when NEXT_PUBLIC_GA_ID is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {/* Vercel Speed Insights */}
        <SpeedInsights />

        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
    </html>
  )
}

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Load the Inter font from Google Fonts
// This provides a clean, modern font for the entire site
const inter = Inter({ subsets: ['latin'] })

// Metadata for SEO and browser display
// These will appear in search results and browser tabs
export const metadata: Metadata = {
  title: 'Just a Minute - Online Game Store',
  description: 'Purchase and download the Just a Minute game - a fun, challenging web-based game',
  keywords: ['game', 'just a minute', 'web game', 'online game'],
}

/**
 * Root Layout Component
 * 
 * This is the main layout that wraps all pages in your Next.js app.
 * Any content you add here (like a header or footer) will appear on all pages.
 * 
 * @param children - The page content that will be rendered inside this layout
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

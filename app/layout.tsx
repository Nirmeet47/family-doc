import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // optional but recommended
});

export const metadata: Metadata = {
  title: 'Family Document Manager',
  description: 'Manage your family documents with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
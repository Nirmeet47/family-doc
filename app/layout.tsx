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
          <footer className="w-full py-6 px-6 bg-white/60 border-t">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
              <p className="text-sm text-gray-500">© 2025 All Rights Reserved</p>
              <p className="text-sm text-gray-500">Made by <span className="font-semibold text-blue-600">nirmeet47</span></p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
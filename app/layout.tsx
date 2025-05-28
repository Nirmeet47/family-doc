import './globals.css'
import type { Metadata } from 'next'

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
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen font-sans">
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
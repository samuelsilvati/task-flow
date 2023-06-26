import { ReactNode } from 'react'
import './globals.css'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'Todo',
  description: 'create a to-do list',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${outfit.variable} bg-gray-50 font-sans text-gray-700 dark:bg-gray-700 dark:text-gray-100`}
      >
        <main className="flex h-[106vh] flex-col overflow-auto">
          {children}
        </main>
      </body>
    </html>
  )
}

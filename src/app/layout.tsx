import { ReactNode } from 'react'
import './globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'Todo',
  description: 'create a to-do list',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} bg-gray-700 font-sans text-gray-100`}
      >
        <main className="flex h-screen flex-col">{children}</main>
      </body>
    </html>
  )
}

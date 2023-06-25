import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdvancedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full">
      <aside className="hidden w-72 2xl:flex">
        <div className="fixed flex h-screen w-72 flex-col gap-3 border-r border-gray-50 p-6 dark:border-gray-500">
          <Link
            href="/dashboard/advanced"
            className="font-bold dark:text-white"
          >
            Perfil
          </Link>
          <Link
            href="/dashboard/advanced"
            className="font-bold dark:text-white"
          >
            Categories
          </Link>
          <Link
            href="/dashboard/advanced"
            className="font-bold dark:text-white"
          >
            Tasks
          </Link>
          <Link href="/dashboard" className="font-bold dark:text-white">
            Simple Mode
          </Link>
        </div>
      </aside>
      <div className="mx-auto p-4">{children}</div>
    </div>
  )
}

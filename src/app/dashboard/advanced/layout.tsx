import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdvancedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full">
      <aside className="flex h-screen w-72 border-r border-gray-500">
        <div className="flex flex-col gap-3 p-6">
          <Link href="/dashboard/advanced" className="font-bold text-white">
            Perfil
          </Link>
          <Link href="/dashboard/advanced" className="font-bold text-white">
            Categories
          </Link>
          <Link href="/dashboard/advanced" className="font-bold text-white">
            Tasks
          </Link>
          <Link href="/dashboard" className="font-bold text-white">
            Simple Mode
          </Link>
        </div>
      </aside>
      <div className="mx-auto p-4">{children}</div>
    </div>
  )
}

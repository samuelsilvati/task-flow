import { AlignJustify, ClipboardList, User2 } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdvancedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <aside className="hidden w-72 2xl:flex">
        <div className="fixed -mt-4 flex h-screen w-72 flex-col gap-3 border-r border-gray-100 p-6 dark:border-gray-500">
          <Link
            href="/dashboard/account"
            className="flex items-center gap-2 font-bold dark:text-white"
          >
            <User2 />
            Perfil
          </Link>
          <Link
            href="/dashboard/advanced"
            className="flex items-center gap-2 font-bold dark:text-white"
          >
            <ClipboardList />
            Tarefas
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-bold dark:text-white"
          >
            <AlignJustify />
            Modo Simples
          </Link>
        </div>
      </aside>
      <div className="mx-auto h-max">{children}</div>
    </div>
  )
}

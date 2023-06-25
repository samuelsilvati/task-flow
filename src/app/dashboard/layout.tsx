import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import Image from 'next/image'
import Logo from '../../assets/logo.svg'
import LogoDark from '../../assets/logo-dark.svg'

import { Profile } from '../components/Profile'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const token = cookies().has('token')
  if (!token) redirect('/signin')

  return (
    <>
      <div className="overflow-hidden">
        <header className="flex w-full items-center justify-center border-b border-gray-50 dark:border-gray-500 dark:bg-gray-700">
          <div className="flex max-w-7xl flex-grow items-center justify-between p-4">
            <Image src={LogoDark} alt="logo" className="dark:hidden" />
            <Image src={Logo} alt="logo" />

            <div className="flex gap-3">
              <div className="hidden gap-3 pr-2 md:flex">
                <Link href="/dashboard/advanced" className="dark:text-white">
                  Modo Avançado
                </Link>
                <Link href="/" className="dark:text-white">
                  Perfil
                </Link>
              </div>
              <Profile />
              <a
                href="/api/auth/logout"
                className="underline dark:text-gray-50"
              >
                Sair
              </a>
            </div>
          </div>
        </header>
        <div className="mb-12 flex h-[93%] w-full flex-col items-center overflow-auto">
          <div className="flex w-full flex-grow flex-col items-center justify-between">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

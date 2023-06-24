import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import Image from 'next/image'
import Logo from '../../assets/logo.svg'
import { Profile } from '../components/Profile'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const token = cookies().has('token')
  if (!token) redirect('/signin')

  return (
    <>
      <div>
        <header className="flex w-full items-center justify-center border-b border-gray-500 bg-gray-700">
          <div className="flex max-w-7xl flex-grow items-center justify-between p-4">
            <Image src={Logo} alt="logo" />
            <div className="flex gap-3">
              <div className="hidden gap-3 pr-2 md:flex">
                <Link href="/dashboard/advanced" className="text-white">
                  Modo Avançado
                </Link>
                <Link href="/" className="text-white">
                  Perfil
                </Link>
              </div>
              <Profile />
              <a href="/api/auth/logout" className="text-gray-50 underline">
                Sair
              </a>
            </div>
          </div>
        </header>
        <div className="flex h-full w-full flex-col items-center">
          <div className="flex w-full flex-grow flex-col items-center justify-between overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

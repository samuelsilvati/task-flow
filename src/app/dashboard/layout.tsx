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
        <header className="flex items-center justify-center bg-slate-400">
          <div className="flex max-w-7xl flex-grow items-center justify-between p-4">
            <Image src={Logo} alt="logo" />
            <div className="flex gap-3">
              <div className="flex gap-3 pr-4">
                <Link href="/" className="text-black">
                  Perfil
                </Link>
                <Link href="/" className="text-black">
                  Categorias
                </Link>
                <Link href="/" className="text-black">
                  Categorias
                </Link>
                <Link href="/" className="text-black">
                  Categorias
                </Link>
              </div>
              <Profile />
              <a href="/api/auth/logout" className="text-gray-500 underline">
                Sair
              </a>
            </div>
          </div>
        </header>
        <main>
          <div className="flex h-full w-full flex-col items-center ">
            <div className="relative mt-4 flex w-full max-w-7xl flex-grow flex-col items-center justify-between bg-gray-200 p-4 text-lg">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

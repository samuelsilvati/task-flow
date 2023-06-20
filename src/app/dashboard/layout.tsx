import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import Image from 'next/image'
import Logo from '../../assets/logo.svg'
import { Profile } from '../components/Profile'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const token = cookies().has('token')
  if (!token) redirect('/auth')

  return (
    <>
      <div>
        <header className="flex items-center justify-center bg-slate-400">
          <div className="flex max-w-7xl flex-grow items-center justify-between p-4">
            <Image src={Logo} alt="logo" />
            <div className="flex gap-3">
              <Profile />
              <Link href="/logout" className="text-gray-500 underline">
                Sair
              </Link>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </>
  )
}

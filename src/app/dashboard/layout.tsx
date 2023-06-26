import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import Image from 'next/image'
import Logo from '../../assets/logo.svg'

import { Profile } from '../components/Profile'
import Menu from '../components/Menu'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const token = cookies().has('token')
  if (!token) redirect('/signin')

  return (
    <>
      <header className="flex w-full items-center justify-center border-b border-gray-100 dark:border-gray-500 dark:bg-gray-700">
        <div className="flex max-w-7xl flex-grow items-center justify-between p-4">
          <Image src={Logo} alt="logo" />

          <div className="flex">
            <Profile />
            <Menu />
          </div>
        </div>
      </header>
      <div className="mb-12 flex w-full flex-col items-center overflow-auto">
        <div className="flex h-[94vh] w-full flex-grow flex-col items-center justify-between p-4">
          {children}
        </div>
      </div>
    </>
  )
}

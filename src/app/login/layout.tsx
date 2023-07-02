import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Logo from '../../assets/logo.svg'
import { ReactNode } from 'react'

export default function Auth({ children }: { children: ReactNode }) {
  const token = cookies().has('token')
  if (token) redirect('/dashboard')

  return (
    <div className="flex bg-white bg-[url(../assets/bg-mobile.svg)] bg-contain bg-top bg-no-repeat">
      <div className="flex h-screen w-full flex-col items-center justify-center lg:bg-white">
        <div className="my-14 flex h-screen w-96 flex-col justify-between gap-6 ">
          <div className="flex h-screen flex-col items-center justify-evenly">
            <Image
              src={Logo}
              alt="logo"
              className="mx-auto px-5 lg:mx-0"
              width={224}
            />
            {children}
            <span></span>
          </div>
        </div>
      </div>
      <div className="hidden h-screen w-[40%] overflow-hidden bg-[url(../assets/side.svg)] bg-cover bg-top bg-no-repeat lg:block lg:bg-white"></div>
    </div>
  )
}

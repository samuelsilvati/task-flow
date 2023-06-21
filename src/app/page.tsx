import Link from 'next/link'
import Image from 'next/image'
import Logo from '../assets/logo.svg'

export default function Home() {
  return (
    <div>
      <header className="flex items-center justify-center bg-slate-400">
        <div className="flex max-w-7xl flex-grow items-center justify-between p-4">
          <Image src={Logo} alt="logo" />
          <div className="flex gap-3">
            <Link href="/signup" className="text-gray-500 underline">
              Cria conta
            </Link>
            <Link href="/signin" className="text-gray-500 underline">
              Login
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

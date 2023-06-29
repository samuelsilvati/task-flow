// import Link from 'next/link'
import Image from 'next/image'
import Logo from '../assets/logo.svg'
// import BgDesktop from '../assets/bg-desktop.svg'
import ManImage from '../assets/man.svg'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-screen bg-white ">
      <div className="grid bg-[url(../assets/bg-mobile.svg)] bg-contain bg-top bg-no-repeat lg:grid-cols-2">
        <div className="col-span-1 flex h-screen w-full flex-col items-center justify-center lg:bg-white">
          <div className="my-14 flex h-screen w-96 flex-col justify-between gap-6 ">
            <Image
              src={Logo}
              alt="logo"
              className="mx-auto px-5 lg:mx-0"
              width={224}
            />
            <div className="flex justify-center lg:hidden">
              <Image src={ManImage} alt="logo" width={224} />
            </div>
            <div className="mb-10 px-5 text-center lg:text-left">
              <h1 className="pb-3 text-3xl font-bold text-black lg:text-6xl">
                Explore a Plataforma
              </h1>
              <p className="pb-6 text-lg text-black lg:text-xl">
                Comece a organizar suas tarefas hoje mesmo e experimente uma
                nova forma de produtividade.
              </p>
              <Link href="/signup">
                <div className="flex h-11 w-full items-center justify-center rounded-lg bg-yellow-500 text-lg font-bold text-black transition-colors hover:bg-yellow-400">
                  <p>Vamos Começar</p>
                </div>
              </Link>
              <div className="mt-3 text-black">
                Já tem Conta?{' '}
                <Link href="/signin" className="font-bold">
                  Faça Login
                </Link>
              </div>
            </div>
            <span className="hidden lg:block" />
          </div>
        </div>
        <div className="col-span-1 hidden h-screen w-full overflow-hidden bg-[url(../assets/bg-desktop.svg)] bg-contain bg-right-top bg-no-repeat lg:block lg:bg-white"></div>
      </div>
    </div>
  )
}

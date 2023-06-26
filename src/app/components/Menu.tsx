'use client'
import { MoreVertical, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(!menuOpen)
  }
  return (
    <>
      <button
        className="relative flex h-8 w-8 cursor-none items-center justify-center pl-3 lg:cursor-pointer"
        onClick={toggleMenu}
        aria-label="menu"
      >
        {!menuOpen ? (
          <MoreVertical size={40} className="-m-5" />
        ) : (
          <X size={40} className="-m-5" />
        )}
      </button>

      <div
        className={`absolute left-0 top-16 z-40 ml-[-8px] h-screen w-screen overflow-auto bg-black/30 backdrop-blur-sm transition-all duration-200 ease-in-out ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={toggleMenu}
      >
        <div className="w-full border-y border-gray-100 bg-gray-50 dark:border-gray-500 dark:bg-gray-700">
          <div
            className={`relative mx-auto flex h-max w-full max-w-7xl flex-grow flex-col  items-end justify-end gap-3  py-6 pr-4 font-bold transition-all duration-300 ease-in-out ${
              menuOpen ? 'top-0' : '-top-[100%]'
            }`}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <Link href="/" onClick={toggleMenu}>
              Perfil
            </Link>
            <Link href="/dashboard" onClick={toggleMenu}>
              Modo Simples
            </Link>
            <Link href="/dashboard/advanced" onClick={toggleMenu}>
              Modo Avaçado
            </Link>

            <a href="/api/auth/logout" className="underline dark:text-gray-50">
              Sair
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

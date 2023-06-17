'use client'
import { api } from '@/lib/api'
import { FormEvent } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Auth() {
  const router = useRouter()
  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    try {
      const authResponse = await api.post('/auth', {
        email: formData.get('email'),
        password: formData.get('password'),
      })
      const token = authResponse.data.token
      Cookies.set('token', token, { expires: 7, path: '/' })
      router.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form onSubmit={handleAuth} className="flex flex-col gap-3 text-gray-800">
        <input type="email" placeholder="E-mail" name="email" />
        <input type="password" placeholder="Senha" name="password" />
        <button type="submit" className="border py-2 text-gray-200">
          Login
        </button>
        <Link href="/signup" className="text-gray-300 underline">
          Criar conta
        </Link>
      </form>
    </div>
  )
}

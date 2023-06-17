'use client'
import { api } from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export default function Signup() {
  const router = useRouter()
  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      if (formData.get('password') === formData.get('confirmPassword')) {
        await api.post('/signup', {
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
        })
        router.push('/auth')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="pb-2 text-xl">Sign Up</h1>
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-3 text-gray-800"
      >
        <input
          type="text"
          placeholder="Nome"
          name="name"
          className="placeholder-gray-300"
        />
        <input type="email" placeholder="E-mail" name="email" />
        <input type="password" placeholder="Senha" name="password" />
        <input
          type="password"
          placeholder="Repetir Senha"
          name="confirmPassword"
        />
        <button type="submit" className="border py-2 text-gray-100">
          Sign Up
        </button>
        <Link href="/auth" className="text-gray-300 underline">
          Login
        </Link>
      </form>
    </div>
  )
}

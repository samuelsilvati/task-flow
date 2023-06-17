'use client'
import { api } from '@/lib/api'
import { FormEvent } from 'react'

import Cookies from 'js-cookie'

export default function auth() {
  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log(formData.get('email'))
    try {
      const authResponse = await api.post('/auth', {
        email: formData.get('email'),
        password: formData.get('password'),
      })
      const token = authResponse.data.token

      Cookies.set('token', token, { expires: 7, path: '/' })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form onSubmit={handleAuth} className="flex flex-col gap-3">
        <input type="email" placeholder="E-mail" name="email" />
        <input type="password" placeholder="Senha" name="password" />
        <button type="submit" className="border py-2">
          Login
        </button>
      </form>
    </div>
  )
}

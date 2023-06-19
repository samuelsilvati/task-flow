'use client'
import { api } from '@/lib/api'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Loading from '../components/Loaging'
import toast from '../components/Toast'

const createUserformSchema = z.object({
  email: z.string().nonempty('E-mail obrigatório').email('E-mail inválido'),
  password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres'),
})

type CreateUserFormData = z.infer<typeof createUserformSchema>

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserformSchema),
  })
  function handleAuth(data: any) {
    setIsLoading(true)
    api
      .post('/auth', data)
      .then((response) => {
        const token = response.data.token
        Cookies.set('token', token, { expires: 7, path: '/' })
        router.push('/dashboard')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(`${error.response.data.message}`)
      })
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(handleAuth)}
        className="flex w-full max-w-xs flex-col gap-5 text-gray-800 md:max-w-sm"
      >
        <div>
          <input
            type="email"
            placeholder="E-mail"
            {...register('email')}
            className="relative block w-full placeholder-gray-300"
          />
          {errors.email && (
            <span className="absolute text-sm text-red-300">
              {errors.email.message}{' '}
            </span>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            {...register('password')}
            className="relative block w-full placeholder-gray-300"
          />
          {errors.password && (
            <span className="absolute text-sm text-red-300">
              {errors.password.message}{' '}
            </span>
          )}
        </div>

        {!isLoading ? (
          <button type="submit" className="h-10 border text-gray-100">
            Sign Up
          </button>
        ) : (
          <div className="h-10 border text-center text-gray-100">
            <Loading />
          </div>
        )}
        <div>
          <Link href="/forgot-password" className="text-gray-300 underline">
            Esqueci minha senha
          </Link>

          <Link href="/signup" className="float-right text-gray-300 underline">
            Criar conta
          </Link>
        </div>
      </form>
    </div>
  )
}

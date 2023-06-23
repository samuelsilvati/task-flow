'use client'
import { api } from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import Loading from '../components/Loading'
import toast from '../components/Toast'

const createUserformSchema = z.object({
  name: z.string().nonempty('Nome obrigatório'),
  email: z.string().nonempty('E-mail obrigatório').email('E-mail inválido'),
  password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres'),
})

type CreateUserFormData = z.infer<typeof createUserformSchema>

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserformSchema),
  })
  function createUser(data: any) {
    setIsLoading(true)
    api
      .post('/signup', data)
      .then(() => {
        setIsLoading(false)
        router.push('/signin')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(`${error.response.data.message}`)
      })
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="pb-2 text-xl">Sign Up</h1>
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex w-full max-w-xs flex-col gap-5 text-gray-800 md:max-w-sm"
      >
        <div>
          <input
            type="text"
            placeholder="Nome"
            className="relative block w-full placeholder-gray-300"
            {...register('name')}
          />
          {errors.name && (
            <span className="absolute text-sm text-red-300">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="E-mail"
            {...register('email')}
            className="relative block w-full"
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
            className="relative block w-full"
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

        <Link href="/signin" className="text-gray-300 underline">
          Login
        </Link>
      </form>
    </div>
  )
}

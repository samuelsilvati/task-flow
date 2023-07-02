'use client'
import { api } from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import toast from '../components/Toast'
import Button from './Button'

const createUserformSchema = z.object({
  name: z.string().nonempty('Nome obrigatório'),
  email: z.string().nonempty('E-mail obrigatório').email('E-mail inválido'),
  password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres'),
})

type CreateUserFormData = z.infer<typeof createUserformSchema>

export default function SignupForm() {
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
        router.push('/login')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(`${error.response.data.message}`)
      })
  }
  return (
    <form
      onSubmit={handleSubmit(createUser)}
      className="flex w-full max-w-xs flex-col gap-5 text-gray-800 md:max-w-sm"
    >
      <div>
        <input
          type="text"
          placeholder="Nome"
          className="relative block w-full rounded-lg border-gray-300 placeholder-gray-300"
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
          className="relative block w-full rounded-lg border-gray-300 placeholder-gray-300"
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
          className="relative block w-full rounded-lg border-gray-300 placeholder-gray-300"
        />
        {errors.password && (
          <span className="absolute text-sm text-red-300">
            {errors.password.message}{' '}
          </span>
        )}
      </div>

      <Button loading={isLoading}>Criar</Button>

      <Link href="/login" className="text-center text-black">
        Login
      </Link>
    </form>
  )
}

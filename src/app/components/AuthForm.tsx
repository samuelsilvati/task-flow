'use client'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Loading from './Loading'
import toast from './Toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Button from './Button'

const createUserformSchema = z.object({
  email: z.string().nonempty('E-mail obrigatório').email('E-mail inválido'),
  password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres'),
})

type CreateUserFormData = z.infer<typeof createUserformSchema>

export default function AuthForm() {
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
    axios
      .post('/api/auth', data)
      .then(() => {
        setIsLoading(false)
        router.push(`/dashboard`)
      })
      .catch((error) => {
        if (error) {
          toast.error('Usuário ou senha incorretos')
          setIsLoading(false)
        }
      })
  }
  return (
    <form
      onSubmit={handleSubmit(handleAuth)}
      className="flex w-full max-w-xs flex-col gap-5 text-gray-800 md:max-w-sm"
    >
      <div>
        <input
          type="email"
          placeholder="E-mail"
          {...register('email')}
          className="relative block w-full border-gray-300 rounded-lg placeholder-gray-300"
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
          className="relative block w-full border-gray-300 rounded-lg placeholder-gray-300"
        />
        {errors.password && (
          <span className="absolute text-sm text-red-300">
            {errors.password.message}{' '}
          </span>
        )}
      </div>

        <Button loading={isLoading}>
          Login
        </Button>
      
      <div>
        <Link href="/forgot-password" className=" text-black">
          Esqueci minha senha
        </Link>

        <Link href="/login/signup" className="float-right text-black">
          Criar conta
        </Link>
      </div>
    </form>
  )
}

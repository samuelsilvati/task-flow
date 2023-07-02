'use client'
import Link from 'next/link'
import { api } from '@/lib/api'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import toast from '../components/Toast'
import { useRouter } from 'next/navigation'
import Button from './Button'

const createUserformSchema = z.object({
  email: z.string().nonempty('E-mail obrigatório').email('E-mail inválido'),
})

type CreateUserFormData = z.infer<typeof createUserformSchema>

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserformSchema),
  })
  function sendEmail(data: any) {
    setIsLoading(true)
    api
      .post('/forgot-password', data)
      .then(() => {
        setIsLoading(false)
        toast.success(
          'Verifique seu e-mail para obter instruções de redefinição',
        )
        router.push('/login')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(`${error.response.data.message}`)
      })
  }

  return (
    <div className="w-96 md:max-w-sm">
      <p className="pb-5 text-black">
        Digite o e-mail associado à sua conta e enviaremos instruções de
        redefinição de senha.
      </p>
      <form
        onSubmit={handleSubmit(sendEmail)}
        className="flex w-full flex-col gap-5 text-gray-800"
      >
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

        <Button loading={isLoading}>Enviar</Button>

        <Link href="/login" className="text-center text-black">
          Login
        </Link>
      </form>
    </div>
  )
}

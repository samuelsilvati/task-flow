'use client'
import { api } from '@/lib/api'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import toast from '../components/Toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '../components/Loading'
import decode from 'jwt-decode'

const createUserformSchema = z
  .object({
    id: z.string().nonempty(),
    token: z.string().nonempty(),
    password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres'),
    repeatPassword: z
      .string()
      .min(4, 'A senha deve ter pelo menos 4 caracteres'),
  })
  .refine((obj) => obj.password === obj.repeatPassword, {
    message: 'As senhas devem ser iguais',
    path: ['repeatPassword'],
  })

type CreateUserFormData = z.infer<typeof createUserformSchema>
interface Expires {
  exp: number
}

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = useSearchParams()
  const id = pathname.get('id')
  const token = pathname.get('token')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserformSchema),
  })
  useEffect(() => {
    if (id !== null && token !== null) {
      setValue('id', id)
      setValue('token', token)
    }
  }, [id, setValue, token])

  function resetPassword(data: any) {
    setIsLoading(true)
    api
      .post('/reset-password', data)
      .then(() => {
        setIsLoading(false)
        router.push('/signin')
        toast.success('Sua senha foi alterada, faça login para continuar')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(`${error.response.data.message}`)
      })
  }
  if (token) {
    const expires: Expires = decode(token)
    const now = Math.floor(Date.now() / 1000)
    if (now > expires.exp) return notFound()
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="w-96 md:max-w-sm">
        <p className="pb-5">Digite a nova senha abaixo.</p>
        <form
          onSubmit={handleSubmit(resetPassword)}
          className="flex w-full flex-col gap-5 text-gray-800"
        >
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
          <div>
            <input
              type="password"
              placeholder="Repetir senha"
              {...register('repeatPassword')}
              className="relative block w-full"
            />
            {errors.repeatPassword && (
              <span className="absolute text-sm text-red-300">
                {errors.repeatPassword.message}{' '}
              </span>
            )}
          </div>
          {!isLoading ? (
            <button type="submit" className="h-10 border text-gray-100">
              Reset Password
            </button>
          ) : (
            <div className="h-10 border text-center text-gray-100">
              <Loading />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

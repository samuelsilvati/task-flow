'use client'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import toast from '../../components/Toast'
import Cookie from 'js-cookie'
import decode from 'jwt-decode'

const createUserformSchema = z
  .object({
    name: z.string().nonempty('Nome obrigatório'),
    password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres'),
    repeatPassword: z
      .string()
      .min(4, 'A senha deve ter pelo menos 4 caracteres'),
  })
  .refine((obj) => obj.password === obj.repeatPassword, {
    message: 'As senhas devem ser iguais',
    path: ['repeatPassword'],
  })

interface UserDataProps {
  name: string
  email: string
}
interface User {
  sub: string
  name: string
}

type CreateUserFormData = z.infer<typeof createUserformSchema>

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<UserDataProps | null>(null)
  const router = useRouter()
  const token = Cookie.get('token')
  const { name, sub }: User = decode(token ?? '')
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
      .put('/edit-user', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsLoading(false)
        router.push('/api/auth/logout')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(`${error.response.data.message}`)
      })
  }

  useEffect(() => {
    api
      .get(`/user/${sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data)
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`)
      })
  }, [token])
  if (!userData) return <Loading />

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="pb-2 text-xl">Profile</h1>
      <p>{userData?.email}</p>
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex w-full max-w-xs flex-col gap-5 pt-3 text-gray-800 md:max-w-sm"
      >
        <div>
          <input
            type="text"
            placeholder="Nome"
            className="relative block w-full placeholder-gray-300"
            {...register('name')}
            defaultValue={name}
          />
          {errors.name && (
            <span className="absolute text-sm text-red-300">
              {errors.name.message}
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
            Save
          </button>
        ) : (
          <div className="h-10 border text-center text-gray-100">
            <Loading />
          </div>
        )}
        <div className="flex w-full justify-between">
          <button
            type="button"
            className="text-gray-300 underline"
            onClick={() => {
              router.back()
            }}
          >
            Voltar
          </button>
          <button
            type="button"
            className="text-gray-300 underline"
            onClick={() => {
              router.back()
            }}
          >
            Apagar Conta
          </button>
        </div>
      </form>
    </div>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
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
import Button from '@/app/components/Button'
import DeleteModal from '@/app/components/DeleteModal'
import { X } from 'lucide-react'

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
  const [isOpen, setIsOpen] = useState(false)
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

  function deleteHandle() {
    api
      .delete('/delete', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        router.push('/api/auth/logout')
        toast.success('Sua conta foi apagada')
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`)
      })
  }
  if (!userData) return <Loading />

  return (
    <div className="flex h-max w-80 flex-col items-center rounded bg-white p-4 pt-4 shadow dark:bg-gray-600/50 2xl:w-96">
      <DeleteModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        buttonAction={() => {
          deleteHandle()
        }}
      >
        <div className="mx-auto mb-2 w-max rounded-full border-2 border-red-500 p-2 text-red-500">
          <X />
        </div>
        Tem certeza que deseja excluir sua conta?
      </DeleteModal>
      <h1 className="pb-2 text-xl">Perfil</h1>
      <p>Meu e-mail: {userData?.email}</p>
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex w-full max-w-xs flex-col gap-5 pt-3  md:max-w-sm"
      >
        <div>
          <input
            type="text"
            placeholder="Nome"
            className="relative block w-full rounded-md border-none bg-gray-50 placeholder-gray-300 dark:bg-gray-500"
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
            className="relative block w-full rounded-md border-none bg-gray-50 placeholder-gray-300 dark:bg-gray-500"
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
            className="relative block w-full rounded-md border-none bg-gray-50 placeholder-gray-300 dark:bg-gray-500"
          />
          {errors.repeatPassword && (
            <span className="absolute text-sm text-red-300">
              {errors.repeatPassword.message}{' '}
            </span>
          )}
        </div>
        <Button type="submit" loading={isLoading}>
          Salvar
        </Button>
        <div className="flex w-full justify-between">
          <button
            type="button"
            className="hover:text-gray-300"
            onClick={() => {
              router.back()
            }}
          >
            Voltar
          </button>
          <button
            type="button"
            className="hover:text-red-400"
            onClick={() => {
              setIsOpen(true)
            }}
          >
            Apagar Conta
          </button>
        </div>
      </form>
    </div>
  )
}

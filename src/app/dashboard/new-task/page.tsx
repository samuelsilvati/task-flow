'use client'
import { api } from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import toast from '@/app/components/Toast'
import Loading from '@/app/components/Loading'
import Cookie from 'js-cookie'

const createUserformSchema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  description: z.string().nonempty(),
  categoryId: z
    .string()
    .min(1, 'Campo obrigatório')
    .transform((value) => parseInt(value, 10)),
})

type CreateUserFormData = z.infer<typeof createUserformSchema>

export default function NewTask() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserformSchema),
  })
  const token = Cookie.get('token')
  function createUser(data: any) {
    console.log(data)
    setIsLoading(true)
    api
      .post('/new-task', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsLoading(false)
        router.push('/dashboard')
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
            type="text"
            placeholder="description"
            className="relative block w-full placeholder-gray-300"
            {...register('description')}
          />
          {errors.name && (
            <span className="absolute text-sm text-red-300">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <input
            type="number"
            placeholder="categoryId"
            className="relative block w-full placeholder-gray-300"
            {...register('categoryId')}
          />
          {errors.categoryId && (
            <span className="absolute text-sm text-red-300">
              {errors.categoryId.message}
            </span>
          )}
        </div>

        {!isLoading ? (
          <button
            type="submit"
            className="right-4 rounded bg-green-500 px-6 py-2 font-bold text-white transition-colors hover:bg-green-600"
          >
            Create
          </button>
        ) : (
          <div className="h-10 border text-center text-gray-100">
            <Loading />
          </div>
        )}

        <Link href="/dashboard" className="text-black underline">
          Voltar
        </Link>
      </form>
    </div>
  )
}

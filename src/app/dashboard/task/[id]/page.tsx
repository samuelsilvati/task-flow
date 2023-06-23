'use client'
import { api } from '@/lib/api'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import toast from '@/app/components/Toast'
import Loading from '@/app/components/Loading'
import Cookie from 'js-cookie'
import Button from '@/app/components/Button'

interface MemoryDataProps {
  categoryId: string
  name: string
  description: string
}

const createUserformSchema = z.object({
  name: z.string().nonempty('Campo obrigatório').default('asdfdsa'),
  description: z.string().nonempty(),
  categoryId: z
    .string()
    .min(1, 'Campo obrigatório')
    .transform((value) => parseInt(value, 10)),
})

type CreateUserFormData = z.infer<typeof createUserformSchema>

export default function EditTask() {
  const [tasksData, setTasksData] = useState<MemoryDataProps | null>(null)
  const { id } = useParams()
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
    setIsLoading(true)
    api
      .put(`/task/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        router.push('/dashboard')
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(`${error.response.data.message}`)
      })
  }
  useEffect(() => {
    api
      .get(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasksData(response.data)
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`)
      })
  }, [id, token])

  if (!tasksData) return <Loading />

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
            defaultValue={tasksData?.name}
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
            defaultValue={tasksData?.description}
          />
          {errors.name && (
            <span className="absolute text-sm text-red-300">
              {errors.name.message}
            </span>
          )}
        </div>
        <>
          <input
            type="number"
            placeholder="categoryId"
            className="invisible relative hidden w-full placeholder-gray-300"
            {...register('categoryId')}
            defaultValue={tasksData?.categoryId}
          />
          {errors.categoryId && (
            <span className="absolute text-sm text-red-300">
              {errors.categoryId.message}
            </span>
          )}
        </>
        <Button type="submit" loading={isLoading}>
          Save
        </Button>

        <Link href="/dashboard" className="text-black underline">
          Voltar
        </Link>
      </form>
    </div>
  )
}

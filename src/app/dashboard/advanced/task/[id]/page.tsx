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
import { ChevronLeft, Trash } from 'lucide-react'
import dayjs from 'dayjs'

interface MemoryDataProps {
  categoryId: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

const editTaskformSchema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  description: z.string().nonempty('Campo obrigatório'),
  isChecked: z.boolean().default(false),
  createdAt: z
    .string()
    .nonempty('Campo obrigatório')
    .transform((value) => value.concat('T00:00:00.000Z')),
  updatedAt: z
    .string()
    .nonempty('Campo obrigatório')
    .transform((value) => value.concat('T00:00:00.000Z')),

  categoryId: z
    .string()
    .min(1, 'Campo obrigatório')
    .default('1')
    .transform((value) => parseInt(value, 10)),
})

type EditTaskFormData = z.infer<typeof editTaskformSchema>

export default function EditTask() {
  const [tasksData, setTasksData] = useState<MemoryDataProps | null>(null)
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTaskFormData>({
    resolver: zodResolver(editTaskformSchema),
  })
  const token = Cookie.get('token')
  function editTask(data: any) {
    setIsLoading(true)
    api
      .put(`/task/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        router.push('/dashboard/advanced')
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

  function deleteTask() {
    setIsLoading(true)
    api
      .delete(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        router.push('/dashboard/advanced')
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        toast.error(`${error.response.data.message}`)
      })
  }

  if (!tasksData) return <Loading />

  return (
    <div className="mt-16 h-max w-80 rounded bg-white px-2 py-4 shadow dark:bg-gray-700/50 2xl:w-96">
      <div className="flex justify-between">
        <Link
          href="/dashboard/advanced"
          className="my-2 flex w-20 rounded-lg text-black hover:text-gray-200 dark:text-gray-100"
        >
          <ChevronLeft /> Voltar
        </Link>
        <button
          type="button"
          onClick={deleteTask}
          className="my-2 flex w-20 items-center gap-1 rounded-lg text-black hover:text-red-400 dark:text-gray-100"
        >
          <Trash size={16} /> Delete
        </button>
      </div>
      <form
        onSubmit={handleSubmit(editTask)}
        className="flex h-full flex-col justify-between gap-1 text-gray-800 dark:text-gray-100 md:max-w-sm"
      >
        <div>
          <div>
            <input
              type="text"
              placeholder="Nome"
              className="relative block w-full rounded-md border-none bg-gray-50 placeholder-gray-300 dark:bg-gray-500"
              {...register('name')}
              defaultValue={tasksData?.name}
            />
            {errors.name && (
              <span className="absolute text-sm text-red-300">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>
        <div className="mt-5">
          <div>
            <input
              type="text"
              placeholder="Sua tarefa..."
              className="relative block w-full rounded-md border-none bg-gray-50 placeholder-gray-300 dark:bg-gray-500"
              {...register('description')}
              defaultValue={tasksData?.description}
            />
            {errors.description && (
              <span className="absolute text-sm text-red-300">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between pb-7 2xl:flex-row">
          <div className="mt-5">
            <div className="relative block w-full rounded-md border-none bg-gray-50 placeholder-gray-300 dark:bg-gray-500">
              <input
                type="date"
                className="relative block w-full rounded-md border-none bg-gray-50 placeholder-gray-300 dark:bg-gray-500"
                {...register('createdAt')}
                defaultValue={dayjs(tasksData.updatedAt).format(
                  'YYYY[-]MM[-]DD',
                )}
              />
              {errors.createdAt && (
                <span className="absolute text-sm text-red-300">
                  {errors.createdAt.message}
                </span>
              )}
            </div>
          </div>
          <div className="mt-5">
            <div>
              <input
                type="date"
                className="relative block w-full rounded-md border-none bg-gray-50 placeholder-gray-300 dark:bg-gray-500"
                {...register('updatedAt')}
                defaultValue={dayjs(tasksData.updatedAt).format(
                  'YYYY[-]MM[-]DD',
                )}
              />
              {errors.updatedAt && (
                <span className="absolute text-sm text-red-300">
                  {errors.updatedAt.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" loading={isLoading}>
          Salvar
        </Button>
      </form>
    </div>
  )
}

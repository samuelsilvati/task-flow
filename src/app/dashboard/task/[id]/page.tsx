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
import { Trash, X } from 'lucide-react'

interface MemoryDataProps {
  categoryId: string
  name: string
  description: string
}

const editTaskformSchema = z.object({
  name: z.string().nonempty('Campo obrigatório').default('noname'),
  description: z.string().nonempty(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
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

  function deleteTask() {
    setIsLoading(true)
    api
      .delete(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        router.push('/dashboard')
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
        toast.error(`${error.response.data.message}`)
      })
  }

  if (!tasksData) return <Loading />

  return (
    <div className="relative mt-16 h-64 w-64 rounded-md bg-yellow-300 p-4 shadow-md hover:scale-105">
      <form
        onSubmit={handleSubmit(editTask)}
        className="flex h-full flex-col justify-between gap-5 text-gray-800"
      >
        <div></div>
        <div className="mt-5">
          <div>
            <input
              type="text"
              placeholder="description"
              className="relative block w-full border-none bg-transparent placeholder-gray-300"
              {...register('description')}
              defaultValue={tasksData?.description}
            />
            {errors.name && (
              <span className="absolute text-sm text-red-300">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          className="underlinea absolute right-0 -mr-1 -mt-6 rounded-full bg-red-400 p-2 text-black hover:bg-red-500"
          onClick={deleteTask}
        >
          <Trash />
        </button>

        <Button type="submit" loading={isLoading}>
          Save
        </Button>

        <Link
          href="/dashboard"
          className="underlinea absolute left-0 -ml-1 -mt-6 rounded-full bg-red-300 p-2 text-black hover:bg-red-400"
        >
          <X />
        </Link>
      </form>
    </div>
  )
}

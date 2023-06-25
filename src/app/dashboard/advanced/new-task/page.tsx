'use client'
import { api } from '@/lib/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import toast from '@/app/components/Toast'
import Cookie from 'js-cookie'
import Button from '@/app/components/Button'
import { ChevronLeft } from 'lucide-react'

const createTaskformSchema = z.object({
  name: z.string().nonempty('Campo obrigatório').default('noname'),
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

type CreateTaskFormData = z.infer<typeof createTaskformSchema>

export default function NewTask() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskformSchema),
  })
  const token = Cookie.get('token')
  function createTask(data: any) {
    setIsLoading(true)
    api
      .post('/new-task', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsLoading(false)
        router.push('/dashboard/advanced')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(`${error.response.data.message}`)
      })
  }
  return (
    <div className="mt-16 h-max w-80 rounded bg-gray-700/50 px-2 pb-4 shadow-lg 2xl:w-96">
      <Link
        href="/dashboard/advanced"
        className="my-2 flex w-20 rounded-lg text-black hover:text-gray-200 dark:text-gray-100"
      >
        <ChevronLeft /> Back
      </Link>
      <form
        onSubmit={handleSubmit(createTask)}
        className="flex h-full flex-col justify-between gap-1 text-gray-800 dark:text-gray-100 md:max-w-sm"
      >
        <div>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="relative block w-full rounded-md border-none placeholder-gray-300 dark:bg-gray-500"
              {...register('name')}
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
              placeholder="Description"
              className="relative block w-full rounded-md border-none placeholder-gray-300 dark:bg-gray-500"
              {...register('description')}
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
            <div className="relative block w-full rounded-md border-none placeholder-gray-300 dark:bg-gray-500">
              <input
                type="date"
                className="relative block w-full rounded-md border-none placeholder-gray-300 dark:bg-gray-500"
                {...register('createdAt')}
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
                className="relative block w-full rounded-md border-none placeholder-gray-300 dark:bg-gray-500"
                {...register('updatedAt')}
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
          Save task
        </Button>
      </form>
    </div>
  )
}

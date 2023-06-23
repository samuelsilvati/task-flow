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
import { X } from 'lucide-react'

const createTaskformSchema = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  description: z.string().nonempty(),
  categoryId: z
    .string()
    .min(1, 'Campo obrigatório')
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
    <div className="relative h-64 w-64 rounded-md border bg-yellow-300 p-4 shadow-md hover:scale-105">
      <form
        onSubmit={handleSubmit(createTask)}
        className="flex w-full max-w-xs flex-col gap-5 text-gray-800 md:max-w-sm"
      >
        <div className="mt-5">
          <div>
            <input
              type="text"
              placeholder="Nome"
              className="relative block w-full border-none bg-transparent placeholder-gray-300"
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
              className="relative block w-full border-none bg-transparent placeholder-gray-300"
              {...register('description')}
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
              className="invisible relative w-full placeholder-gray-300"
              {...register('categoryId')}
            />
            {/* {errors.categoryId && (
            <span className="absolute text-sm text-red-300">
              {errors.categoryId.message}
            </span>
          )} */}
          </>
        </div>

        <Button type="submit" loading={isLoading}>
          Save
        </Button>

        <Link
          href="/dashboard"
          className="absolute left-0 -ml-1 -mt-6 rounded-full bg-red-300 p-2 text-black hover:bg-red-400"
        >
          <X />
        </Link>
      </form>
    </div>
  )
}

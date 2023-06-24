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
  name: z.string().nonempty().default('noname'),
  description: z.string().nonempty('Campo obrigatório'),
  isChecked: z.boolean().default(false),

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
        router.push('/dashboard')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(`${error.response.data.message}`)
      })
  }
  return (
    <div className="relative mt-16 h-64 w-64 rounded-md border bg-yellow-300 p-4 shadow-md hover:scale-105">
      <form
        onSubmit={handleSubmit(createTask)}
        className="flex h-full flex-col justify-between gap-5 text-gray-800 md:max-w-sm"
      >
        <div></div>
        <div className="mt-5">
          <div>
            <input
              type="text"
              placeholder="description"
              className="relative block w-full border-none bg-transparent placeholder-gray-300"
              {...register('description')}
            />
            {errors.description && (
              <span className="absolute text-sm text-red-300">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>

        <Button type="submit" loading={isLoading}>
          Save task
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

'use client'
import { api } from '@/lib/api'
import { Pencil } from 'lucide-react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from '../components/Toast'
import Loading from './Loading'

interface task {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  categoryId: string
  isPending: boolean
}

export default function ListTask() {
  const token = Cookies.get('token')
  const [isLoading, setIsLoading] = useState(false)
  const [tasksData, setTasksData] = useState<task[]>([])
  useEffect(() => {
    setIsLoading(true)
    api
      .get(`/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasksData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`)
        setIsLoading(false)
      })
  }, [token])

  if (!tasksData)
    return (
      <div>Nao existem tarefas ainda clique no botao acima para adicionar</div>
    )

  if (isLoading) return <Loading />
  return (
    <div className="grid grid-cols-1 gap-4 text-yellow-900 md:grid-cols-2 lg:grid-cols-3">
      {tasksData.map((task) => {
        return (
          <div
            key={task.id}
            draggable
            className={`${
              task.isPending
                ? 'group relative h-64 w-64 rounded-md bg-yellow-300/50 p-4 text-yellow-950 shadow-md hover:scale-105'
                : 'group relative h-64 w-64 rounded-md bg-yellow-300 p-4 shadow-md hover:scale-105'
            } `}
          >
            <Link
              href={`/dashboard/task/${task.id}`}
              className="absolute right-0 -mr-1 -mt-6 hidden rounded-full bg-gray-50 p-2 text-black transition-opacity hover:bg-gray-100 group-hover:block"
            >
              <Pencil />
            </Link>
            <div className="absolute rounded-full">
              <input
                type="checkbox"
                className="border-3 h-8 w-8 cursor-pointer rounded-lg border-amber-400 bg-amber-100 checked:bg-green-500 hover:bg-amber-400"
                defaultChecked={task.isPending}
              />
            </div>
            <div className="flex h-full flex-col items-center justify-center">
              {/* <p>{task.name}</p>
                  <p>{task.createdAt}</p>
                  <p>{task.updatedAt}</p>
                  <p>{task.categoryId}</p> */}
              <p className={`${task.isPending ? 'line-through' : ''}`}>
                {task.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
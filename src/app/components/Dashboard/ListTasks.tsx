'use client'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from '../Toast'
import Loading from '../Loading'
import { Plus } from 'lucide-react'

interface task {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  categoryId: string
  isChecked: boolean
}

export default function ListTasks() {
  const token = Cookies.get('token')
  const [isLoading, setIsLoading] = useState(true)
  const [tasksData, setTasksData] = useState<task[] | null>(null)
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

  if (isLoading) return <Loading />

  if (!tasksData || tasksData.length === 0) {
    return (
      <>
        <Link
          href="/dashboard/new-task"
          className="hidden self-start rounded bg-green-500 px-6 py-2 font-bold text-white transition-colors hover:bg-green-600 lg:block"
        >
          Adicionar Tarefa
        </Link>
        <p className="hidden pt-3 lg:block">
          Clique no botão acima para adicionar sua primeira tarefa
        </p>
        <Link
          href="/dashboard/new-task"
          className="absolute bottom-6 right-6 z-30 block cursor-none self-start rounded-full bg-green-500 p-4 font-bold text-white transition-colors hover:bg-green-600 lg:hidden"
        >
          <Plus />
        </Link>
        <div className="flex h-[70vh] items-center justify-center">
          <p className="block pt-3 lg:hidden">
            Clique no + para adicionar sua primeira tarefa
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <Link
        href="/dashboard/new-task"
        className="hidden self-start rounded bg-green-500 px-6 py-2 font-bold text-white transition-colors hover:bg-green-600 lg:block"
      >
        Adicionar Tarefa
      </Link>
      <Link
        href="/dashboard/new-task"
        className="absolute bottom-6 right-6 z-30 block cursor-none self-start rounded-full bg-green-500 p-2 font-bold text-white transition-colors hover:bg-green-600 lg:hidden"
      >
        <Plus />
      </Link>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasksData.map((task) => {
          const handleChangeCheckbox = async (
            e: React.ChangeEvent<HTMLInputElement>,
          ) => {
            const isChecked = e.target.checked
            try {
              await api.put(
                `/task/${task.id}`,
                { isChecked },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              )

              const updatedTasksData = tasksData.map((t) => {
                if (t.id === task.id) {
                  return {
                    ...t,
                    isChecked,
                  }
                }
                return t
              })
              setTasksData(updatedTasksData)
            } catch (error) {
              toast.error(`${'Não foi possível marcar sua tarefa'}`)
            }
          }
          return (
            <div
              key={task.id}
              draggable
              className={`${
                task.isChecked
                  ? 'flex h-16 w-80 items-center text-ellipsis rounded-md bg-yellow-300/50 p-4 text-yellow-950 shadow-lg hover:scale-105'
                  : 'flex h-16 w-80 items-center text-ellipsis rounded-md bg-yellow-300 p-4 text-yellow-900 shadow-lg hover:scale-105'
              } `}
            >
              <div className="rounded-full">
                <input
                  type="checkbox"
                  className="border-3 h-8 w-8 cursor-pointer rounded-lg border-amber-400 bg-amber-100 checked:bg-green-500 hover:bg-amber-400"
                  checked={task.isChecked}
                  onChange={handleChangeCheckbox}
                />
              </div>
              <Link href={`/dashboard/task/${task.id}`}>
                <div className="w-64">
                  <p
                    className={`${
                      task.isChecked
                        ? 'text h-7 truncate px-3 text-left line-through'
                        : 'h-7 truncate px-3 text-left'
                    }`}
                  >
                    {task.description}
                  </p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

'use client'
import { api } from '@/lib/api'
import { Pencil } from 'lucide-react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from '../components/Toast'
import Loading from './Loading'

interface task {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  categoryId: string
  isChecked: boolean
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

  if (tasksData && tasksData.length === 0) {
    return <div>Não existem tarefas! Clique no botão acima para adicionar</div>
  }

  if (isLoading) return <Loading />
  return (
    <div className="grid grid-cols-1 gap-4 text-yellow-900 md:grid-cols-2 lg:grid-cols-3">
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
                checked={task.isChecked}
                onChange={handleChangeCheckbox}
              />
            </div>
            <div className="flex h-full flex-col items-center justify-center">
              <p className={`${task.isChecked ? 'line-through' : ''}`}>
                {task.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

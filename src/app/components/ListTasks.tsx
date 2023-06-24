'use client'
import { api } from '@/lib/api'
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
                ? 'relative h-16 w-80 rounded-md bg-yellow-300/50 p-4 text-yellow-950 shadow-lg hover:scale-105'
                : 'relative h-16 w-80 rounded-md bg-yellow-300 p-4 text-yellow-900 shadow-lg hover:scale-105'
            } `}
          >
            <div className="absolute top-1/2 my-auto -translate-y-1/2 transform rounded-full">
              <input
                type="checkbox"
                className="border-3 h-8 w-8 cursor-pointer rounded-lg border-amber-400 bg-amber-100 checked:bg-green-500 hover:bg-amber-400"
                checked={task.isChecked}
                onChange={handleChangeCheckbox}
              />
            </div>
            <Link href={`/dashboard/task/${task.id}`}>
              <div className="flex h-full flex-col items-center justify-center">
                <p className={`${task.isChecked ? 'line-through' : ''}`}>
                  {task.description}
                </p>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

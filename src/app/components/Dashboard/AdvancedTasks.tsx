'use client'
import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { PencilIcon } from 'lucide-react'
import toast from '../Toast'
import Loading from '../Loading'
import dayjs from 'dayjs'
interface task {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  categoryId: string
  isChecked: boolean
}

export default function AdvancedTasks() {
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
          className="right-4 self-start rounded bg-green-500 px-6 py-2 font-bold text-white transition-colors hover:bg-green-600"
        >
          Adicionar Tarefa
        </Link>
        <p className="pt-3">
          Não existem tarefas! Clique no botão acima para adicionar
        </p>
      </>
    )
  }

  return (
    <>
      <Link
        href="/dashboard/advanced/new-task"
        className="right-4 self-start rounded-md bg-green-500 px-6 py-2 font-bold text-white transition-colors hover:bg-green-600"
      >
        Adicionar Tarefa
      </Link>
      <div className="mt-4 w-full overflow-auto rounded bg-gray-50 px-2 pb-4 shadow dark:bg-gray-700/50">
        <table className="flex flex-grow flex-col">
          <thead className="text-lg">
            <tr className="border-b border-gray-100/60 dark:border-gray-500">
              <th className="w-14 px-1 py-4 text-center">Cod.</th>
              <th className="hidden w-40 px-1 py-4 text-left lg:table-cell">
                Name
              </th>
              <th className="w-96 px-3 text-left">Task</th>
              <th className="hidden w-28 px-1 py-4 text-center lg:table-cell">
                Inital date
              </th>
              <th className="hidden w-28  px-1 py-4 text-center lg:table-cell">
                Final date
              </th>
              <th className="w-36 px-1  py-4 text-center">Status</th>
              <th className="w-10 px-1  py-4 text-center"></th>
            </tr>
          </thead>
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
              <tbody key={task.id}>
                <tr
                  className={`${
                    task.isChecked
                      ? 'relative cursor-pointer border-b border-gray-200/50 bg-gray-100/50 text-gray-400 line-through hover:bg-gray-200/60 dark:border-gray-500 dark:bg-gray-800/50 dark:hover:bg-gray-600/50'
                      : 'relative cursor-pointer border-b border-gray-100/60 hover:bg-gray-100/20 dark:border-gray-500 dark:hover:bg-gray-600/50'
                  }`}
                >
                  <td className="w-14 px-1 text-center">{task.id}</td>
                  <td className="hidden w-40 px-1 py-4 text-left lg:table-cell">
                    {task.name}
                  </td>
                  <td className=" w-96 px-3 text-left">{task.description}</td>
                  <td className="hidden w-28 px-1 py-4 text-center lg:table-cell">
                    {dayjs(task.createdAt).format('D[/]MM[/]YYYY')}
                  </td>
                  <td className="hidden w-28 px-1 py-4 text-center lg:table-cell">
                    {dayjs(task.updatedAt).format('D[/]MM[/]YYYY')}
                  </td>
                  <td className="w-36 px-1 py-4 text-center">
                    <input
                      type="checkbox"
                      className="border-3 h-8 w-8 cursor-pointer rounded-lg border-amber-400 bg-amber-100 checked:bg-green-500 hover:bg-amber-400"
                      checked={task.isChecked}
                      onChange={handleChangeCheckbox}
                    />
                  </td>
                  <td>
                    <a href={`/dashboard/advanced/task/${task.id}`}>
                      <div className="rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-400">
                        <PencilIcon />
                      </div>
                    </a>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    </>
  )
}

import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import Link from 'next/link'
interface task {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  categoryId: string
}

export default async function Dashboard() {
  const token = cookies().get('token')?.value
  const response = await api.get('/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const tasks: task[] = response.data
  return (
    <>
      <h1 className="pb-4 text-2xl text-black">Minhas Tarefas</h1>
      <Link
        href="/dashboard/new-task"
        className="absolute right-4 rounded bg-green-500 px-6 py-2 font-bold text-white transition-colors hover:bg-green-600"
      >
        Adicionar Tarefa
      </Link>
      <div className="grid grid-cols-1 gap-4 text-yellow-900 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => {
          return (
            <Link key={task.id} href={`/dashboard/task/${task.id}`}>
              <div
                draggable
                className="relative h-64 w-64 rounded-md bg-yellow-300 p-4 shadow-md hover:scale-105"
              >
                <div className="absolute rounded-full">
                  <input
                    type="checkbox"
                    className="border-3 h-8 w-8 cursor-pointer rounded-lg border-amber-400 bg-amber-100 checked:bg-green-500 hover:bg-amber-400"
                  />
                </div>
                <div className="flex h-full flex-col items-center justify-center">
                  {/* <p>{task.name}</p>
                  <p>{task.createdAt}</p>
                  <p>{task.updatedAt}</p>
                  <p>{task.categoryId}</p> */}
                  <p>{task.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

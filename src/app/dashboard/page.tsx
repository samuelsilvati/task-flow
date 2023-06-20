import { api } from '@/lib/api'
import { cookies } from 'next/headers'
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
    <div className="flex h-full w-full flex-col items-center ">
      <h1>TAREFAS</h1>
      <div className="flex w-full max-w-7xl flex-grow flex-col items-center justify-between  bg-gray-200 p-4 text-lg text-yellow-900">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => {
            return (
              <div
                key={task.id}
                draggable
                className="relative h-64 w-64 rounded-md bg-yellow-300 p-4 shadow-md"
              >
                <div className="flex h-full flex-col items-center justify-center">
                  <p>{task.name}</p>
                  <p>{task.createdAt}</p>
                  <p>{task.updatedAt}</p>
                  <p>{task.categoryId}</p>
                  <p>{task.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

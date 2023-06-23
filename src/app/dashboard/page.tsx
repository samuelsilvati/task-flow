import Link from 'next/link'
import ListTask from '../components/ListTasks'

export default function Dashboard() {
  return (
    <div className="flex flex-grow flex-col gap-3">
      <Link
        href="/dashboard/new-task"
        className="right-4 self-start rounded bg-green-500 px-6 py-2 font-bold text-white transition-colors hover:bg-green-600"
      >
        Adicionar Tarefa
      </Link>

      <ListTask />
    </div>
  )
}

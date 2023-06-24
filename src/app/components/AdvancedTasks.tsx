'use client'

import Link from 'next/link'

export default function AdvancedTasks() {
  return (
    <>
      <Link
        href="/dashboard/new-task"
        className="right-4 self-start rounded bg-green-500 px-6 py-2 font-bold text-white transition-colors hover:bg-green-600"
      >
        Adicionar Tarefa
      </Link>
      <div className="flex flex-grow border">
        <table>
          <thead className="border-b border-gray-300">
            <tr>
              <th>more</th>
              <th>cod</th>
              <th>Task</th>
              <th>Categ</th>
              <th>Inital date</th>
              <th>Final date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>o</td>
              <td>1</td>
              <td>Task 1</td>
              <td>Category 1</td>
              <td>2023-06-01</td>
              <td>2023-06-10</td>
              <td>Completed</td>
              <td>
                <a href="#">Edit</a>
              </td>
            </tr>
            <tr>
              <td>o</td>
              <td>2</td>
              <td>Task 2</td>
              <td>Category 2</td>
              <td>2023-06-03</td>
              <td>2023-06-15</td>
              <td>Pending</td>
              <td>
                <a href="#">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

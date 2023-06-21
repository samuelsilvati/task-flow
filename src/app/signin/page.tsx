import { redirect } from 'next/navigation'
import AuthForm from '../components/AuthForm'
import { cookies } from 'next/headers'

export default function Auth() {
  const token = cookies().has('token')
  if (token) redirect('/dashboard')

  return (
    <div className="flex h-full w-full items-center justify-center">
      <AuthForm />
    </div>
  )
}

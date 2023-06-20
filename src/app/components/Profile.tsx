import { getUser } from '@/lib/auth'

export function Profile() {
  const { name } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <p className="max-w-[140px]  leading-snug text-black">
        Olá <span className="font-bold">{name}</span>{' '}
      </p>
    </div>
  )
}

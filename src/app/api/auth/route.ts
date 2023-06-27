import { api } from '@/lib/api'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()

  try {
    const registerResponse = await api.post('/auth', data)
    const { token } = registerResponse.data

    return new Response('Success', {
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}; Path=/;max-age=${process.env.COOKIE_EXPIRES_IN_SECONDS}`,
      },
    })
  } catch (error) {
    return error
  }
}

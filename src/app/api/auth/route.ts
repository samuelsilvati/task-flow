import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()

  try {
    const registerResponse = await api.post('/auth', data)
    const { token } = registerResponse.data

    const redirectURL = new URL('/dashboard', request.url)

    return NextResponse.redirect(redirectURL, {
      headers: {
        'Set-Cookie': `token=${token}; Path=/;max-age=${process.env.COOKIE_EXPIRES_IN_SECONDS}`,
      },
    })
  } catch (error) {
    return error
  }
}

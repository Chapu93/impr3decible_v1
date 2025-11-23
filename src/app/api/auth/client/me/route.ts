import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'secret-key-change-in-production'
)

export async function GET() {
  try {
    const token = cookies().get('client-token')?.value

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, SECRET)

    return NextResponse.json({ user: payload })
  } catch (error) {
    console.error('Error verificando token:', error)
    return NextResponse.json({ user: null }, { status: 401 })
  }
}

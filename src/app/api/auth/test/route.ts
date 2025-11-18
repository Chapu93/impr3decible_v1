import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'NextAuth test route',
    paths: {
      session: '/api/auth/session',
      signin: '/api/auth/signin',
      signout: '/api/auth/signout',
    }
  })
}

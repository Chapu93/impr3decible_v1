import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('✅ /api/auth/signin GET called')
  return NextResponse.json({ 
    message: 'signin route',
    url: request.url 
  })
}

export async function POST(request: NextRequest) {
  console.log('✅ /api/auth/signin POST called')
  const body = await request.json()
  console.log('Body:', body)
  return NextResponse.json({ 
    message: 'signin POST',
    received: body 
  })
}

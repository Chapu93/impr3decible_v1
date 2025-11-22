import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    cookies().delete('client-token')
    
    return NextResponse.json({ message: 'Logout exitoso' })
  } catch (error) {
    console.error('Error en logout:', error)
    return NextResponse.json(
      { error: 'Error al cerrar sesión' },
      { status: 500 }
    )
  }
}

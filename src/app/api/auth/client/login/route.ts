import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'secret-key-change-in-production'
)

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Buscar cliente en la base de datos
    const client = await prisma.client.findUnique({
      where: { email },
      include: {
        sites: {
          include: {
            template: true
          }
        }
      }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, client.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Crear JWT token
    const token = await new SignJWT({
      id: client.id,
      email: client.email,
      name: client.name,
      role: 'client',
      companyName: client.companyName,
      sites: client.sites.map(s => ({ id: s.id, subdomain: s.subdomain }))
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(SECRET)

    // Guardar token en cookie
    cookies().set('client-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 días
    })

    return NextResponse.json({
      message: 'Login exitoso',
      user: {
        id: client.id,
        email: client.email,
        name: client.name,
        companyName: client.companyName,
        sites: client.sites
      }
    })
  } catch (error) {
    console.error('Error en login de cliente:', error)
    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    )
  }
}

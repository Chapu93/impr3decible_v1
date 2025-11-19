import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

// GET - Listar todos los clientes
export async function GET(request: NextRequest) {
  try {
    const clients = await prisma.client.findMany({
      include: {
        _count: {
          select: { sites: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ clients })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Error al obtener clientes' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo cliente
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, phone, companyName, password } = body

    // Validar campos requeridos
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: 'Email, nombre y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Verificar si el email ya existe
    const existingClient = await prisma.client.findUnique({
      where: { email }
    })

    if (existingClient) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      )
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear cliente
    const client = await prisma.client.create({
      data: {
        email,
        name,
        phone: phone || null,
        companyName: companyName || null,
        password: hashedPassword,
      }
    })

    // No devolver la contraseña
    const { password: _, ...clientData } = client

    return NextResponse.json(
      { message: 'Cliente creado exitosamente', client: clientData },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { error: 'Error al crear cliente' },
      { status: 500 }
    )
  }
}

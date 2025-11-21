import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET - Listar todas las plantillas
export async function GET(request: NextRequest) {
  try {
    const templates = await prisma.template.findMany({
      include: {
        _count: {
          select: { sites: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ templates })
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Error al obtener plantillas' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva plantilla
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, type, thumbnail, defaultConfig, schema } = body

    // Validar campos requeridos
    if (!name || !type) {
      return NextResponse.json(
        { error: 'Nombre y tipo son requeridos' },
        { status: 400 }
      )
    }

    // Crear plantilla
    const template = await prisma.template.create({
      data: {
        name,
        description: description || null,
        type,
        thumbnail: thumbnail || null,
        defaultConfig: defaultConfig || {},
        schema: schema || {}
      },
      include: {
        _count: {
          select: { sites: true }
        }
      }
    })

    return NextResponse.json(
      { message: 'Plantilla creada exitosamente', template },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating template:', error)
    return NextResponse.json(
      { error: 'Error al crear plantilla' },
      { status: 500 }
    )
  }
}

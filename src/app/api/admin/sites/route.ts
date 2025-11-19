import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET - Listar todos los sitios
export async function GET(request: NextRequest) {
  try {
    const sites = await prisma.site.findMany({
      include: {
        client: {
          select: {
            name: true,
            email: true
          }
        },
        template: {
          select: {
            name: true,
            type: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ sites })
  } catch (error) {
    console.error('Error fetching sites:', error)
    return NextResponse.json(
      { error: 'Error al obtener sitios' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo sitio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subdomain, customDomain, status, clientId, templateId } = body

    // Validar campos requeridos
    if (!subdomain || !clientId || !templateId) {
      return NextResponse.json(
        { error: 'Subdominio, cliente y plantilla son requeridos' },
        { status: 400 }
      )
    }

    // Verificar que el subdominio no exista
    const existingSubdomain = await prisma.site.findUnique({
      where: { subdomain }
    })

    if (existingSubdomain) {
      return NextResponse.json(
        { error: 'El subdominio ya está en uso' },
        { status: 400 }
      )
    }

    // Si hay customDomain, verificar que no exista
    if (customDomain) {
      const existingDomain = await prisma.site.findUnique({
        where: { customDomain }
      })

      if (existingDomain) {
        return NextResponse.json(
          { error: 'El dominio personalizado ya está en uso' },
          { status: 400 }
        )
      }
    }

    // Verificar que el cliente existe
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }

    // Verificar que la plantilla existe
    const template = await prisma.template.findUnique({
      where: { id: templateId }
    })

    if (!template) {
      return NextResponse.json(
        { error: 'Plantilla no encontrada' },
        { status: 404 }
      )
    }

    // Crear sitio
    const site = await prisma.site.create({
      data: {
        subdomain,
        customDomain: customDomain || null,
        status: status || 'DRAFT',
        clientId,
        templateId,
      },
      include: {
        client: {
          select: {
            name: true,
            email: true
          }
        },
        template: {
          select: {
            name: true,
            type: true
          }
        }
      }
    })

    return NextResponse.json(
      { message: 'Sitio creado exitosamente', site },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating site:', error)
    return NextResponse.json(
      { error: 'Error al crear sitio' },
      { status: 500 }
    )
  }
}

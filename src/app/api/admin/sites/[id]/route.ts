import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET - Obtener un sitio específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const site = await prisma.site.findUnique({
      where: { id: params.id },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        template: {
          select: {
            id: true,
            name: true,
            type: true
          }
        },
        pages: {
          select: {
            id: true,
            title: true,
            slug: true,
            isPublished: true
          }
        }
      }
    })

    if (!site) {
      return NextResponse.json(
        { error: 'Sitio no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ site })
  } catch (error) {
    console.error('Error fetching site:', error)
    return NextResponse.json(
      { error: 'Error al obtener sitio' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar sitio
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { subdomain, customDomain, status, clientId, templateId } = body

    // Verificar si el sitio existe
    const existingSite = await prisma.site.findUnique({
      where: { id: params.id }
    })

    if (!existingSite) {
      return NextResponse.json(
        { error: 'Sitio no encontrado' },
        { status: 404 }
      )
    }

    // Si se cambió el subdominio, verificar que no exista
    if (subdomain !== existingSite.subdomain) {
      const subdomainExists = await prisma.site.findUnique({
        where: { subdomain }
      })

      if (subdomainExists) {
        return NextResponse.json(
          { error: 'El subdominio ya está en uso' },
          { status: 400 }
        )
      }
    }

    // Si se cambió el customDomain, verificar que no exista
    if (customDomain && customDomain !== existingSite.customDomain) {
      const domainExists = await prisma.site.findUnique({
        where: { customDomain }
      })

      if (domainExists) {
        return NextResponse.json(
          { error: 'El dominio personalizado ya está en uso' },
          { status: 400 }
        )
      }
    }

    // Actualizar sitio
    const site = await prisma.site.update({
      where: { id: params.id },
      data: {
        subdomain,
        customDomain: customDomain || null,
        status,
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

    return NextResponse.json({
      message: 'Sitio actualizado exitosamente',
      site
    })
  } catch (error) {
    console.error('Error updating site:', error)
    return NextResponse.json(
      { error: 'Error al actualizar sitio' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar sitio
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar si el sitio existe
    const site = await prisma.site.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { 
            pages: true,
            products: true 
          }
        }
      }
    })

    if (!site) {
      return NextResponse.json(
        { error: 'Sitio no encontrado' },
        { status: 404 }
      )
    }

    // Advertir si tiene contenido (opcional - puedes eliminar esta validación si quieres cascade delete)
    if (site._count.pages > 0 || site._count.products > 0) {
      // En lugar de bloquear, podemos hacer cascade delete
      // o devolver un warning
      console.warn(`Deleting site ${params.id} with ${site._count.pages} pages and ${site._count.products} products`)
    }

    // Eliminar sitio (cascade delete se encarga de pages, products, etc.)
    await prisma.site.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Sitio eliminado exitosamente'
    })
  } catch (error) {
    console.error('Error deleting site:', error)
    return NextResponse.json(
      { error: 'Error al eliminar sitio' },
      { status: 500 }
    )
  }
}

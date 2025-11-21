import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET - Obtener una plantilla por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const template = await prisma.template.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { sites: true }
        }
      }
    })

    if (!template) {
      return NextResponse.json(
        { error: 'Plantilla no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({ template })
  } catch (error) {
    console.error('Error fetching template:', error)
    return NextResponse.json(
      { error: 'Error al obtener plantilla' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar una plantilla
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Verificar que la plantilla existe
    const existingTemplate = await prisma.template.findUnique({
      where: { id: params.id }
    })

    if (!existingTemplate) {
      return NextResponse.json(
        { error: 'Plantilla no encontrada' },
        { status: 404 }
      )
    }

    // Actualizar plantilla
    const template = await prisma.template.update({
      where: { id: params.id },
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

    return NextResponse.json({
      message: 'Plantilla actualizada exitosamente',
      template
    })
  } catch (error) {
    console.error('Error updating template:', error)
    return NextResponse.json(
      { error: 'Error al actualizar plantilla' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar una plantilla
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar que la plantilla existe
    const template = await prisma.template.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { sites: true }
        }
      }
    })

    if (!template) {
      return NextResponse.json(
        { error: 'Plantilla no encontrada' },
        { status: 404 }
      )
    }

    // Verificar que no tenga sitios asociados
    if (template._count.sites > 0) {
      return NextResponse.json(
        { error: `No se puede eliminar. Hay ${template._count.sites} sitio(s) usando esta plantilla` },
        { status: 400 }
      )
    }

    // Eliminar plantilla
    await prisma.template.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Plantilla eliminada exitosamente'
    })
  } catch (error) {
    console.error('Error deleting template:', error)
    return NextResponse.json(
      { error: 'Error al eliminar plantilla' },
      { status: 500 }
    )
  }
}

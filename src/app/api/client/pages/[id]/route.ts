import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { prisma } from '@/lib/db'

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'secret-key-change-in-production'
)

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get('client-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, SECRET)
    const clientId = payload.id as string

    const site = await prisma.site.findFirst({
      where: { clientId }
    })

    if (!site) {
      return NextResponse.json({ error: 'No tienes un sitio asignado' }, { status: 404 })
    }

    const body = await request.json()
    const { title, slug, content, published } = body

    const page = await prisma.page.update({
      where: { 
        id: params.id,
        siteId: site.id
      },
      data: {
        title,
        slug,
        content,
        published: published || false
      }
    })

    return NextResponse.json({ message: 'Página actualizada exitosamente', page })
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json({ error: 'Error al actualizar página' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get('client-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, SECRET)
    const clientId = payload.id as string

    const site = await prisma.site.findFirst({
      where: { clientId }
    })

    if (!site) {
      return NextResponse.json({ error: 'No tienes un sitio asignado' }, { status: 404 })
    }

    await prisma.page.delete({
      where: { 
        id: params.id,
        siteId: site.id
      }
    })

    return NextResponse.json({ message: 'Página eliminada exitosamente' })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json({ error: 'Error al eliminar página' }, { status: 500 })
  }
}

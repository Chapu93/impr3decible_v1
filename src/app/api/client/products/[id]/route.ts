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
    const { name, description, price, stock, image, category } = body

    const product = await prisma.product.update({
      where: { 
        id: params.id,
        siteId: site.id
      },
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        stock: parseInt(stock),
        image: image || null,
        category: category || null
      }
    })

    return NextResponse.json({ message: 'Producto actualizado exitosamente', product })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 })
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

    await prisma.product.delete({
      where: { 
        id: params.id,
        siteId: site.id
      }
    })

    return NextResponse.json({ message: 'Producto eliminado exitosamente' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 })
  }
}

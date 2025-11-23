import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { prisma } from '@/lib/db'

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'secret-key-change-in-production'
)

export async function GET(request: NextRequest) {
  try {
    const token = cookies().get('client-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const { payload } = await jwtVerify(token, SECRET)
    const clientId = payload.id as string

    // Obtener el primer sitio del cliente
    const site = await prisma.site.findFirst({
      where: { clientId }
    })

    if (!site) {
      return NextResponse.json({ products: [] })
    }

    const products = await prisma.product.findMany({
      where: { siteId: site.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    if (!name || price === undefined || stock === undefined) {
      return NextResponse.json(
        { error: 'Nombre, precio y stock son requeridos' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        stock: parseInt(stock),
        image: image || null,
        category: category || null,
        siteId: site.id
      }
    })

    return NextResponse.json({ message: 'Producto creado exitosamente', product }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 })
  }
}

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

    const site = await prisma.site.findFirst({
      where: { clientId }
    })

    if (!site) {
      return NextResponse.json({ pages: [] })
    }

    const pages = await prisma.page.findMany({
      where: { siteId: site.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Error al obtener páginas' }, { status: 500 })
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
    const { title, slug, content, published } = body

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Título, slug y contenido son requeridos' },
        { status: 400 }
      )
    }

    // Verificar que el slug no exista
    const existingPage = await prisma.page.findFirst({
      where: {
        siteId: site.id,
        slug
      }
    })

    if (existingPage) {
      return NextResponse.json(
        { error: 'Ya existe una página con ese slug' },
        { status: 400 }
      )
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content,
        published: published || false,
        siteId: site.id
      }
    })

    return NextResponse.json({ message: 'Página creada exitosamente', page }, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Error al crear página' }, { status: 500 })
  }
}

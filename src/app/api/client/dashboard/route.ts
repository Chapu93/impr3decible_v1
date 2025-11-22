import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { prisma } from '@/lib/db'

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'secret-key-change-in-production'
)

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const token = cookies().get('client-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      )
    }

    const { payload } = await jwtVerify(token, SECRET)
    const clientId = payload.id as string

    // Obtener sitios del cliente
    const sites = await prisma.site.findMany({
      where: { clientId },
      include: {
        template: {
          select: {
            name: true,
            type: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // TODO: Obtener productos y páginas cuando estén implementados
    const stats = {
      totalProducts: 0,
      totalPages: 0,
      publishedSites: sites.filter(s => s.status === 'PUBLISHED').length
    }

    return NextResponse.json({
      sites,
      stats
    })
  } catch (error) {
    console.error('Error fetching client dashboard:', error)
    return NextResponse.json(
      { error: 'Error al obtener datos' },
      { status: 500 }
    )
  }
}

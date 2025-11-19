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

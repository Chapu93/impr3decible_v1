import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET - Obtener métricas del dashboard
export async function GET(request: NextRequest) {
  try {
    // Obtener conteos en paralelo
    const [
      clientsCount,
      sitesCount,
      templatesCount,
      publishedSitesCount,
      draftSitesCount,
      maintenanceSitesCount,
      recentClients,
      recentSites,
    ] = await Promise.all([
      prisma.client.count(),
      prisma.site.count(),
      prisma.template.count(),
      prisma.site.count({ where: { status: 'PUBLISHED' } }),
      prisma.site.count({ where: { status: 'DRAFT' } }),
      prisma.site.count({ where: { status: 'MAINTENANCE' } }),
      // Clientes más recientes
      prisma.client.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          _count: {
            select: { sites: true }
          }
        }
      }),
      // Sitios más recientes
      prisma.site.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          subdomain: true,
          status: true,
          createdAt: true,
          client: {
            select: {
              name: true
            }
          },
          template: {
            select: {
              name: true
            }
          }
        }
      })
    ])

    // Calcular crecimiento de clientes (mes actual vs anterior)
    const now = new Date()
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59)

    const [clientsThisMonth, clientsLastMonth] = await Promise.all([
      prisma.client.count({
        where: {
          createdAt: {
            gte: firstDayThisMonth
          }
        }
      }),
      prisma.client.count({
        where: {
          createdAt: {
            gte: firstDayLastMonth,
            lte: lastDayLastMonth
          }
        }
      })
    ])

    // Calcular porcentaje de crecimiento
    let clientsGrowth = 0
    if (clientsLastMonth > 0) {
      clientsGrowth = Math.round(((clientsThisMonth - clientsLastMonth) / clientsLastMonth) * 100)
    } else if (clientsThisMonth > 0) {
      clientsGrowth = 100
    }

    // Métricas por tipo de plantilla
    const templateUsage = await prisma.template.findMany({
      select: {
        name: true,
        type: true,
        _count: {
          select: { sites: true }
        }
      },
      orderBy: {
        sites: {
          _count: 'desc'
        }
      }
    })

    return NextResponse.json({
      metrics: {
        clients: {
          total: clientsCount,
          thisMonth: clientsThisMonth,
          growth: clientsGrowth
        },
        sites: {
          total: sitesCount,
          published: publishedSitesCount,
          draft: draftSitesCount,
          maintenance: maintenanceSitesCount
        },
        templates: {
          total: templatesCount,
          usage: templateUsage
        }
      },
      recent: {
        clients: recentClients,
        sites: recentSites
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error)
    return NextResponse.json(
      { error: 'Error al obtener métricas' },
      { status: 500 }
    )
  }
}

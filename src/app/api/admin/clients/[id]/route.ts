import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

// GET - Obtener un cliente específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        sites: {
          select: {
            id: true,
            subdomain: true,
            status: true,
            customDomain: true
          }
        },
        _count: {
          select: { sites: true }
        }
      }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }

    // No devolver la contraseña
    const { password, ...clientData } = client

    return NextResponse.json({ client: clientData })
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json(
      { error: 'Error al obtener cliente' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar cliente
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { email, name, phone, companyName, password } = body

    // Verificar si el cliente existe
    const existingClient = await prisma.client.findUnique({
      where: { id: params.id }
    })

    if (!existingClient) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }

    // Si se cambió el email, verificar que no exista
    if (email !== existingClient.email) {
      const emailExists = await prisma.client.findUnique({
        where: { email }
      })

      if (emailExists) {
        return NextResponse.json(
          { error: 'El email ya está en uso' },
          { status: 400 }
        )
      }
    }

    // Preparar datos de actualización
    const updateData: any = {
      email,
      name,
      phone: phone || null,
      companyName: companyName || null,
    }

    // Si se proporciona una nueva contraseña, hashearla
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    // Actualizar cliente
    const client = await prisma.client.update({
      where: { id: params.id },
      data: updateData
    })

    // No devolver la contraseña
    const { password: _, ...clientData } = client

    return NextResponse.json({
      message: 'Cliente actualizado exitosamente',
      client: clientData
    })
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json(
      { error: 'Error al actualizar cliente' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar cliente
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar si el cliente tiene sitios asociados
    const client = await prisma.client.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { sites: true }
        }
      }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }

    if (client._count.sites > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar un cliente con sitios activos' },
        { status: 400 }
      )
    }

    // Eliminar cliente
    await prisma.client.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Cliente eliminado exitosamente'
    })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json(
      { error: 'Error al eliminar cliente' },
      { status: 500 }
    )
  }
}

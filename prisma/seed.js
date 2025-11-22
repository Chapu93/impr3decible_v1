const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // 1. Crear empresa demo
  console.log('📦 Creando empresa demo...')
  const company = await prisma.company.upsert({
    where: { slug: 'demo' },
    update: {},
    create: {
      name: 'Demo Company',
      slug: 'demo',
      plan: 'PRO',
      maxClients: 50,
      maxSites: 100,
    },
  })
  console.log('✅ Empresa creada:', company.name)

  // 2. Crear admin
  console.log('👤 Creando usuario admin...')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      name: 'Admin Demo',
      password: hashedPassword,
      role: 'ADMIN',
      companyId: company.id,
    },
  })
  console.log('✅ Admin creado:', admin.email)

  // 3. Crear plantilla e-commerce (tu proyecto actual)
  console.log('🎨 Creando plantilla E-commerce...')
  const ecommerceTemplate = await prisma.template.upsert({
    where: { slug: 'impr3decible-ecommerce' },
    update: {},
    create: {
      name: 'Impr3Decible E-commerce',
      slug: 'impr3decible-ecommerce',
      type: 'ECOMMERCE',
      description: 'Plantilla completa de e-commerce para servicios de impresión 3D',
      thumbnail: '/templates/ecommerce-thumb.jpg',
      isPublic: true,
      config: {
        theme: {
          primaryColor: '#FF6B35',
          darkMode: true,
        },
        branding: {
          logo: '',
          companyName: '',
        },
        features: {
          cart: true,
          wishlist: true,
          quotes: true,
          products: true,
        },
      },
      schema: {
        fields: [
          {
            key: 'branding.logo',
            label: 'Logo',
            type: 'image',
            required: false,
          },
          {
            key: 'branding.companyName',
            label: 'Nombre de la Empresa',
            type: 'text',
            required: true,
          },
          {
            key: 'theme.primaryColor',
            label: 'Color Principal',
            type: 'color',
            required: true,
          },
          {
            key: 'theme.darkMode',
            label: 'Modo Oscuro',
            type: 'boolean',
            required: false,
          },
        ],
      },
    },
  })
  console.log('✅ Plantilla E-commerce creada')

  // 4. Crear páginas de la plantilla
  console.log('📄 Creando páginas de plantilla...')
  const pages = [
    {
      slug: 'home',
      title: 'Inicio',
      description: 'Página principal',
      isHome: true,
      order: 0,
      content: { sections: ['hero', 'featured-products', 'projects', 'testimonials'] },
    },
    {
      slug: 'products',
      title: 'Productos',
      description: 'Catálogo de productos',
      isHome: false,
      order: 1,
      content: { sections: ['product-grid', 'filters'] },
    },
    {
      slug: 'about',
      title: 'Nosotros',
      description: 'Sobre la empresa',
      isHome: false,
      order: 2,
      content: { sections: ['about-content'] },
    },
    {
      slug: 'contact',
      title: 'Contacto',
      description: 'Formulario de contacto',
      isHome: false,
      order: 3,
      content: { sections: ['contact-form'] },
    },
    {
      slug: 'quote',
      title: 'Cotizar',
      description: 'Solicitar cotización',
      isHome: false,
      order: 4,
      content: { sections: ['quote-form'] },
    },
  ]

  for (const page of pages) {
    await prisma.templatePage.upsert({
      where: {
        templateId_slug: {
          templateId: ecommerceTemplate.id,
          slug: page.slug,
        },
      },
      update: {},
      create: {
        templateId: ecommerceTemplate.id,
        ...page,
      },
    })
  }
  console.log('✅ Páginas de plantilla creadas')

  // 5. Crear cliente demo
  console.log('👥 Creando cliente demo...')
  const clientPassword = await bcrypt.hash('cliente123', 10)
  const client = await prisma.client.upsert({
    where: { email: 'cliente@demo.com' },
    update: {},
    create: {
      email: 'cliente@demo.com',
      name: 'Cliente Demo',
      phone: '+1234567890',
      password: clientPassword,
      companyId: company.id,
    },
  })
  console.log('✅ Cliente creado:', client.email)

  // 6. Crear sitio demo
  console.log('🌐 Creando sitio demo...')
  const site = await prisma.site.upsert({
    where: { subdomain: 'demo' },
    update: {},
    create: {
      name: 'Demo Store',
      subdomain: 'demo',
      clientId: client.id,
      templateId: ecommerceTemplate.id,
      status: 'PUBLISHED',
      publishedAt: new Date(),
      config: {
        branding: {
          logo: '/demo-logo.png',
          companyName: 'Demo 3D Printing',
        },
        theme: {
          primaryColor: '#FF6B35',
          darkMode: true,
        },
      },
      metaTitle: 'Demo 3D Printing Store',
      metaDescription: 'Tienda de demostración de impresión 3D',
    },
  })
  console.log('✅ Sitio demo creado:', site.subdomain)

  // 7. Crear productos de ejemplo
  console.log('🛍️  Creando productos de ejemplo...')
  const products = [
    {
      name: 'Prototipo Rápido',
      slug: 'prototipo-rapido',
      description: 'Prototipo funcional impreso en PLA de alta calidad',
      price: 45.99,
      category: 'Prototipos',
      stock: 100,
      images: ['/products/prototipo-1.jpg'],
      tags: ['PLA', 'Prototipo', 'Rápido'],
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Figura Personalizada',
      slug: 'figura-personalizada',
      description: 'Figura decorativa personalizada en resina',
      price: 89.99,
      compareAtPrice: 120.00,
      category: 'Decoración',
      stock: 50,
      images: ['/products/figura-1.jpg'],
      tags: ['Resina', 'Personalizado', 'Decoración'],
      isActive: true,
      isFeatured: true,
    },
    {
      name: 'Pieza Industrial',
      slug: 'pieza-industrial',
      description: 'Pieza de repuesto industrial en Nylon',
      price: 129.99,
      category: 'Industrial',
      stock: 30,
      images: ['/products/industrial-1.jpg'],
      tags: ['Nylon', 'Industrial', 'Repuesto'],
      isActive: true,
      isFeatured: false,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        siteId_slug: {
          siteId: site.id,
          slug: product.slug,
        },
      },
      update: {},
      create: {
        siteId: site.id,
        ...product,
      },
    })
  }
  console.log('✅ Productos creados')

  // 8. Crear página personalizada
  console.log('📝 Creando páginas del sitio...')
  await prisma.page.upsert({
    where: {
      siteId_slug: {
        siteId: site.id,
        slug: 'home',
      },
    },
    update: {},
    create: {
      siteId: site.id,
      slug: 'home',
      title: 'Bienvenido a Demo 3D Printing',
      metaTitle: 'Demo 3D Printing - Inicio',
      metaDescription: 'Tu tienda de impresión 3D de confianza',
      isPublished: true,
      order: 0,
      content: {
        hero: {
          title: 'Impresión 3D de Alta Calidad',
          subtitle: 'Transformamos tus ideas en realidad',
          cta: 'Ver Productos',
        },
      },
    },
  })
  console.log('✅ Páginas del sitio creadas')

  console.log('')
  console.log('✅ Seed completado!')
  console.log('')
  console.log('📝 Credenciales de prueba:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🔐 Admin:')
  console.log('   Email: admin@demo.com')
  console.log('   Password: admin123')
  console.log('   URL: http://admin.localhost:3000')
  console.log('')
  console.log('👤 Cliente:')
  console.log('   Email: cliente@demo.com')
  console.log('   Password: cliente123')
  console.log('   URL: http://panel.localhost:3000')
  console.log('')
  console.log('🌐 Sitio Demo:')
  console.log('   URL: http://demo.localhost:3000')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

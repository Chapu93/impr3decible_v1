# Impr3Decible - E-commerce de Impresión 3D

Una aplicación completa de e-commerce desarrollada con React, Vite, Tailwind CSS y React Router. Diseñada para un servicio de impresión 3D con funcionalidad completa de carrito de compras, tema claro/oscuro, y gestión de productos.

## 🚀 Características

- ✅ **E-commerce completo** - Catálogo de productos, detalle de producto, carrito de compras y checkout
- 🎨 **Tema claro/oscuro** - Cambio dinámico entre temas con persistencia en localStorage
- 🛒 **Carrito de compras funcional** - Añadir, eliminar, actualizar cantidades con persistencia
- 🎯 **Enrutamiento dinámico** - Navegación fluida con React Router DOM
- 📱 **Diseño responsive** - Optimizado para móviles, tablets y escritorio
- 🎭 **Componentes reutilizables** - Arquitectura modular y escalable
- 💾 **Estado persistente** - Carrito y tema guardados en localStorage
- 🎨 **UI moderna** - Diseño basado en los mockups originales con Tailwind CSS
- 📦 **Gestión de productos** - Sistema de categorías, filtros y búsqueda

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## 🛠️ Instalación

1. **Navega al directorio del proyecto:**
   ```bash
   cd impr3decible-ecommerce
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

## 🚀 Ejecución

### Modo Desarrollo
```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

### Build de Producción
```bash
npm run build
```

### Vista Previa del Build
```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
impr3decible-ecommerce/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.jsx       # Cabecera con navegación y carrito
│   │   ├── Footer.jsx       # Pie de página
│   │   └── ProductCard.jsx  # Tarjeta de producto
│   ├── context/             # Contextos de React
│   │   ├── ThemeContext.jsx # Gestión del tema claro/oscuro
│   │   └── CartContext.jsx  # Gestión del carrito de compras
│   ├── data/                # Datos de la aplicación
│   │   └── products.js      # Catálogo de productos
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Home.jsx         # Página principal
│   │   ├── Products.jsx     # Catálogo de productos
│   │   ├── ProductDetail.jsx# Detalle de producto
│   │   ├── Cart.jsx         # Carrito de compras
│   │   ├── Checkout.jsx     # Proceso de checkout
│   │   └── Quote.jsx        # Formulario de cotización
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── public/                  # Archivos estáticos
├── index.html               # HTML principal
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind CSS
└── postcss.config.js        # Configuración de PostCSS
```

## 🎨 Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Tailwind CSS** - Framework de CSS
- **Context API** - Gestión de estado global
- **Material Symbols** - Iconos
- **Google Fonts** - Tipografías (Work Sans, Roboto Mono)

## 🔧 Funcionalidades Principales

### 1. Sistema de Temas
- Cambio entre tema claro y oscuro
- Persistencia en localStorage
- Transiciones suaves entre temas

### 2. Carrito de Compras
- Añadir productos con opciones (material, color)
- Actualizar cantidades
- Eliminar productos
- Cálculo automático del total
- Persistencia en localStorage

### 3. Catálogo de Productos
- Filtrado por categorías
- Búsqueda por nombre/descripción
- Ordenamiento (precio, nombre)
- Vista detallada de cada producto

### 4. Proceso de Compra
- Formulario de checkout completo
- Validación de datos
- Resumen del pedido
- Confirmación de compra

### 5. Formulario de Cotización
- Upload de archivos 3D
- Selección de materiales y acabados
- Envío de especificaciones

## 🎯 Rutas Disponibles

- `/` - Página principal
- `/productos` - Catálogo de productos
- `/producto/:id` - Detalle de producto
- `/carrito` - Carrito de compras
- `/checkout` - Proceso de checkout
- `/cotizar` - Formulario de cotización

## 🎨 Paleta de Colores

```javascript
{
  primary: "#f97316",           // Naranja (color principal)
  background-light: "#f8fafc",  // Gris claro
  background-dark: "#111827",   // Gris oscuro
  surface-light: "#ffffff",     // Blanco
  surface-dark: "#1f2937",      // Gris oscuro medio
  text-light: "#18181b",        // Texto oscuro
  text-dark: "#f8fafc",         // Texto claro
}
```

## 📝 Personalización

### Agregar Productos
Edita el archivo `src/data/products.js` para agregar, modificar o eliminar productos:

```javascript
{
  id: 1,
  name: "Nombre del Producto",
  description: "Descripción corta",
  longDescription: "Descripción detallada",
  price: 24.99,
  image: "URL_de_la_imagen",
  category: "Categoría",
  material: ["PLA", "ABS"],
  colors: ["Negro", "Blanco"],
  rating: 4.5,
  reviews: 34
}
```

### Modificar Estilos
Los estilos están configurados en `tailwind.config.js`. Puedes personalizar:
- Colores
- Fuentes
- Espaciados
- Bordes
- Y más...

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Sube la carpeta 'dist' a Netlify
```

### GitHub Pages
```bash
npm run build
# Configura GitHub Pages para usar la carpeta 'dist'
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto fue creado como ejemplo educativo.

## 👥 Autor

Desarrollado basándose en los diseños originales de Impr3Decible.

## 📧 Contacto

Para más información sobre el proyecto, puedes contactar a través de:
- Email: contacto@impr3decible.com
- Teléfono: +34 000 000 000

---

**¡Gracias por usar Impr3Decible E-commerce!** 🎉

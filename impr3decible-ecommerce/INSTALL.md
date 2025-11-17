# Guía de Instalación Rápida - Impr3Decible E-commerce

## Instalación Automática (Recomendada)

### Opción 1: Usando un solo comando

```bash
cd impr3decible-ecommerce && npm install && npm run dev
```

### Opción 2: Paso a paso

1. **Navega al directorio:**
   ```bash
   cd impr3decible-ecommerce
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador:**
   La aplicación se abrirá automáticamente en `http://localhost:3000`

## Verificación de Instalación

Si todo está instalado correctamente, deberías ver:

```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h to show help
```

## Problemas Comunes

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Puerto 3000 ocupado
Edita `vite.config.js` y cambia el puerto:
```javascript
server: {
  port: 3001, // Cambia a otro puerto
  open: true
}
```

### Error: Tailwind CSS no funciona
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea el build de producción
- `npm run preview` - Vista previa del build
- `npm run lint` - Ejecuta el linter

## Siguiente Paso

Una vez instalado, revisa el [README.md](README.md) para conocer todas las funcionalidades y cómo personalizar la aplicación.

¡Disfruta desarrollando con Impr3Decible! 🚀

# tldraw-app - Visualizador Interactivo de Esquemas

Aplicación React que integra tldraw para visualizar esquemas organizacionales del proyecto Arcadia de manera interactiva.

## 🎯 Propósito

Esta aplicación permite mostrar diagramas tldraw (`.tldr`) directamente en páginas de GitHub Pages sin necesidad de herramientas externas.

## 🏗️ Stack

- **React 19.2.0** - Framework UI
- **tldraw 4.1.2** - Biblioteca de diagramas interactivos
- **Vite 7.1.12** - Build tool y dev server

## 📦 Instalación

```bash
npm install
```

## 🚀 Comandos

```bash
# Desarrollo local con hot reload
npm run dev

# Build para producción (output a ../docs/assets/tldraw-app/)
npm run build

# Preview del build
npm run preview
```

## 🔧 Configuración

### vite.config.js

```javascript
export default defineConfig({
  base: '/assets/tldraw-app/',          // Base URL para GitHub Pages
  build: {
    outDir: '../docs/assets/tldraw-app', // Output directory
    emptyOutDir: true,
  }
})
```

## 📁 Estructura

```
tldraw-app/
├── src/
│   ├── App.jsx       # Componente principal con tldraw
│   ├── main.jsx      # Entry point
│   └── index.css     # Estilos
├── index.html        # Template HTML
├── vite.config.js    # Configuración Vite
└── package.json      # Dependencias
```

## 🎨 Uso

### Cargar un Esquema

La aplicación intenta cargar automáticamente desde múltiples rutas:

1. `/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr` (GitHub Pages)
2. `/reformatorio-schema.tldr` (Dev local)
3. Ruta absoluta como fallback

### Desarrollo Local

```bash
# 1. Copiar el archivo .tldr al directorio public (crear si no existe)
mkdir -p public
cp ../docs/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr public/

# 2. Iniciar dev server
npm run dev

# 3. Abrir http://localhost:5173
```

### Build para Producción

```bash
# Build genera archivos en ../docs/assets/tldraw-app/
npm run build

# Los archivos están listos para GitHub Pages
ls -la ../docs/assets/tldraw-app/
```

## 🔄 Actualizar Esquemas

### Solo actualizar el archivo .tldr (más común)

```bash
# Editar en tldraw.com, descargar, y reemplazar
cp ~/Downloads/nuevo-schema.tldr ../docs/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr

# Commit
git add ../docs/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr
git commit -m "Actualizar esquema"
git push
```

La aplicación React cargará automáticamente el nuevo esquema.

### Cambios en la aplicación React

```bash
# Editar src/App.jsx u otros archivos
# Build de nuevo
npm run build

# Commit los archivos compilados
git add ../docs/assets/tldraw-app/
git commit -m "Actualizar UI de tldraw"
git push
```

## 🌐 Integración en Jekyll

En cualquier página Markdown de Jekyll:

```html
<iframe
  src="{{ site.baseurl }}/assets/tldraw-app/index.html"
  style="width: 100%; height: 800px;"
  title="Diagrama Interactivo"
></iframe>
```

## 📊 Build Metrics

- **JavaScript Bundle**: ~1.7 MB (533 KB gzipped)
- **CSS Bundle**: ~79 KB (15 KB gzipped)
- **HTML**: ~720 bytes
- **Build Time**: ~3 segundos

## 🐛 Troubleshooting

### Error: Cannot find module 'tldraw'

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: CORS al cargar .tldr

Asegúrate de que:
1. El archivo `.tldr` está en la ruta correcta
2. GitHub Pages está sirviendo el archivo (puede tardar 2-3 minutos después de push)
3. La ruta en `App.jsx` coincide con la estructura de carpetas

### Build falla con error de memoria

```bash
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

## 🔮 Mejoras Futuras

- [ ] Modo read-only para reducir bundle size
- [ ] Múltiples esquemas cargables desde dropdown
- [ ] Export a PNG/SVG desde la UI
- [ ] Integración con GitHub API para guardar cambios
- [ ] Colaboración en tiempo real con websockets

## 📝 Changelog

### 1.0.0 - 1 Nov 2025
- Implementación inicial
- Carga automática de reformatorio-schema.tldr
- Build optimizado para GitHub Pages
- Estados de loading y error

## 📄 Licencia

Parte del proyecto Arcadia. Ver LICENSE en el directorio raíz.

## 🔗 Enlaces

- [Documentación tldraw](https://tldraw.dev/)
- [Documentación Vite](https://vitejs.dev/)
- [Proyecto Arcadia](https://arcadia.ludobermejo.es/)

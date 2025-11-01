---
layout: page
title: "Diagrama Interactivo - Documentación Técnica"
permalink: /campaigns/aun-sin-nombre/reformatorio/INTERACTIVE/
---

# 🎨 Diagrama Interactivo del Reformatorio - Documentación Técnica

[← Volver al Esquema](index.html)

---

## ✅ Implementación Completa

El esquema visual del Reformatorio Nueva Esperanza ahora está completamente integrado como una **aplicación interactiva en la página web**, sin necesidad de descargar archivos o abrir herramientas externas.

### 🌐 URL en Vivo

**https://arcadia.ludobermejo.es/campaigns/aun-sin-nombre/reformatorio/**

La página ahora incluye un iframe con tldraw que carga automáticamente el esquema completo y permite:
- ✅ Navegación con arrastrar y soltar
- ✅ Zoom con la rueda del ratón
- ✅ Selección y edición de elementos
- ✅ Visualización completa de relaciones y conexiones
- ✅ Acceso a notas y detalles

---

## 🏗️ Arquitectura Técnica

### Estructura de Archivos

```
arcadia/
├── tldraw-app/                          # Aplicación React source
│   ├── src/
│   │   ├── App.jsx                      # Componente principal con tldraw
│   │   ├── main.jsx                     # Entry point React
│   │   └── index.css                    # Estilos globales
│   ├── index.html                       # HTML template
│   ├── vite.config.js                   # Configuración Vite
│   ├── package.json                     # Dependencias npm
│   └── .gitignore                       # Excluir node_modules
│
├── docs/
│   ├── assets/
│   │   └── tldraw-app/                  # Build de producción (GitHub Pages)
│   │       ├── index.html               # HTML compilado (720 bytes)
│   │       └── assets/
│   │           ├── index-BN7jaIzn.js    # JavaScript bundle (1.7 MB)
│   │           └── index-bv2czr5q.css   # CSS bundle (79 KB)
│   │
│   └── campaigns/aun-sin-nombre/reformatorio/
│       ├── index.md                     # Página Jekyll con iframe
│       ├── reformatorio-schema.tldr     # Datos del esquema (29 KB)
│       ├── README.md                    # Guía de uso
│       ├── SETUP.md                     # Documentación setup inicial
│       └── INTERACTIVE.md               # Este archivo
```

### Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.2.0 | Framework UI |
| **tldraw** | 4.1.2 | Biblioteca de diagramas interactivos |
| **Vite** | 7.1.12 | Build tool y dev server |
| **Jekyll** | (GitHub Pages) | Generador de sitio estático |

---

## 🔧 Componente Principal (App.jsx)

### Funcionalidad Clave

El componente React implementa:

1. **Carga Automática del Esquema**
   - Intenta múltiples rutas para compatibilidad dev/prod
   - Manejo de errores con UI amigable
   - Loading state con spinner visual

2. **Integración tldraw**
   - Carga el snapshot del esquema JSON
   - Auto-zoom al contenido al montar
   - Edición habilitada para exploración

3. **Estados de UI**
   - **Loading**: Spinner mientras carga
   - **Error**: Mensaje de error con botón de recarga
   - **Success**: Canvas tldraw interactivo

### Código Simplificado

```jsx
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

export default function App() {
  const [snapshot, setSnapshot] = useState(null)

  useEffect(() => {
    fetch('/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr')
      .then(res => res.json())
      .then(data => setSnapshot(data))
  }, [])

  return (
    <Tldraw
      snapshot={snapshot}
      onMount={(editor) => {
        editor.zoomToFit({ animation: { duration: 400 } })
      }}
    />
  )
}
```

---

## 🚀 Build y Deployment

### Proceso de Build

```bash
cd tldraw-app
npm run build
```

**Resultado:**
- Genera archivos estáticos en `docs/assets/tldraw-app/`
- Optimizado para producción (minificado, tree-shaking)
- Listo para servir vía GitHub Pages

### Integración en Jekyll

La página `reformatorio/index.md` incluye el iframe:

```html
<iframe
  src="{{ site.baseurl }}/assets/tldraw-app/index.html"
  style="width: 100%; height: 800px; border: 2px solid #ddd; border-radius: 8px;"
  title="Esquema Visual del Reformatorio Nueva Esperanza"
  frameborder="0"
  allow="clipboard-read; clipboard-write"
></iframe>
```

### GitHub Pages Workflow

1. **Push a main** → GitHub Actions build automático
2. **Jekyll procesa** markdown y liquid templates
3. **Sirve estáticos** incluyendo `/assets/tldraw-app/`
4. **iframe carga** la aplicación React
5. **React fetch** el archivo `.tldr` del mismo dominio

---

## 🎮 Uso y Controles

### Navegación

| Acción | Control |
|--------|---------|
| **Mover vista** | Click + arrastrar en espacio vacío |
| **Zoom in/out** | Rueda del ratón |
| **Seleccionar** | Click en elemento |
| **Pan rápido** | Mantener espacio + arrastrar |
| **Resetear vista** | Botón "Zoom to fit" en toolbar |

### Edición (Habilitada)

Los usuarios pueden:
- ✏️ Editar texto de shapes
- 🎨 Cambiar colores y estilos
- ➕ Añadir nuevas shapes y flechas
- 🔗 Crear conexiones

**Nota:** Los cambios no se guardan automáticamente (solo en sesión del navegador).

---

## 🔄 Actualización del Esquema

### Método 1: Rebuild de React App (Para cambios en la UI)

```bash
cd tldraw-app
npm run dev          # Para desarrollo local
# Hacer cambios en src/App.jsx
npm run build        # Build a producción
git add docs/assets/tldraw-app/
git commit -m "Actualizar UI de tldraw"
git push
```

### Método 2: Actualizar Solo el Esquema (Más Común)

```bash
# 1. Descargar el archivo actual
curl -O https://arcadia.ludobermejo.es/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr

# 2. Abrir en tldraw.com y editar
open https://www.tldraw.com/

# 3. Descargar el archivo editado

# 4. Reemplazar en el repositorio
cp ~/Downloads/reformatorio-schema.tldr docs/campaigns/aun-sin-nombre/reformatorio/

# 5. Commit y push
git add docs/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr
git commit -m "Actualizar esquema del reformatorio"
git push
```

**Resultado:** La aplicación React cargará automáticamente el nuevo esquema sin necesidad de rebuild.

---

## 🐛 Troubleshooting

### Problema: Iframe vacío o error de carga

**Causa:** CORS o ruta incorrecta al archivo `.tldr`

**Solución:**
1. Verificar que el archivo existe: `docs/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr`
2. Comprobar la consola del navegador para errores de fetch
3. Verificar que GitHub Pages está sirviendo el archivo correctamente

### Problema: Cambios no se reflejan después de push

**Causa:** Cache de GitHub Pages o del navegador

**Solución:**
1. Esperar 2-3 minutos para que GitHub Pages rebuild
2. Limpiar cache del navegador (Ctrl+Shift+R o Cmd+Shift+R)
3. Verificar en modo incógnito

### Problema: Bundle demasiado grande (1.7 MB)

**Causa:** tldraw incluye muchas funcionalidades

**Solución Futura (Opcional):**
```javascript
// Crear versión read-only más ligera
import { TldrawEditor } from 'tldraw'
// Usar solo el editor sin todos los tools
```

---

## 📊 Métricas del Build

| Métrica | Valor |
|---------|-------|
| **Total Build Size** | 1.81 MB |
| JavaScript Bundle | 1.73 MB (533 KB gzipped) |
| CSS Bundle | 79 KB (15 KB gzipped) |
| HTML | 720 bytes |
| **Build Time** | ~3 segundos |
| **Módulos Transformados** | 1011 |

---

## 🔮 Mejoras Futuras Opcionales

### 1. Persistencia de Ediciones

Implementar save automático con GitHub API:

```jsx
async function saveToGitHub(snapshot) {
  const token = process.env.GITHUB_TOKEN
  // Create a commit via GitHub API
  await fetch('https://api.github.com/repos/...')
}
```

### 2. Colaboración en Tiempo Real

Integrar websockets para edición colaborativa:

```jsx
import { useSync } from '@tldraw/sync'

const store = useSync({
  uri: 'wss://sync.tldraw.com'
})
```

### 3. Versión Read-Only Ligera

Crear variante sin herramientas de edición:

```jsx
<TldrawEditor
  snapshot={snapshot}
  components={{
    Toolbar: null,
    StylePanel: null,
  }}
/>
```

### 4. Export Automático a Imágenes

Añadir botón para export:

```jsx
function exportAsPNG() {
  const svg = editor.getSvg()
  // Convert to PNG and download
}
```

---

## 🔗 Referencias Útiles

- **tldraw Docs**: [tldraw.dev](https://tldraw.dev/)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev/)
- **React Docs**: [react.dev](https://react.dev/)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)

### Enlaces Internos

- [Esquema Interactivo](index.html) - Ver el diagrama en acción
- [Guía de Uso](README.html) - Instrucciones completas
- [Setup Inicial](SETUP.html) - Documentación de instalación
- [Campaña](../index.html) - Volver a Reformatorio Nueva Esperanza

---

## 📝 Changelog

### 1 de noviembre de 2025
- ✅ Implementación inicial de React app con tldraw
- ✅ Build de producción a `/docs/assets/tldraw-app/`
- ✅ Integración en página Jekyll con iframe
- ✅ Carga automática del esquema `reformatorio-schema.tldr`
- ✅ Estados de loading y error
- ✅ Auto-zoom al contenido

---

*El esquema del Reformatorio Nueva Esperanza ahora es completamente interactivo, permitiendo a los jugadores y DM explorar visualmente la compleja red de relaciones, personal e internos de Isla Albedo.*

**🎨 Hecho con tldraw, React y mucho ❤️**

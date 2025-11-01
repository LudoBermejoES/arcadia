# Setup del Esquema Visual - Reformatorio Nueva Esperanza

## ✅ Archivos Creados

### 📁 Estructura del Directorio
```
docs/campaigns/aun-sin-nombre/reformatorio/
├── index.md                      # Página principal del esquema visual
├── README.md                     # Guía detallada de uso
├── reformatorio-schema.tldr      # Archivo tldraw con el diagrama
└── SETUP.md                      # Este archivo
```

### 📄 Descripción de Archivos

#### `reformatorio-schema.tldr` (29 KB)
- **Formato**: JSON tldraw v2
- **Contenido**: Diagrama organizacional completo con 40+ shapes
- **Personajes incluidos**:
  - 1 Director (El Señor Nadie)
  - 6 Personal del reformatorio
  - 3 Protagonistas (Sergei, Tiritas, Kira)
  - 8+ Internos destacados
  - 2 Desaparecidos
  - 5 Internos adicionales
- **Relaciones**: 6 flechas conectando personajes clave
- **Notas**: Misterios e información general

#### `index.md` (10 KB)
- **Layout**: Jekyll page
- **Permalink**: `/campaigns/aun-sin-nombre/reformatorio/`
- **Contenido**:
  - Instrucciones para visualizar el diagrama en tldraw.com
  - Listado completo de personajes con cards visuales HTML/CSS
  - Sección de relaciones documentadas
  - Sección de misterios
  - Enlaces de descarga del archivo `.tldr`
  - Enlaces a páginas relacionadas

#### `README.md` (5 KB)
- **Layout**: Jekyll page
- **Permalink**: `/campaigns/aun-sin-nombre/reformatorio/README/`
- **Contenido**:
  - Descripción del archivo tldraw
  - Listado completo del contenido del esquema
  - 3 opciones para ver/editar el diagrama
  - Código de colores explicado
  - Instrucciones de actualización
  - Referencias y enlaces

## 🌐 URLs del Sitio GitHub Pages

Cuando el sitio se despliegue, las páginas estarán disponibles en:

- **Esquema Principal**: `https://arcadia.ludobermejo.es/campaigns/aun-sin-nombre/reformatorio/`
- **Guía Detallada**: `https://arcadia.ludobermejo.es/campaigns/aun-sin-nombre/reformatorio/README/`
- **Descarga TLDR**: `https://arcadia.ludobermejo.es/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr`

## 📥 Cómo Usar el Esquema

### Opción 1: Visualizar en tldraw.com (Recomendado)

1. Ve a la página del esquema: `/campaigns/aun-sin-nombre/reformatorio/`
2. Haz clic en "Descargar reformatorio-schema.tldr"
3. Ve a [tldraw.com](https://www.tldraw.com/)
4. Menú (☰) → File → Open
5. Selecciona el archivo descargado
6. ¡Explora el diagrama!

### Opción 2: Descarga Directa

```bash
# Desde el navegador
https://arcadia.ludobermejo.es/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr

# Desde línea de comandos
curl -O https://arcadia.ludobermejo.es/campaigns/aun-sin-nombre/reformatorio/reformatorio-schema.tldr
```

### Opción 3: Ver en el Sitio (HTML estático)

La página `index.md` muestra todo el contenido del diagrama en formato HTML/CSS:
- Cards visuales para cada personaje
- Color-coding por rol
- Listado de relaciones
- Misterios documentados

## 🔄 Futuras Mejoras Opcionales

### Integración React con tldraw (Avanzado)

Para mostrar el diagrama interactivo directamente en la página:

1. **Crear aplicación React** con tldraw
   ```bash
   cd /path/to/arcadia
   npx create-react-app tldraw-viewer
   cd tldraw-viewer
   npm install tldraw
   ```

2. **Crear componente** que cargue `reformatorio-schema.tldr`
   ```jsx
   import { Tldraw } from 'tldraw'
   import 'tldraw/tldraw.css'

   export default function ReformatorioViewer() {
     return <Tldraw
       snapshot={reformatorioSchema}
       readOnly={false}
     />
   }
   ```

3. **Build y deploy** a `/docs/assets/app/tldraw-viewer/`
   ```bash
   npm run build
   cp -r build/* /docs/assets/app/tldraw-viewer/
   ```

4. **Integrar en Jekyll** usando iframe o script tag

Para más detalles, ver `/how_to_draw_tldraw.md`.

## 🎨 Código de Colores

El diagrama usa estos colores para identificar roles:

| Color | Significado | Personajes |
|-------|------------|------------|
| 🔴 Rojo | Autoridad/Peligro | Director, Desaparecidos |
| 🔵 Azul | Personal | Staff del reformatorio |
| 🟢 Verde | Protagonistas | Sergei, Tiritas, Kira |
| 🟠 Naranja | Internos | Tomás, Yuki, Al, etc. |
| 🟣 Violeta | Personal Clave | Elena "Frutas del Bosque" |
| ⚫ Gris | Otros/Info | Información general |
| 🟡 Amarillo | Relaciones | Conexiones especiales |

## 📝 Actualizar el Esquema

Cuando haya nuevos personajes o relaciones:

### Método 1: Visual (Recomendado)
1. Descarga `reformatorio-schema.tldr`
2. Abre en tldraw.com
3. Edita (añadir shapes, flechas, notas)
4. Descarga el archivo actualizado
5. Reemplaza en `docs/campaigns/aun-sin-nombre/reformatorio/`

### Método 2: Programático
```javascript
const fs = require('fs')

// Leer archivo
const schema = JSON.parse(
  fs.readFileSync('reformatorio-schema.tldr', 'utf8')
)

// Añadir nuevo personaje
schema.document.store['shape:nuevo-personaje'] = {
  x: 1400,
  y: 600,
  rotation: 0,
  isLocked: false,
  opacity: 1,
  meta: {},
  id: 'shape:nuevo-personaje',
  type: 'geo',
  props: {
    w: 220,
    h: 80,
    geo: 'rectangle',
    color: 'orange',
    labelColor: 'black',
    fill: 'semi',
    dash: 'draw',
    size: 's',
    font: 'sans',
    text: '👤 NUEVO PERSONAJE\nDescripción',
    align: 'middle',
    verticalAlign: 'middle',
    growY: 0,
    url: ''
  },
  parentId: 'page:page1',
  index: 'a40',
  typeName: 'shape'
}

// Guardar
fs.writeFileSync(
  'reformatorio-schema.tldr',
  JSON.stringify(schema, null, 2)
)
```

## 🔗 Enlaces Útiles

- **Campaña**: [Reformatorio Nueva Esperanza](../index.md)
- **Personajes**: [Galería](../../../characters/gallery.md)
- **tldraw**: [Documentación oficial](https://tldraw.dev/)
- **Guía Arcadia tldraw**: [how_to_draw_tldraw.md](/how_to_draw_tldraw.md)

## ✅ Checklist de Deployment

- [x] Archivo `.tldr` creado con todos los personajes
- [x] Página `index.md` con Jekyll front matter
- [x] Página `README.md` con guía completa
- [x] Enlaces en el índice de la campaña
- [x] Permalinks configurados correctamente
- [x] Assets accesibles para descarga
- [ ] (Opcional) Integración React para visualización interactiva
- [ ] (Opcional) GitHub Actions para validación automática del JSON

## 🚀 Próximos Pasos

1. **Commit y push** los cambios al repositorio
2. **Verificar deployment** en GitHub Pages
3. **Probar descarga** del archivo `.tldr`
4. **Abrir en tldraw.com** para verificar que carga correctamente
5. **Compartir con jugadores** para feedback

---

*Documentación creada: 1 de noviembre de 2025*
*Autor: Claude Code*

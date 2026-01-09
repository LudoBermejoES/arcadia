# Guía para Detectar y Corregir Enlaces Rotos

Este documento describe cómo encontrar enlaces rotos en el proyecto ArcadiaPage y las estrategias para corregirlos.

---

## 🔍 Cómo Detectar Enlaces Rotos

### Herramienta Recomendada: `linkinator`

```bash
# Verificar enlaces en el sitio desplegado
npx linkinator https://arcadia.ludobermejo.es --recurse --skip "youtube|gemini|google|github.com" --verbosity error

# Guardar resultados en archivo
npx linkinator https://arcadia.ludobermejo.es --recurse --skip "youtube|gemini|google|github.com" --verbosity error 2>&1 | sort -u > broken-links-report.txt
```

**Ventajas:**
- No requiere instalación permanente (`npx` lo descarga bajo demanda)
- Analiza el sitio compilado (HTML final, no markdown)
- Detecta 404s reales, imágenes faltantes, enlaces mal formados

### Interpretación de Resultados

| Código | Significado |
|--------|-------------|
| `[404]` | Página no encontrada - enlace roto |
| `[0]` | Error de conexión/timeout - puede ser temporal o problema de DNS |
| `[503]` | Servidor no disponible temporalmente |

---

## 🔎 Cómo Buscar si un Archivo Existe en Otra Ubicación

### 1. Buscar por nombre (case-insensitive)

```bash
# En Windows/Git Bash
ls -la docs/assets/img/characters/ | grep -i nombrearchivo

# Ejemplo: buscar "bailarina" ignorando mayúsculas
ls -la docs/assets/img/characters/ | grep -i bailarina
```

### 2. Buscar con Glob patterns

```bash
# Buscar en todo el proyecto
# Desde Claude Code usar: Glob con pattern "docs/**/*nombrearchivo*"
```

### 3. Verificar permalink en archivos markdown

```bash
# Ver las primeras líneas del archivo para encontrar el permalink
head -10 docs/characters/details/nombre-archivo.md
```

---

## �� Tipos Comunes de Enlaces Rotos y Soluciones

### 1. **Case Sensitivity en Imágenes**

GitHub Pages (Linux) distingue mayúsculas/minúsculas.

| URL Rota | Archivo Real | Solución |
|----------|--------------|----------|
| `jruschov.png` | `Jruschov.png` | Corregir mayúscula en referencia |
| `los-rayos.png` | `los_rayos.png` | Cambiar guión por guión bajo |

### 2. **Personajes con Slug Diferente**

| URL Rota | Archivo/Permalink Real | Solución |
|----------|------------------------|----------|
| `/characters/details/el-cacharrero/` | `/characters/details/cacharrero/` | Quitar "el-" |
| `/characters/details/la-sombra/` | `/characters/details/la-nueva-sombra/` | Añadir "-nueva" |
| `/characters/details/lucifer/` | `/characters/details/lucifer-hero/` | Añadir "-hero" |

### 3. **Grupos en Ruta Incorrecta**

| URL Rota | Corrección |
|----------|------------|
| `/organizations/cazacapas/` | `/groups/caza-capas/` |
| `/groups/telarana/` | `/characters/details/telarana/` (es personaje, no grupo) |

### 4. **World-Building sin Subcarpetas en Permalink**

Los archivos están en subcarpetas pero los permalinks no las incluyen:

| URL Rota | Permalink Correcto |
|----------|-------------------|
| `/world-building/history/history-overview/` | `/world-building/history-overview/` |
| `/world-building/geography/distrito-clasico/` | `/world-building/distrito-clasico/` |
| `/world-building/economy/arcadia-economy/` | `/world-building/arcadia-economy/` |

### 5. **Extensiones Incorrectas**

| URL Rota | Corrección |
|----------|------------|
| `/characters/gallery.html` | `/characters/gallery/` |

### 6. **Sesiones sin Fecha**

En `all-content.md` los enlaces usan `/session-XX/` pero los archivos tienen fecha:

| URL Rota | Corrección |
|----------|------------|
| `/manual-notes/session-01/` | `/manual-notes/session-01-2024-03-24/` |

---

## 🛠️ Proceso de Corrección

### Paso 1: Identificar el archivo origen del enlace roto

```bash
# Buscar dónde se usa el enlace roto
grep -r "texto-del-enlace-roto" docs/
```

### Paso 2: Verificar si el destino existe con otro nombre

```bash
# Buscar archivos similares
ls -la docs/characters/details/ | grep -i parte-del-nombre
ls -la docs/groups/ | grep -i parte-del-nombre
ls -la docs/assets/img/characters/ | grep -i parte-del-nombre
```

### Paso 3: Verificar el permalink real

```bash
head -10 docs/ruta/al/archivo.md
```

### Paso 4: Corregir el enlace en el archivo origen

Editar el archivo markdown para usar la URL correcta.

---

## 📊 Análisis Enero 2026

### Archivos que EXISTEN pero con ruta/nombre diferente:

| Categoría | Cantidad | Acción |
|-----------|----------|--------|
| Imágenes case-sensitive | 2 | Corregir mayúsculas en referencias |
| Personajes slug diferente | 3 | Actualizar enlaces |
| Grupos ruta incorrecta | 2 | Cambiar organizations→groups o groups→characters |
| World-building sin subcarpeta | ~10 | Quitar subcarpeta del permalink en enlaces |
| Galería extensión | 5 | Cambiar .html por / |

### Archivos que NO EXISTEN (requieren creación o eliminar enlace):

| Tipo | Ejemplos |
|------|----------|
| Imágenes | `Elena_Ortiz.png`, `Sofia_Vega.png`, `generic.png` |
| Grupos | `humanitas.md` |
| Distritos | `distrito-solis.md`, `distrito-lunae.md` |

### Errores [0] que son falsos positivos:

Los siguientes archivos existen y tienen permalinks correctos, pero linkinator reportó error de conexión:
- `/characters/details/ana-flores/`
- `/characters/details/el-golem/`
- `/characters/details/el-guardian/`
- `/characters/details/natacha/`
- `/characters/details/yeng/`
- Y otros ~10 más

---

## 🔄 Mantenimiento Preventivo

1. **Antes de crear enlaces**: Verificar que el permalink del destino coincida
2. **Al renombrar archivos**: Buscar y actualizar todas las referencias
3. **Ejecutar linkinator**: Periódicamente después de cambios grandes
4. **Case sensitivity**: Siempre verificar mayúsculas en nombres de imagen

---

## 📝 Comandos Útiles

```bash
# Contar enlaces rotos únicos
cat broken-links-report.txt | grep "\[404\]" | sort -u | wc -l

# Buscar todas las referencias a un enlace específico
grep -rn "texto-buscar" docs/

# Listar todos los permalinks de personajes
grep -h "permalink:" docs/characters/details/*.md | sort

# Verificar imágenes existentes
ls docs/assets/img/characters/ | sort
```

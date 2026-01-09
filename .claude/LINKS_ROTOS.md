# Guía para Detectar y Corregir Enlaces Rotos

Este documento describe cómo encontrar enlaces rotos en el proyecto ArcadiaPage, categoriza los tipos de errores comunes, y proporciona estrategias para corregirlos.

**Última actualización**: 9 Enero 2026
**Enlaces rotos únicos**: ~100 (tras correcciones de puntos 4, 5, 6, 7 y 9)

---

## Metodología de Detección

### Herramienta Principal: `linkinator`

```bash
# Verificar enlaces en el sitio desplegado
npx linkinator https://arcadia.ludobermejo.es --recurse --skip "youtube|gemini|google|github.com" --verbosity error

# Guardar resultados únicos en archivo
npx linkinator https://arcadia.ludobermejo.es --recurse --skip "youtube|gemini|google|github.com" --verbosity error 2>&1 | grep "\[404\]" | sort -u > broken-links-report.txt

# Contar enlaces rotos únicos
wc -l broken-links-report.txt
```

**Interpretación de códigos:**
| Código | Significado | Acción |
|--------|-------------|--------|
| `[404]` | Página no encontrada | Corregir enlace o crear archivo |
| `[0]` | Error de conexión | Verificar si es temporal o archivo real |
| `[503]` | Servidor no disponible | Reintentar más tarde |

---

## Categorías de Enlaces Rotos (Enero 2026)

### 1. IMÁGENES FALTANTES (5 archivos)

Imágenes referenciadas pero que no existen en `/docs/assets/img/characters/`:

| Imagen | Estado | Acción Recomendada |
|--------|--------|-------------------|
| `Elena_Ortiz.png` | No existe | Crear imagen o eliminar referencia |
| `Sofia_Vega.png` | No existe | Crear imagen o eliminar referencia |
| `Marina_Volkova.png` | No existe | Crear imagen o eliminar referencia |
| `generic.png` | No existe | Crear placeholder o eliminar referencia |
| `natacha.jpg` | No existe | Verificar si existe como .png |

**Buscar dónde se usan:**
```bash
grep -rn "Elena_Ortiz.png\|Sofia_Vega.png\|Marina_Volkova.png\|generic.png\|natacha.jpg" docs/
```

---

### 2. ENLACES RELATIVOS MAL FORMADOS (Muchos)

Enlaces que usan rutas relativas `.md` en lugar de permalinks:

| Patrón Incorrecto | Corrección |
|-------------------|------------|
| `la-caceria-salvaje.md` | `/groups/la-caceria-salvaje/` |
| `fatum.md` | `/groups/fatum/` |
| `La Familia.md` | `/groups/la-familia/` |
| `session-XX.md` | Usar permalink de la sesión |

**Problema**: Los enlaces relativos como `[texto](archivo.md)` no funcionan en Jekyll porque los permalinks transforman las URLs.

**Buscar este patrón:**
```bash
grep -rn "](.*\.md)" docs/ | grep -v "^Binary"
```

---

### 3. SESIONES CON FORMATO INCORRECTO (~40 enlaces)

Las sesiones de La Fuerza Oculta tienen fechas en sus permalinks pero se enlazan sin ellas:

| URL Incorrecta | Posible Permalink Real |
|----------------|----------------------|
| `/manual-notes/session-01/` | `/manual-notes/session-01-2024-03-24/` |
| `/manual-notes/session-25/` | `/manual-notes/session-25-2024-XX-XX/` |

**Verificar permalinks reales:**
```bash
grep -h "permalink:" docs/campaigns/la-fuerza-oculta/manual-notes/*.md | sort
```

---

### 4. RUTAS DE PERSONAJES ANIDADAS INCORRECTAS (~15 enlaces)

Rutas que incluyen subdirectorios inexistentes:

| URL Incorrecta | Corrección |
|----------------|------------|
| `/characters/details/estocada/la-caceria-salvaje.md` | `/characters/details/estocada/` |
| `/characters/details/vista/la-caceria-salvaje.md` | `/characters/details/vista/` |
| `/characters/details/caos/pantomima/` | `/characters/details/pantomima/` |
| `/characters/details/sombrio/caos/` | `/characters/details/caos/` |

**Problema**: Se están usando rutas anidadas que no existen en la estructura del proyecto.

**CORREGIDO (2026-01-09)**:
- `/characters/pensamientos/diana/` - Añadido frontmatter con permalink correcto

---

### 5. GRUPOS/ORGANIZACIONES FALTANTES (~6 enlaces)

| URL | Estado | Acción |
|-----|--------|--------|
| `/characters/groups/ultracorps/` | Ruta incorrecta | Debe ser `/groups/ultracorps/` |
| `/characters/groups/fatum/` | Ruta incorrecta | Debe ser `/groups/fatum/` |
| `/campaigns/fatum/` | No existe | Verificar si hay contenido |

**CORREGIDO (2026-01-09)**:
- `/groups/humanitas/` - Creado archivo humanitas.md
- `/groups/telarana/` - Corregido a `/characters/details/telarana/` (Telaraña es personaje, no grupo)

---

### 6. WORLD-BUILDING CON RUTAS INCORRECTAS (~12 enlaces)

| URL Incorrecta | Verificar Si Existe |
|----------------|---------------------|
| `/world-building/ambientacion/geography/...` | Rutas anidadas inexistentes |

**CORREGIDO (2026-01-09)**:

- `/world-building/04-metahumanidad-desatada/` → `/world-building/04-last-twenty-years/`
- `/world-building/07-last-twenty-years/` → `/world-building/04-last-twenty-years/`
- `/world-building/society/arcadia-society/` → `/world-building/arcadia-society/`
- `/world-building/geography/distrito-solis/` → `/world-building/geography/residential-districts/`
- `/world-building/geography/distrito-lunae/` → `/world-building/geography/residential-districts/`
- `/world-building/geography/distrito-clasico/` → `/world-building/distrito-clasico/`
- `ambientacion.md` → `/world-building/ambientacion/` (3 archivos corregidos)

---

### 7. ÍNDICES Y RESÚMENES FALTANTES (~8 enlaces)

| URL | Estado |
|-----|--------|
| `/campaigns/la-fuerza-oculta/themes/` | No existe |
| `/all-content/campaigns/` | Ruta incorrecta |
| `/all-content/world-building/` | Ruta incorrecta |
| `/campaigns/campaigns/` | Ruta duplicada |

**CORREGIDO (2026-01-09)**:

- `/campaigns/la-familia/summary/` - Corregido permalink (era `/summary/summary/`)
- `/campaigns/la-fuerza-oculta/summary/` - Corregido permalink (era `/summary/summary/`)

---

### 8. CAPTURAS DE PANTALLA NO DESPLEGADAS (~25 imágenes)

Las capturas están en carpetas con nombres largos tipo Notion que no se despliegan correctamente:

```
/campaigns/la-fuerza-oculta/manual-notes/PARTIDA SUPERHÉROES XX .../Captura_de_pantalla_....png
```

**Problema**: Estas carpetas con caracteres especiales y espacios pueden no desplegarse correctamente en GitHub Pages.

**Solución**: Mover imágenes a `/docs/assets/img/sessions/` con nombres normalizados.

---

### 9. PERSONAJES ESPECÍFICOS FALTANTES (~5 enlaces)

| URL | Acción |
|-----|--------|
| (Todos corregidos - ver abajo) | |

**CORREGIDO (2026-01-09)**:

- `/characters/details/humanitas/` → `/groups/humanitas/` (Humanitas es organización)
- `/characters/details/lucifer-entidad/` → Eliminado enlace (no existe ficha de la entidad)
- `/characters/details/las-monjas-del-albergue/` → Eliminado enlace (sin ficha)
- `/characters/details/julian/` → Eliminado enlace (sin ficha)
- `/characters/details/dr-Hotman/` → `/characters/details/hotman/` (case-sensitivity)

---

## Proceso de Corrección Paso a Paso

### Paso 1: Identificar el archivo origen

```bash
# Buscar dónde se usa un enlace roto específico
grep -rn "texto-del-enlace" docs/
```

### Paso 2: Verificar si el destino existe

```bash
# Buscar archivos similares
ls -la docs/characters/details/ | grep -i "nombre"
ls -la docs/groups/ | grep -i "nombre"

# Ver el permalink real de un archivo
head -10 docs/ruta/archivo.md
```

### Paso 3: Determinar la corrección

1. **Si el archivo existe con otro nombre**: Actualizar el enlace
2. **Si el archivo no existe pero debería**: Crear el archivo
3. **Si el enlace es redundante**: Eliminar el enlace

### Paso 4: Aplicar corrección

```bash
# Usando Claude Code Edit tool o sed
# Ejemplo de corrección masiva:
grep -rl "texto-viejo" docs/ | xargs sed -i 's|texto-viejo|texto-nuevo|g'
```

---

## Priorización de Correcciones

### Alta Prioridad (Afectan navegación principal)
1. Enlaces en `index.md` de campañas
2. Enlaces en `character-list.md`
3. Enlaces en `all-content.md`
4. Enlaces entre personajes relacionados

### Media Prioridad (Afectan contenido secundario)
1. Enlaces en fichas de personajes
2. Enlaces en sesiones individuales
3. Enlaces de imágenes

### Baja Prioridad (Requieren creación de contenido)
1. ~~Distritos no documentados (Solis, Lunae)~~ - Corregido: enlazados a residential-districts
2. ~~Grupos sin ficha propia (Humanitas)~~ - Corregido: creado humanitas.md
3. ~~Resúmenes de campaña no creados~~ - Corregido: arreglados permalinks

---

## Correcciones Ya Aplicadas (Enero 2026)

| Fecha | Corrección | Archivos Afectados |
|-------|------------|-------------------|
| 2026-01-09 | `/organizations/cazacapas/` → `/groups/caza-capas/` | la-fuerza-oculta.md |
| 2026-01-09 | `/characters/details/el-cacharrero/` → `/characters/details/cacharrero/` | la-fuerza-oculta.md |
| 2026-01-09 | `/characters/gallery.html` → `/characters/gallery/` | 5 archivos |
| 2026-01-09 | Enlaces world-building sin subcarpetas | all-content.md |
| 2026-01-09 | `jruschov.png` → `Jruschov.png` | jruschov.md |
| 2026-01-09 | `los-rayos.png` → `los_rayos.png` | los-rayos.md |
| 2026-01-09 | `/characters/details/la-sombra/` → `/characters/details/sombrio/` | 4 archivos |
| 2026-01-09 | `/characters/details/lucifer/` → `/characters/details/lucifer-hero/` | character-groups.md |
| 2026-01-09 | URLs de sesiones con fechas en all-content.md | all-content.md (45 sesiones) |
| 2026-01-09 | Enlaces relativos `session-XX.md` → permalinks con fecha | 7 archivos de personajes |
| 2026-01-09 | Añadido frontmatter a `/characters/pensamientos/diana/` | diana.md (pensamientos) |
| 2026-01-09 | Creado `/groups/humanitas/` | humanitas.md (nuevo) |
| 2026-01-09 | `/groups/telarana/` → `/characters/details/telarana/` | 2 archivos |
| 2026-01-09 | `/world-building/04-metahumanidad-desatada/` → `/world-building/04-last-twenty-years/` | world-building/index.md |
| 2026-01-09 | `/world-building/07-last-twenty-years/` → `/world-building/04-last-twenty-years/` | 3 archivos |
| 2026-01-09 | `/world-building/society/arcadia-society/` → `/world-building/arcadia-society/` | 4 archivos personajes |
| 2026-01-09 | `/world-building/geography/distrito-clasico/` → `/world-building/distrito-clasico/` | eduardo-vaquerizo.md |
| 2026-01-09 | `/world-building/geography/distrito-solis/` → residential-districts | distrito-martis.md, distrito-iovis.md |
| 2026-01-09 | `/world-building/geography/distrito-lunae/` → residential-districts | distrito-martis.md |
| 2026-01-09 | `ambientacion.md` → `/world-building/ambientacion/` | ultracorps.md, hermes.md, telarana.md |
| 2026-01-09 | Corregido permalink `/campaigns/*/summary/summary/` → `/campaigns/*/summary/` | 2 archivos summary |
| 2026-01-09 | `/characters/details/humanitas/` → `/groups/humanitas/` | la-familia/index.md |
| 2026-01-09 | Eliminado enlace lucifer-entidad (sin ficha) | character-groups.md |
| 2026-01-09 | Eliminados enlaces julian, las-monjas-del-albergue (sin ficha) | character-list.md |
| 2026-01-09 | `/characters/details/dr-Hotman/` → `/characters/details/hotman/` | character-list.md |

---

## Comandos Útiles

```bash
# Ver todos los permalinks de personajes
grep -h "permalink:" docs/characters/details/*.md | sort

# Ver todos los permalinks de grupos
grep -h "permalink:" docs/groups/*.md | sort

# Verificar imágenes existentes
ls docs/assets/img/characters/ | sort

# Buscar referencias a un texto específico
grep -rn "texto" docs/ --include="*.md"

# Contar archivos de personajes
find docs/characters/details/ -name "*.md" | wc -l

# Ver estructura de carpetas
find docs/ -type d | head -50
```

---

## Notas Importantes

1. **Jekyll Permalinks**: Los archivos `.md` tienen permalinks definidos en el frontmatter que determinan su URL final. No asumir que la ruta del archivo = URL.

2. **Case Sensitivity**: GitHub Pages (Linux) distingue mayúsculas de minúsculas. `Archivo.png` ≠ `archivo.png`.

3. **Caracteres Especiales**: Evitar espacios y caracteres especiales en nombres de archivo. Usar guiones o guiones bajos.

4. **Enlaces Relativos vs Absolutos**: Preferir `{{ site.baseurl }}/ruta/` para enlaces internos en lugar de rutas relativas `.md`.

---

*Documento mantenido por Claude Code para el proyecto ArcadiaPage*

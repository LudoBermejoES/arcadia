# Guía para Detectar y Corregir Enlaces Rotos

Este documento describe cómo encontrar enlaces rotos en el proyecto ArcadiaPage, categoriza los tipos de errores comunes, y proporciona estrategias para corregirlos.

**Última actualización**: 9 Enero 2026
**Enlaces rotos únicos**: ~125 (tras escaneo con linkinator)

---

## Metodología de Detección

### Herramienta Principal: `linkinator`

```bash
# Verificar enlaces en el sitio desplegado
npx linkinator https://arcadia.ludobermejo.es --recurse --skip "youtube|gemini|google|github.com" --verbosity error

# Guardar resultados únicos en archivo
npx linkinator https://arcadia.ludobermejo.es --recurse --skip "youtube|gemini|google|github.com" --verbosity error 2>&1 | grep "\[404\]" | sort -u > broken-links-report.txt
```

---

## Categorías de Enlaces Rotos Actuales

### 1. IMÁGENES DE PERSONAJES FALTANTES (5 archivos)

| Imagen | Acción Recomendada |
|--------|-------------------|
| `Elena_Ortiz.png` | Crear imagen o eliminar referencia |
| `Sofia_Vega.png` | Crear imagen o eliminar referencia |
| `Marina_Volkova.png` | Crear imagen o eliminar referencia |
| `generic.png` | Crear placeholder genérico |
| `natacha.jpg` | Verificar si existe como .png |

**Buscar dónde se usan:**
```bash
grep -rn "Elena_Ortiz.png\|Sofia_Vega.png\|Marina_Volkova.png\|generic.png\|natacha.jpg" docs/
```

---

### 2. SESIONES DE LA FUERZA OCULTA (~45 enlaces)

Las sesiones de manual-notes tienen permalinks que no coinciden con los enlaces:

**Problema**: Los enlaces usan formato `/manual-notes/session-XX-YYYY-MM-DD/` pero los permalinks reales son diferentes.

**Sesiones afectadas**: 1-17, 19-45

**Solución**: Verificar permalinks reales de cada sesión:
```bash
grep -h "permalink:" docs/campaigns/la-fuerza-oculta/manual-notes/*.md | sort
```

---

### 3. SESIONES DE LA FAMILIA (~10 enlaces)

| URL Rota | Tipo |
|----------|------|
| `/campaigns/la-familia/session-04.md` | Enlace relativo .md |
| `/campaigns/la-familia/session-14.md` | Enlace relativo .md |
| `/campaigns/la-familia/session-15.md` | Enlace relativo .md |
| `/campaigns/la-familia/session-17.md` | Enlace relativo .md |
| `/campaigns/la-familia/session-33.md` | Enlace relativo .md |
| `/campaigns/la-familia/session-34.md` | Enlace relativo .md |
| `/campaigns/la-familia/session-40.md` | Enlace relativo .md |
| `/campaigns/la-familia/session-41.md` | Enlace relativo .md |
| `/campaigns/la-familia/session-42-2025-05-25/` | Sesión no existe |
| `/campaigns/la-familia/session-43-2025-09-11/` | Sesión no existe |
| `/campaigns/la-familia/summary/summary/` | Permalink duplicado (ya corregido) |

---

### 4. CAPTURAS DE PANTALLA NOTION (~25 imágenes)

Las capturas están en carpetas con nombres largos tipo Notion que no se despliegan:

```
/campaigns/la-fuerza-oculta/manual-notes/PARTIDA SUPERHÉROES XX .../Captura_de_pantalla_....png
/campaigns/la-familia/PARTIDA SUPERHÉROES 18 .../Captura_de_pantalla_....png
```

**Problema**: GitHub Pages no despliega correctamente carpetas con caracteres especiales y espacios.

**Solución**: Eliminar todos los enlaces a imagenes en manual notes

---

### 5. RUTAS DE PERSONAJES ANIDADAS (~8 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/characters/details/caos/pantomima/` | `/characters/details/pantomima/` |
| `/characters/details/caos/sombrio/` | `/characters/details/sombrio/` |
| `/characters/details/sombrio/caos/` | `/characters/details/caos/` |
| `/characters/details/sombrio/pantomima/` | `/characters/details/pantomima/` |
| `/characters/details/las-monjas-del-albergue/` | Eliminar enlace (sin ficha) |
| `/characters/details/lucifer-entidad/` | Eliminar enlace (sin ficha) |
| `/characters/details/padre-eugenio-vargas/dona-carmela-aguilar.md` | Ruta incorrecta |
| `/characters/pensamientos/` | `/characters/pensamientos/diana/` o eliminar |

---

### 6. RUTAS DE GRUPOS INCORRECTAS (~4 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/characters/groups/ultracorps/` | `/groups/ultracorps/` |
| `/characters/groups/fatum/index.md` | `/groups/fatum/` |
| `/groups/La%20familia/` | `/groups/la-familia/` (case + encoding) |
| `/groups/la-familia/El%20faraón.md` | Usar permalink correcto |

---

### 7. CAMPAÑAS Y SECCIONES FALTANTES (~6 enlaces)

| URL | Estado |
|-----|--------|
| `/campaigns/fatum/` | No existe la campaña |
| `/campaigns/campaigns/` | Ruta duplicada |
| `/campaigns/aun-sin-nombre/ai-notes/` | Campaña sin ai-notes |
| `/campaigns/crematorio-la-tranquilidad/ai-notes/` | Campaña sin ai-notes |
| `/campaigns/la-fuerza-oculta/themes/` | No existe |
| `/campaigns/la-fuerza-oculta/ai-notes-summary/sessions/` | No existe |

---

### 8. ÍNDICES INCORRECTOS (~4 enlaces)

| URL | Corrección |
|-----|------------|
| `/all-content/campaigns/` | `/all-content/#campaigns` |
| `/all-content/world-building/` | `/all-content/#world-building` |
| `/campaigns/la-familia/index.md` | `/campaigns/la-familia/` |
| `/campaigns/la-fuerza-oculta/summary/summary.md` | `/campaigns/la-fuerza-oculta/summary/` |

---

### 9. WORLD-BUILDING RUTAS ANIDADAS (~5 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/world-building/ambientacion/geography/barrio-gotico/` | `/world-building/barrio-gotico/` |
| `/world-building/ambientacion/geography/distrito-iovis/` | `/world-building/geography/distrito-iovis/` |
| `/world-building/ambientacion/geography/distrito-martis/` | `/world-building/geography/distrito-martis/` |
| `/world-building/ambientacion/geography/distrito-mercurii/` | `/world-building/geography/distrito-mercurii/` |
| `/world-building/history/06-maturity-arrives.md` | `/world-building/06-maturity-arrives/` |

---

## Priorización de Correcciones

### Alta Prioridad
1. Rutas de personajes anidadas (afectan navegación)
2. Rutas de grupos incorrectas
3. Índices incorrectos

### Media Prioridad
1. Sesiones de La Fuerza Oculta (requiere verificar permalinks)
2. Sesiones de La Familia
3. World-building rutas anidadas

### Baja Prioridad
1. Imágenes de personajes faltantes (crear o eliminar referencias)
2. Capturas de pantalla Notion (requiere reorganización de archivos)
3. Campañas sin contenido (fatum, ai-notes faltantes)

---

## Correcciones Aplicadas (Enero 2026)

| Fecha | Corrección | Archivos Afectados |
|-------|------------|-------------------|
| 2026-01-09 | `/organizations/cazacapas/` → `/groups/caza-capas/` | la-fuerza-oculta.md |
| 2026-01-09 | `/characters/details/el-cacharrero/` → `/characters/details/cacharrero/` | la-fuerza-oculta.md |
| 2026-01-09 | `/characters/gallery.html` → `/characters/gallery/` | 5 archivos |
| 2026-01-09 | `jruschov.png` → `Jruschov.png` | jruschov.md |
| 2026-01-09 | `los-rayos.png` → `los_rayos.png` | los-rayos.md |
| 2026-01-09 | `/characters/details/la-sombra/` → `/characters/details/sombrio/` | 4 archivos |
| 2026-01-09 | `/characters/details/lucifer/` → `/characters/details/lucifer-hero/` | character-groups.md |
| 2026-01-09 | Añadido frontmatter a `/characters/pensamientos/diana/` | diana.md |
| 2026-01-09 | Creado `/groups/humanitas/` | humanitas.md (nuevo) |
| 2026-01-09 | `/groups/telarana/` → `/characters/details/telarana/` | 2 archivos |
| 2026-01-09 | `/world-building/04-metahumanidad-desatada/` → `/world-building/04-last-twenty-years/` | index.md |
| 2026-01-09 | `/world-building/07-last-twenty-years/` → `/world-building/04-last-twenty-years/` | 3 archivos |
| 2026-01-09 | `/world-building/society/arcadia-society/` → `/world-building/arcadia-society/` | 4 archivos |
| 2026-01-09 | `/world-building/geography/distrito-clasico/` → `/world-building/distrito-clasico/` | eduardo-vaquerizo.md |
| 2026-01-09 | `/world-building/geography/distrito-solis/` → residential-districts | distrito-martis.md |
| 2026-01-09 | `ambientacion.md` → `/world-building/ambientacion/` | 3 archivos |
| 2026-01-09 | Corregido permalink summary → eliminado duplicado | 2 archivos |
| 2026-01-09 | `/characters/details/humanitas/` → `/groups/humanitas/` | la-familia/index.md |
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

# Contar archivos de sesiones
find docs/campaigns/la-fuerza-oculta/manual-notes/ -name "*.md" | wc -l
```

---

## Notas Importantes

1. **Jekyll Permalinks**: Los archivos `.md` tienen permalinks definidos en el frontmatter que determinan su URL final.

2. **Case Sensitivity**: GitHub Pages (Linux) distingue mayúsculas de minúsculas.

3. **Caracteres Especiales**: Evitar espacios y caracteres especiales en nombres de archivo.

4. **Enlaces Relativos vs Absolutos**: Preferir `{{ site.baseurl }}/ruta/` para enlaces internos.

---

*Documento mantenido por Claude Code para el proyecto ArcadiaPage*

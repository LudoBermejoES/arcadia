# Guía para Detectar y Corregir Enlaces Rotos

Este documento describe cómo encontrar enlaces rotos en el proyecto ArcadiaPage, categoriza los tipos de errores comunes, y proporciona estrategias para corregirlos.

**Última actualización**: 9 Enero 2026
**Enlaces rotos únicos**: ~202 (tras escaneo con linkinator)

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

### 1. ✅ SESIONES DE LA FUERZA OCULTA - MANUAL NOTES (CORREGIDO)

~~Las sesiones de manual-notes tienen permalinks que no coinciden con los enlaces esperados.~~

**Estado**: ✅ **CORREGIDO** (9 Enero 2026)

**Solución aplicada**:

1. Añadido frontmatter YAML con permalinks a 43 archivos de sesión
2. Formato: `permalink: /campaigns/la-fuerza-oculta/manual-notes/session-XX-YYYY-MM-DD/`
3. Convertidos ~65 enlaces relativos `.md` a formato Jekyll en `index.md`
4. Corregidos enlaces en `sessions/index.md`, `ai-notes-summary/`, `groups/`, `transcriptions.md`
5. Renombrado archivo con espacio: `session-29-2024-08-24 .md` → `session-29-2024-08-24.md`

```bash
# Verificar permalinks actuales
grep -h "permalink:" docs/campaigns/la-fuerza-oculta/manual-notes/*.md | sort
```

---

### 2. CAPTURAS DE PANTALLA NOTION (~40 imágenes)

Las capturas están en carpetas con nombres largos tipo Notion que no se despliegan:

```
/campaigns/la-fuerza-oculta/manual-notes/PARTIDA SUPERHÉROES XX .../Captura_de_pantalla_....png
/campaigns/la-fuerza-oculta/manual-notes/Partida superhéroes XX .../WhatsApp_Image_....jpeg
```

**Problema**: GitHub Pages no despliega correctamente carpetas con caracteres especiales, espacios y acentos.

**Solución**: Eliminar todos los enlaces a imágenes en manual-notes o mover imágenes a carpeta assets.

---

### 3. SESIONES DE LA FAMILIA (~10 enlaces)

| URL Rota | Tipo |
|----------|------|
| `/campaigns/la-familia/session-04.md` | Enlace .md en lugar de permalink |
| `/campaigns/la-familia/session-34.md` | Enlace .md en lugar de permalink |
| `/campaigns/la-familia/session-41.md` | Enlace .md en lugar de permalink |
| `/campaigns/la-familia/session-42/` | Sesión no existe con ese permalink |
| `/campaigns/la-familia/session-42-2025-05-25/` | Sesión no existe |
| `/campaigns/la-familia/session-43/` | Sesión no existe con ese permalink |
| `/campaigns/la-familia/session-43-2025-09-11/` | Sesión no existe |
| `/campaigns/la-familia/summary/summary/` | Permalink duplicado |

---

### 4. RUTAS DE GRUPOS INCORRECTAS (~6 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/characters/groups/ultracorps/` | `/groups/ultracorps/` |
| `/groups/La%20familia/` | `/groups/la-familia/` (case + encoding) |
| `/groups/la-familia/El%20faraón.md` | Usar permalink correcto del personaje |
| `/characters/campaigns/la-fuerza-oculta/ai-notes/` | Ruta incorrecta |

---

### 5. CAMPAÑAS Y SECCIONES FALTANTES (~10 enlaces)

| URL | Estado |
|-----|--------|
| `/campaigns/fatum/` | No existe la campaña |
| `/campaigns/campaigns/` | Ruta duplicada incorrecta |
| `/campaigns/aun-sin-nombre/ai-notes/` | Campaña sin ai-notes |
| `/campaigns/crematorio-la-tranquilidad/ai-notes/` | Campaña sin ai-notes |
| `/campaigns/crematorio-la-tranquilidad/ai-notes/2025-10-25-Session-1/` | Permalink incorrecto |
| `/campaigns/la-fuerza-oculta/themes/` | No existe |
| `/campaigns/la-fuerza-oculta/ai-notes-summary/sessions/` | No existe |
| `/campaigns/la-fuerza-oculta/summary/summary/` | Permalink duplicado |
| `/campaigns/la-fuerza-oculta/summary/summary.md` | Enlace .md incorrecto |

---

### 6. ÍNDICES INCORRECTOS (~4 enlaces)

| URL | Corrección |
|-----|------------|
| `/all-content/campaigns/` | `/all-content/#campaigns` o eliminar |
| `/all-content/world-building/` | `/all-content/#world-building` o eliminar |

---

### 7. WORLD-BUILDING RUTAS ANIDADAS (~8 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/world-building/ambientacion/geography/barrio-gotico/` | `/world-building/geography/barrio-gotico/` |
| `/world-building/ambientacion/geography/distrito-iovis/` | `/world-building/geography/distrito-iovis/` |
| `/world-building/ambientacion/geography/distrito-martis/` | `/world-building/geography/distrito-martis/` |
| `/world-building/ambientacion/geography/distrito-mercurii/` | `/world-building/geography/distrito-mercurii/` |

---

### 8. PENSAMIENTOS Y OTROS (~4 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/characters/pensamientos/` | `/characters/pensamientos/diana/` o listar pensamientos disponibles |
| `/characters/pensamientos/psique-y-diana/` | Verificar si existe el archivo |

---

## Priorización de Correcciones

### Alta Prioridad (Afectan navegación principal)
1. Rutas de grupos incorrectas
2. Índices incorrectos en all-content
3. World-building rutas anidadas

### Media Prioridad (Contenido específico)
1. Sesiones de La Familia (verificar permalinks)
2. Campañas sin contenido (crear o eliminar referencias)
3. Pensamientos de personajes

### Baja Prioridad (Requiere reorganización)
1. Sesiones de La Fuerza Oculta manual-notes (~88 enlaces) - Requiere verificar cada permalink
2. Capturas de pantalla Notion (~40 imágenes) - Eliminar referencias o mover archivos

---

## Correcciones Aplicadas (Enero 2026)

| Fecha | Corrección | Archivos Afectados |
|-------|------------|-------------------|
| 2026-01-09 | `natacha.jpg` → `natacha.png` | natacha.md |
| 2026-01-09 | Restaurada imagen `la-comadreja.png` | la-comadreja-gris.md |
| 2026-01-09 | Enlaces anidados caos/pantomima/sombrio | caos.md, sombrio.md |
| 2026-01-09 | Eliminadas imágenes inexistentes | sofia-vega.md, marina-volkova.md, elena-ortiz.md, periodistas.md |
| 2026-01-09 | Eliminado enlace lucifer-entidad | character-list.md |
| 2026-01-09 | Eliminado enlace las-monjas-del-albergue | character-groups.md |
| 2026-01-09 | ~300 enlaces .md → formato Jekyll | 130 archivos en characters/details/, groups/, locations/ |
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
| 2026-01-09 | `06-maturity-arrives.md` → `/world-building/06-maturity-arrives/` | ultracorps.md |
| 2026-01-09 | Añadido frontmatter YAML con permalinks a manual-notes | 43 archivos de sesión |
| 2026-01-09 | Convertidos enlaces relativos .md a formato Jekyll | manual-notes/index.md, sessions/index.md, ai-notes-summary/*.md |
| 2026-01-09 | Corregidos enlaces en transcriptions.md | transcriptions.md |
| 2026-01-09 | Renombrado `session-29-2024-08-24 .md` (espacio) | session-29-2024-08-24.md |

---

## Comandos Útiles

```bash
# Ver todos los permalinks de sesiones manual-notes
grep -h "permalink:" docs/campaigns/la-fuerza-oculta/manual-notes/*.md | sort

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

5. **Notion Export**: Las carpetas exportadas de Notion contienen caracteres especiales que no funcionan en GitHub Pages.

---

*Documento mantenido por Claude Code para el proyecto ArcadiaPage*

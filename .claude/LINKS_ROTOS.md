# Guía para Detectar y Corregir Enlaces Rotos

Este documento describe cómo encontrar enlaces rotos en el proyecto ArcadiaPage, categoriza los tipos de errores comunes, y proporciona estrategias para corregirlos.

**Última actualización**: 9 Enero 2026
**Enlaces rotos únicos**: 23 (último escaneo linkinator)

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

### 1. CAPTURAS NOTION EN LA FAMILIA SESSION-42 (6 imágenes)

| URL Rota |
|----------|
| `/campaigns/la-familia/session-42/PARTIDA%20SUPERHE...19.12.14.png` |
| `/campaigns/la-familia/session-42/PARTIDA%20SUPERHE...19.12.45.png` |
| `/campaigns/la-familia/session-42/PARTIDA%20SUPERHE...19.13.07.png` |
| `/campaigns/la-familia/session-42/PARTIDA%20SUPERHE...20.16.36.png` |
| `/campaigns/la-familia/session-42/PARTIDA%20SUPERHE...20.18.40.png` |
| `/campaigns/la-familia/session-42/PARTIDA%20SUPERHE...20.19.08.png` |

**Problema**: Carpetas Notion con caracteres especiales (SUPERHÉROES).
**Solución**: Eliminar referencias en `session-42-2025-05-25.md` de La Familia.

---

### 2. SESIONES DE LA FAMILIA (2 enlaces)

| URL Rota | Problema |
|----------|----------|
| `/campaigns/la-familia/session-42-2025-05-25/` | Permalink no coincide |
| `/campaigns/la-familia/session-43-2025-09-11/` | Permalink no coincide |

**Solución**: Verificar frontmatter de session-42 y session-43 en La Familia.

---

### 3. ÍNDICES Y RUTAS INCORRECTAS (6 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/all-content/campaigns/` | `/all-content/#campaigns` o eliminar |
| `/all-content/world-building/` | `/all-content/#world-building` o eliminar |
| `/characters/groups/ultracorps/` | `/groups/ultracorps/` |
| `/characters/campaigns/la-fuerza-oculta/ai-notes/` | Eliminar referencia |
| `/groups/La%20familia/` | `/groups/la-familia/` |
| `/groups/la-familia/El%20faraón.md` | Usar permalink correcto |

---

### 4. CAMPAÑAS Y SECCIONES FALTANTES (7 enlaces)

| URL | Estado |
|-----|--------|
| `/campaigns/aun-sin-nombre/ai-notes/` | Campaña sin carpeta ai-notes |
| `/campaigns/campaigns/` | Ruta duplicada incorrecta |
| `/campaigns/crematorio-la-tranquilidad/ai-notes/` | Campaña sin carpeta ai-notes |
| `/campaigns/crematorio-la-tranquilidad/ai-notes/2025-10-25-Session-1.md` | Enlace .md incorrecto |
| `/campaigns/fatum/` | Campaña no existe o sin índice |
| `/campaigns/la-fuerza-oculta/ai-notes-summary/sessions/` | No existe |
| `/campaigns/la-fuerza-oculta/themes/` | No existe |

---

### 5. SUMMARY DUPLICADOS (2 enlaces)

| URL Incorrecta | Problema |
|----------------|----------|
| `/campaigns/la-fuerza-oculta/summary/summary.md` | Enlace .md incorrecto |
| `/campaigns/la-fuerza-oculta/summary/summary/` | Permalink duplicado |

---

### 6. WORLD-BUILDING RUTAS ANIDADAS (4 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/world-building/ambientacion/geography/barrio-gotico/` | `/world-building/barrio-gotico/` |
| `/world-building/ambientacion/geography/distrito-iovis/` | `/world-building/distrito-iovis/` |
| `/world-building/ambientacion/geography/distrito-martis/` | `/world-building/distrito-martis/` |
| `/world-building/ambientacion/geography/distrito-mercurii/` | `/world-building/distrito-mercurii/` |

---

### 7. PENSAMIENTOS DE PERSONAJES (2 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/characters/pensamientos/` | Crear índice o redirigir |
| `/characters/pensamientos/psique-y-diana/` | Verificar si existe o eliminar |

---

## Priorización de Correcciones

### Alta Prioridad (Fácil de corregir)
1. Capturas Notion en La Familia session-42 (eliminar 6 referencias)
2. World-building rutas anidadas (4 enlaces)
3. Índices incorrectos (6 enlaces)

### Media Prioridad
1. Sesiones de La Familia - verificar permalinks (2 enlaces)
2. Summary duplicados (2 enlaces)

### Baja Prioridad (Requiere crear contenido)
1. Campañas sin ai-notes (7 enlaces)
2. Pensamientos de personajes - crear índice (2 enlaces)

---

## ✅ Correcciones Aplicadas (Enero 2026)

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
| 2026-01-09 | **Añadido frontmatter YAML con permalinks a manual-notes** | 43 archivos de sesión |
| 2026-01-09 | Convertidos enlaces relativos .md a formato Jekyll | manual-notes/index.md, sessions/index.md, ai-notes-summary/*.md |
| 2026-01-09 | Corregidos enlaces en transcriptions.md | transcriptions.md |
| 2026-01-09 | Renombrado `session-29-2024-08-24 .md` (espacio) | session-29-2024-08-24.md |
| 2026-01-09 | **Eliminadas 22 referencias a capturas Notion** | 10 archivos de manual-notes (La Fuerza Oculta) |

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

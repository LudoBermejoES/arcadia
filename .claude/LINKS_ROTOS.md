# Guía para Detectar y Corregir Enlaces Rotos

Este documento describe cómo encontrar enlaces rotos en el proyecto ArcadiaPage, categoriza los tipos de errores comunes, y proporciona estrategias para corregirlos.

**Última actualización**: 9 Enero 2026
**Enlaces rotos únicos**: 17 (último escaneo linkinator)

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

## Categorías de Enlaces Rotos Actuales (17 únicos)

### 1. ÍNDICES ALL-CONTENT (2 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/all-content/campaigns/` | Cambiar a `/all-content/#campaigns` o eliminar enlace |
| `/all-content/world-building/` | Cambiar a `/all-content/#world-building` o eliminar enlace |

**Problema**: all-content.md no tiene rutas separadas por sección.
**Solución**: Buscar archivos que referencian estas URLs y corregir a anclas `#`.

---

### 2. CAMPAÑAS SIN AI-NOTES O INEXISTENTES (6 enlaces)

| URL | Problema | Solución |
|-----|----------|----------|
| `/campaigns/aun-sin-nombre/ai-notes/` | Campaña sin carpeta ai-notes | Crear carpeta o eliminar enlace |
| `/campaigns/campaigns/` | Ruta duplicada incorrecta | Eliminar enlace |
| `/campaigns/crematorio-la-tranquilidad/ai-notes/` | Campaña sin carpeta ai-notes | Crear carpeta o eliminar enlace |
| `/campaigns/crematorio-la-tranquilidad/ai-notes/2025-10-25-Session-1.md` | Enlace .md incorrecto | Convertir a permalink Jekyll |
| `/campaigns/fatum/` | Campaña no existe o sin índice | Crear index.md o redirigir a `/groups/fatum/` |
| `/campaigns/la-fuerza-oculta/ai-notes-summary/sessions/` | Ruta incorrecta | Cambiar a `/campaigns/la-fuerza-oculta/sessions/` |

---

### 3. RUTAS DE PERSONAJES INCORRECTAS (3 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/characters/campaigns/la-fuerza-oculta/ai-notes/` | Ruta mal formada - eliminar |
| `/characters/groups/ultracorps/` | Cambiar a `/groups/ultracorps/` |
| `/characters/pensamientos/` | Crear índice en `/characters/pensamientos/index.md` |

---

### 4. RUTAS DE GRUPOS INCORRECTAS (2 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/groups/La%20familia/` | Cambiar a `/groups/la-familia/` (sin mayúscula, sin espacio) |
| `/groups/la-familia/El%20faraón.md` | Cambiar a `/characters/details/el-faraon/` |

---

### 5. WORLD-BUILDING RUTAS ANIDADAS (4 enlaces)

| URL Incorrecta | Corrección |
|----------------|------------|
| `/world-building/ambientacion/geography/barrio-gotico/` | Cambiar a `/world-building/barrio-gotico/` |
| `/world-building/ambientacion/geography/distrito-iovis/` | Cambiar a `/world-building/distrito-iovis/` |
| `/world-building/ambientacion/geography/distrito-martis/` | Cambiar a `/world-building/distrito-martis/` |
| `/world-building/ambientacion/geography/distrito-mercurii/` | Cambiar a `/world-building/distrito-mercurii/` |

**Problema**: La ruta tiene niveles extra `/ambientacion/geography/` que no existen.
**Solución**: Buscar archivos con estas rutas y corregir a la ruta directa.

---

## Priorización de Correcciones

### Alta Prioridad (Fácil de corregir)
1. **Grupos incorrectos**: `/groups/La%20familia/` y El faraón.md (2 enlaces)
2. **Characters incorrectos**: `/characters/groups/ultracorps/` (1 enlace)
3. **World-building rutas anidadas**: Eliminar `/ambientacion/geography/` (4 enlaces)

### Media Prioridad
1. **Índices all-content**: Cambiar a anclas `#` (2 enlaces)
2. **ai-notes-summary/sessions/**: Corregir ruta (1 enlace)

### Baja Prioridad (Requiere crear contenido o decisión)
1. **Campañas sin ai-notes**: aun-sin-nombre, crematorio (3 enlaces)
2. **campaigns/fatum/**: Decidir si crear campaña o redirigir (1 enlace)
3. **characters/pensamientos/**: Crear índice (1 enlace)
4. **campaigns/campaigns/**: Eliminar enlace duplicado (1 enlace)

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
| 2026-01-09 | **Eliminadas 6 capturas Notion de La Familia** | session-42-2025-05-25.md |
| 2026-01-09 | Corregidos permalinks session-42 y session-43 | la-familia/index.md, summary.md |
| 2026-01-09 | Eliminado enlace themes/ | sessions/index.md |
| 2026-01-09 | Corregido summary/summary/ duplicado | la-fuerza-oculta/index.md |
| 2026-01-09 | Añadido frontmatter a Psique_y_Diana.md | Psique_y_Diana.md |
| 2026-01-09 | Convertido enlace relativo en puno-gris.md | puno-gris.md |

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

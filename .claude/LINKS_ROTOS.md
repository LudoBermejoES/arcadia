# Guía para Detectar y Corregir Enlaces Rotos

Este documento describe cómo encontrar enlaces rotos en el proyecto ArcadiaPage, categoriza los tipos de errores comunes, y proporciona estrategias para corregirlos.

**Última actualización**: 9 Enero 2026
**Enlaces rotos únicos**: 0 (último escaneo linkinator - pendiente verificación tras despliegue)

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

## Estado Actual

**Todos los enlaces rotos conocidos han sido corregidos.** Pendiente de verificación tras el próximo despliegue.

Los últimos 3 enlaces rotos detectados fueron:
- `/campaigns/campaigns/` - Corregido en plan.md
- `/campaigns/la-fuerza-oculta/ai-notes-summary/sessions/` - Corregido en 5 archivos
- `/world-building/geography/barrio-gotico/` - Corregido en ambientacion.md

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
| 2026-01-09 | Creado index.md para crematorio-la-tranquilidad/ai-notes/ | ai-notes/index.md (nuevo) |
| 2026-01-09 | Creado index.md para aun-sin-nombre/ai-notes/ | ai-notes/index.md (nuevo) |
| 2026-01-09 | Creado index.md para characters/pensamientos/ | pensamientos/index.md (nuevo) |
| 2026-01-09 | `/campaigns/fatum/` → `/groups/fatum/` | campaigns/index.md |
| 2026-01-09 | `../../groups/ultracorps/` → `/groups/ultracorps/` | 6 archivos de personajes |
| 2026-01-09 | Corregidos enlaces .md en crematorio-la-tranquilidad | sessions/index.md, index.md, ai-notes-summary/index.md |
| 2026-01-09 | `/all-content/campaigns/` y `/world-building/` → site.baseurl | all-content.md |
| 2026-01-09 | Enlaces de navegación relativos → site.baseurl | summaries.md, timeline.md |
| 2026-01-09 | `../../campaigns/la-fuerza-oculta/ai-notes/` → site.baseurl | ana-montenegro-esfinge-atropos.md |
| 2026-01-09 | `/world-building/geography/barrio-gotico/` → `/world-building/barrio-gotico/` | ambientacion.md |
| 2026-01-09 | `../sessions/` → site.baseurl en ai-notes-summary | 5 archivos de resúmenes |
| 2026-01-09 | `../../campaigns/` → site.baseurl | crematorio plan.md |

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

6. **Cache**: Algunos enlaces pueden seguir apareciendo como 404 temporalmente después de correcciones hasta que el cache se actualice.

---

*Documento mantenido por Claude Code para el proyecto ArcadiaPage*

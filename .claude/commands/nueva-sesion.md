# Documentar Nueva Sesión de Campaña

Este comando te guía para documentar una nueva sesión de cualquier campaña del proyecto Arcadia.

## Instrucciones

Cuando el usuario ejecute este comando, debes seguir estos pasos:

### 1. Identificar la Campaña y Sesión

El usuario proporcionará **uno o dos archivos** de la sesión:
- **Notas manuales**: Tomadas durante la partida por el DM
- **Notas AI (Gemini)**: Transcripción automática procesada por Gemini

**Identifica la campaña** por la ubicación del archivo o el contenido:
- `la-fuerza-oculta/` - Campaña principal actual
- `aun-sin-nombre/` - Campaña del Reformatorio Nueva Esperanza
- Otras campañas según estructura del proyecto

**Al menos uno de los dos es obligatorio.** Puede haber:
- Solo notas manuales (sin grabación)
- Solo notas AI (sin notas manuales)
- Ambos tipos de notas

**Información dentro de los archivos:**
- El **número de sesión** suele aparecer en el título o contenido del archivo
- La **fecha de la sesión** suele estar indicada al inicio del documento
- Lee el contenido para extraer estos datos si el usuario no los proporciona explícitamente

Si no puedes determinar la fecha o número de sesión del contenido, pregunta al usuario.

**Sugerencias proactivas:**
Una vez hayas leído y comprendido el contenido de la sesión, eres libre de sugerir al usuario la creación de nuevos documentos para:
- **Personajes**: NPCs nuevos o que ganaron relevancia
- **Grupos/Organizaciones**: Facciones nuevas mencionadas
- **Localizaciones**: Lugares específicos visitados o mencionados
- **Barrios/Distritos**: Nuevas áreas de Arcadia exploradas
- **Otros elementos del worldbuilding** que merezcan documentación propia

Estas sugerencias son opcionales y el usuario decidirá si proceder con ellas.

### 2. Estructura de Directorios

Las campañas tienen tres tipos de contenido relacionado con AI:

```
docs/campaigns/[campaña]/
├── ai-notes/              # Transcripciones CRUDAS de Gemini (sin modificar)
│   └── YYYY-MM-DD-gemini-notes.md
├── ai-notes-summary/      # Resúmenes ANALÍTICOS (escritos por Claude)
│   └── YYYY-MM-DD-gemini-notes.md
└── manual-notes/          # Notas manuales del DM
    └── session-XX-YYYY-MM-DD.md
```

**IMPORTANTE: Diferencia entre ai-notes/ y ai-notes-summary/**
- `ai-notes/`: Contiene las **transcripciones crudas** de Gemini, tal cual las genera la IA. NO SE MODIFICAN excepto para añadir frontmatter opcional.
- `ai-notes-summary/`: Contiene **resúmenes analíticos** escritos por Claude, siguiendo el formato estructurado de análisis de sesión.

### 3. Archivos a Crear

#### Notas Manuales (si el usuario proporciona)
- **Ruta**: `docs/campaigns/[campaña]/manual-notes/session-XX-YYYY-MM-DD.md`
- **Acción**: Añadir frontmatter al contenido proporcionado
- **Frontmatter obligatorio**:
```yaml
---
layout: page
title: "[Campaña] - Sesión XX"
permalink: /campaigns/[campaña]/manual-notes/session-XX-YYYY-MM-DD/
---
```

#### Transcripción Cruda de AI (si el usuario proporciona)
- **Ruta**: `docs/campaigns/[campaña]/ai-notes/YYYY-MM-DD-gemini-notes.md`
- **Acción**: Copiar el contenido TAL CUAL, sin modificar (solo añadir frontmatter si se desea)
- **Frontmatter opcional** (las transcripciones crudas pueden no tenerlo)

#### Resumen Analítico (OBLIGATORIO si hay transcripción AI)
- **Ruta**: `docs/campaigns/[campaña]/ai-notes-summary/YYYY-MM-DD-gemini-notes.md`
- **Acción**: ESCRIBIR un resumen analítico basado en la transcripción y/o notas manuales
- **Frontmatter obligatorio**:
```yaml
---
layout: page
title: "[Campaña] - Análisis Sesión XX"
permalink: /campaigns/[campaña]/ai-notes-summary/YYYY-MM-DD-gemini-notes/
---
```

**El resumen analítico debe seguir esta estructura:**
1. **Resumen Ejecutivo**: 2-3 párrafos con lo más importante
2. **Eventos Principales**: Lista numerada de los eventos clave
3. **Desarrollo de Personajes**: Cómo evolucionó cada PJ
4. **Revelaciones Importantes**: Información nueva descubierta
5. **Temas Narrativos**: Análisis de temas tratados
6. **Mecánicas de Juego Destacadas**: Tiradas importantes
7. **Información para Continuidad**: Hilos abiertos para próximas sesiones
8. **Citas Destacadas**: Frases memorables de la sesión

Consulta ejemplos existentes en `ai-notes-summary/` para ver el formato esperado.

### 4. Índices a Actualizar (OBLIGATORIO)

**IMPORTANTE**: Revisa TODOS los archivos index.md de la campaña, estén en la carpeta que estén. Cada campaña puede tener múltiples índices que necesitan mantenerse sincronizados.

Lee y actualiza estos archivos en orden (adapta las rutas a la campaña correspondiente):

1. **`docs/campaigns/[campaña]/index.md`** (PRINCIPAL)
   - Añadir sesión a cronología en la fase correspondiente
   - Actualizar estadísticas generales (sesiones totales, horas, etc.)
   - Actualizar "Estado Actual" si hay cambios narrativos importantes
   - Verificar que los nombres de jugadores/personajes sean correctos

2. **`docs/campaigns/[campaña]/sessions/index.md`** (si existe)
   - Añadir nueva entrada en la cronología de sesiones
   - Actualizar estadísticas y métricas
   - Mantener consistencia con el index principal

3. **`docs/campaigns/[campaña]/manual-notes/index.md`** (si hay notas manuales)
   - Añadir nueva entrada en cronología
   - Actualizar estadísticas (total sesiones, período)

4. **`docs/campaigns/[campaña]/ai-notes/index.md`** (si hay transcripción AI)
   - Añadir nueva entrada con enlace que apunte a `../ai-notes-summary/`
   - Actualizar estadísticas de transcripciones
   - **IMPORTANTE**: Los enlaces deben apuntar a ai-notes-summary/, no a ai-notes/

5. **`docs/campaigns/[campaña]/ai-notes-summary/index.md`** (si existe y hay transcripción)
   - Añadir entrada del nuevo análisis

6. **Otros índices específicos de la campaña** (revisar si existen):
   - `docs/campaigns/[campaña]/reformatorio/index.md` (para aun-sin-nombre)
   - `docs/campaigns/[campaña]/summary/summary.md` (para la-fuerza-oculta)
   - Cualquier otro archivo index.md dentro de la carpeta de la campaña

### 4. Revisión Contextual

Después de leer el contenido de la sesión, evalúa si necesitas actualizar:

- **Fichas de personajes** (si hay nuevos poderes, traumas, revelaciones):
  - `docs/characters/details/eslizon-esmeralda.md`
  - `docs/characters/details/diana.md`
  - `docs/characters/details/pantomima.md`
  - `docs/characters/details/mencia-psique-cia.md`
  - `docs/characters/details/justa-justicia-sentencia.md`
  - `docs/characters/details/hotman.md`

- **Ficha del grupo** (`docs/groups/la-fuerza-oculta.md`) si hay cambios de equipo

- **Nuevos NPCs** en `docs/characters/details/` + actualizar `character-list.md`

- **Nuevos grupos** en `docs/groups/`

### 5. Checklist Final

Presenta al usuario este checklist antes de hacer commit:

```
## Sesión XX (DD Mes YYYY)

### Obligatorio - Archivos de sesión:
- [ ] Crear/verificar manual-notes/session-XX-YYYY-MM-DD.md
- [ ] Crear/verificar ai-notes/YYYY-MM-DD-gemini-notes.md (transcripción cruda)
- [ ] Crear/verificar ai-notes-summary/YYYY-MM-DD-gemini-notes.md (resumen analítico)

### Obligatorio - Índices (revisar TODOS):
- [ ] Actualizar [campaña]/index.md (principal)
- [ ] Actualizar [campaña]/sessions/index.md (si existe)
- [ ] Actualizar [campaña]/manual-notes/index.md (si hay notas manuales)
- [ ] Actualizar [campaña]/ai-notes/index.md (si hay transcripción)
- [ ] Actualizar [campaña]/ai-notes-summary/index.md (si hay resumen)
- [ ] Revisar otros índices específicos de la campaña

### Contextual (según contenido):
- [ ] Actualizar fichas de personajes afectados
- [ ] Actualizar fichas de grupos mencionados
- [ ] Crear fichas de nuevos NPCs
- [ ] Actualizar historial.md
```

### 6. Commit

Sugerir mensaje de commit en formato:
```
Añadir documentación de Sesión XX (DD Mes YYYY)
```

## Notas Importantes

### Diferencia Crítica: ai-notes/ vs ai-notes-summary/

| Directorio | Contenido | Acción de Claude |
|------------|-----------|------------------|
| `ai-notes/` | Transcripciones CRUDAS de Gemini | Copiar sin modificar |
| `ai-notes-summary/` | Resúmenes ANALÍTICOS | ESCRIBIR análisis estructurado |

- **NUNCA** copies la transcripción cruda a ai-notes-summary/
- **SIEMPRE** escribe un resumen analítico nuevo basado en el contenido de la sesión
- El índice de `ai-notes/` enlaza a archivos en `ai-notes-summary/` para los análisis
- Usar enlaces Jekyll: `{{ site.baseurl }}/ruta/` NO enlaces .md relativos
- Verificar que las estadísticas coincidan entre todos los índices

### Campañas Soportadas

- **La Fuerza Oculta**: `docs/campaigns/la-fuerza-oculta/`
- **Reformatorio Nueva Esperanza**: `docs/campaigns/aun-sin-nombre/`
- Otras campañas siguen la misma estructura

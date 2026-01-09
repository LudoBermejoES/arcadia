# Estrategia de Cambios al Añadir una Nueva Sesión

Este documento describe los archivos que deben actualizarse cuando se añade una nueva sesión a la campaña de La Fuerza Oculta.

---

## Archivos OBLIGATORIOS (Siempre se actualizan)

### 1. Archivos de la Sesión (Crear nuevos)

#### Notas Manuales
- **Crear**: `docs/campaigns/la-fuerza-oculta/manual-notes/session-XX-YYYY-MM-DD.md`
- **Formato**: Notas tomadas durante la sesión con eventos principales
- **Contenido**: Diálogos, decisiones clave, combates, revelaciones

#### Notas AI (si hay transcripción Gemini)
- **Crear**: `docs/campaigns/la-fuerza-oculta/ai-notes-summary/YYYY-MM-DD-gemini-notes.md`
- **Formato**: Resumen procesado por Gemini de la grabación
- **Contenido**: Transcripción completa con timestamps y resúmenes automáticos

### 2. Índices de la Campaña (Actualizar)

#### Índice de Notas Manuales
- **Archivo**: `docs/campaigns/la-fuerza-oculta/manual-notes/index.md`
- **Cambios**:
  - Añadir nueva entrada en la cronología con enlace a la sesión
  - Actualizar estadísticas: Total de sesiones, páginas estimadas, período cubierto
  - Añadir sesión a la fase correspondiente (o crear nueva fase si es necesario)

#### Índice de Notas AI
- **Archivo**: `docs/campaigns/la-fuerza-oculta/ai-notes/index.md`
- **Cambios**:
  - Añadir nueva entrada con enlace y descripción temática
  - Actualizar estadísticas: Total transcripciones, palabras totales, páginas equivalentes
  - Añadir a la sección del mes correspondiente

#### Índice Principal de la Campaña
- **Archivo**: `docs/campaigns/la-fuerza-oculta/index.md`
- **Cambios**:
  - Añadir sesión a la cronología en la fase correspondiente
  - Actualizar estadísticas generales (número de sesiones)
  - Actualizar "Estado Actual" si hay cambios narrativos importantes
  - Actualizar "Arcos Narrativos Activos" según los eventos

---

## Archivos CONTEXTUALES (Dependen del contenido de la sesión)

### 3. Fichas de Personajes

#### Cuándo actualizar:
- Nuevo poder descubierto
- Evento emocional significativo
- Nuevo contacto o alianza
- Herida grave o trauma
- Cambio de nombre/identidad
- Revelación de trasfondo

#### Archivos posibles:
- `docs/characters/details/eslizon-esmeralda.md`
- `docs/characters/details/diana.md`
- `docs/characters/details/pantomima.md`
- `docs/characters/details/mencia-psique-cia.md`
- `docs/characters/details/justa-justicia-sentencia.md`
- `docs/characters/details/hotman.md`

### 4. Pensamientos de Personajes

#### Cuándo crear:
- Monólogos internos importantes
- Reflexiones post-sesión
- Desarrollo emocional significativo

#### Ubicación:
- `docs/characters/pensamientos/[NombrePersonaje]X.md`
- Ejemplo: `Justa3.md`, `Hotman2.md`

### 5. Ficha del Grupo

#### Archivo: `docs/groups/la-fuerza-oculta.md`
#### Cuándo actualizar:
- Nuevas alianzas o contactos del grupo
- Cambios en la dinámica del equipo
- Nuevos arcos narrativos
- Actualización de estadísticas del grupo

### 6. Nuevos Personajes NPCs

#### Cuándo crear:
- Aparece un NPC relevante que no existía
- Un NPC menor se vuelve importante

#### Ubicación:
- `docs/characters/details/[nombre-personaje].md`
- Actualizar también `docs/characters/character-list.md`
- Actualizar `docs/characters/gallery.md` si tiene imagen

### 7. Nuevos Grupos/Organizaciones

#### Cuándo crear:
- Aparece una nueva organización
- Un grupo existente necesita documentación propia

#### Ubicación:
- `docs/groups/[nombre-grupo].md`
- Actualizar `docs/groups/character-groups.md` o `docs/groups/index.md`

---

## Archivos de ESTADÍSTICAS GLOBALES (Actualizar periódicamente)

### 8. Estadísticas del Proyecto

#### Archivos:
- `docs/index.md` - Página principal
- `docs/campaigns/index.md` - Índice de campañas
- `docs/stats/index.md` - Estadísticas detalladas

#### Qué actualizar:
- Total de sesiones documentadas
- Fecha de última actualización
- Estadísticas específicas por campaña

### 9. Historial de Cambios

#### Archivo: `docs/historial.md`
#### Cuándo actualizar:
- Siempre que se añade una sesión significativa
- Documentar los cambios realizados con detalle

---

## Checklist Rápido para Nueva Sesión

```markdown
## Sesión XX (DD Mes YYYY)

### Obligatorio:
- [ ] Crear `manual-notes/session-XX-YYYY-MM-DD.md`
- [ ] Crear `ai-notes-summary/YYYY-MM-DD-gemini-notes.md` (si hay transcripción)
- [ ] Actualizar `manual-notes/index.md`
- [ ] Actualizar `ai-notes/index.md` (si hay transcripción)
- [ ] Actualizar `la-fuerza-oculta/index.md` (cronología y estadísticas)

### Contextual (revisar si aplica):
- [ ] Actualizar fichas de personajes afectados
- [ ] Crear pensamientos de personajes (si hubo momentos emotivos)
- [ ] Actualizar `groups/la-fuerza-oculta.md` (si hay cambios de grupo)
- [ ] Crear fichas de nuevos NPCs
- [ ] Crear fichas de nuevos grupos/organizaciones
- [ ] Actualizar `historial.md`

### Periódico (no cada sesión):
- [ ] Actualizar `docs/index.md` (estadísticas globales)
- [ ] Actualizar `docs/campaigns/index.md`
- [ ] Actualizar `docs/stats/index.md`
```

---

## Ejemplos de Commits Anteriores

### Sesión Simple (Solo documentación básica)
Commit `7787350` - Sesión 43:
- Notas manuales + AI notes
- Actualización de índices
- Actualización de ficha de Hotman (nuevo poder de vuelo)
- ~10 archivos modificados

### Sesión Compleja (Muchos eventos)
Commit `cdd3fc2` - Sesiones 37-40:
- 3 transcripciones AI + 3 notas manuales
- Actualización masiva de índices
- Nueva fase en cronología
- Actualización de summary.md (~200 líneas nuevas)
- ~14 archivos modificados

### Sesión con Cambio de Identidad
Commit `8edc00c` - Renombrar Astrid → Pantomima:
- Renombrar archivo de personaje
- Actualizar todos los enlaces en 13 archivos
- Actualizar fichas de múltiples personajes
- ~16 archivos modificados

### Sesión con Nuevo Grupo
Commit `d31f9c2` - Añadir Cazacapas:
- Crear nueva ficha de grupo
- Actualizar character-groups.md
- Actualizar gallery.md
- ~3 archivos modificados

---

## Orden Recomendado de Trabajo

1. **Crear archivos de sesión** (notas manuales, AI notes)
2. **Actualizar índices de campaña** (manual-notes/index.md, ai-notes/index.md)
3. **Actualizar index.md de la campaña** (cronología, estadísticas)
4. **Revisar qué personajes fueron afectados** y actualizar sus fichas
5. **Crear nuevos personajes/grupos** si aparecieron
6. **Actualizar estadísticas globales** (si es necesario)
7. **Documentar en historial.md** los cambios realizados
8. **Commit con mensaje descriptivo**

---

## Patrones de Nomenclatura

### Notas Manuales
```
session-XX-YYYY-MM-DD.md
```
Ejemplo: `session-44-2025-12-28.md`

### Notas AI
```
YYYY-MM-DD-gemini-notes.md
```
Ejemplo: `2025-12-28-gemini-notes.md`

### Pensamientos
```
[NombrePersonaje]X.md
```
Ejemplo: `Justa3.md`, `Hotman2.md`

### Personajes
```
nombre-personaje.md (kebab-case)
```
Ejemplo: `eslizon-esmeralda.md`, `justa-justicia-sentencia.md`

---

## Notas Importantes

1. **Las notas AI van en `ai-notes-summary/`**, no en `ai-notes/`
   - `ai-notes/` contiene transcripciones completas
   - `ai-notes-summary/` contiene resúmenes de Gemini

2. **El índice de ai-notes apunta a `ai-notes-summary/`**
   - A pesar del nombre del directorio index (`ai-notes/index.md`)

3. **Mantener coherencia temporal**
   - Las fases de la campaña deben reflejar el arco narrativo
   - Crear nuevas fases cuando hay cambios significativos en la dirección de la historia

4. **summary.md es un documento vivo**
   - `docs/campaigns/la-fuerza-oculta/summary/summary.md`
   - Contiene análisis narrativo profundo
   - Se actualiza con cada sesión significativa

5. **Estadísticas deben coincidir**
   - El número de sesiones debe ser consistente entre todos los índices
   - Verificar que campaigns/index.md, manual-notes/index.md y ai-notes/index.md tengan números coherentes

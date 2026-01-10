# Documentar Nueva Sesión de La Fuerza Oculta

Este comando te guía para documentar una nueva sesión de la campaña.

## Instrucciones

Cuando el usuario ejecute este comando, debes seguir estos pasos:

### 1. Identificar la Sesión

El usuario proporcionará **uno o dos archivos** de la sesión:
- **Notas manuales**: Tomadas durante la partida por el DM
- **Notas AI (Gemini)**: Transcripción automática procesada por Gemini

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

### 2. Archivos a Crear (si no existen)

#### Notas Manuales
- **Ruta**: `docs/campaigns/la-fuerza-oculta/manual-notes/session-XX-YYYY-MM-DD.md`
- **Frontmatter obligatorio**:
```yaml
---
layout: page
title: "La Fuerza Oculta - Sesión XX"
permalink: /campaigns/la-fuerza-oculta/manual-notes/session-XX-YYYY-MM-DD/
---
```

#### Notas AI (si hay transcripción)
- **Ruta**: `docs/campaigns/la-fuerza-oculta/ai-notes-summary/YYYY-MM-DD-gemini-notes.md`
- **Frontmatter obligatorio**:
```yaml
---
layout: page
title: "La Fuerza Oculta - Análisis Sesión XX"
permalink: /campaigns/la-fuerza-oculta/ai-notes-summary/YYYY-MM-DD-gemini-notes/
---
```

### 3. Índices a Actualizar (OBLIGATORIO)

Lee y actualiza estos archivos en orden:

1. **`docs/campaigns/la-fuerza-oculta/manual-notes/index.md`**
   - Añadir nueva entrada en cronología
   - Actualizar estadísticas (total sesiones, período)

2. **`docs/campaigns/la-fuerza-oculta/ai-notes/index.md`** (si hay transcripción)
   - Añadir nueva entrada con enlace
   - Actualizar estadísticas de transcripciones

3. **`docs/campaigns/la-fuerza-oculta/index.md`**
   - Añadir sesión a cronología en la fase correspondiente
   - Actualizar estadísticas generales
   - Actualizar "Estado Actual" si hay cambios narrativos

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

### Obligatorio:
- [ ] Crear/verificar manual-notes/session-XX-YYYY-MM-DD.md
- [ ] Crear/verificar ai-notes-summary/YYYY-MM-DD-gemini-notes.md (si aplica)
- [ ] Actualizar manual-notes/index.md
- [ ] Actualizar ai-notes/index.md (si aplica)
- [ ] Actualizar la-fuerza-oculta/index.md

### Contextual (según contenido):
- [ ] Actualizar fichas de personajes afectados
- [ ] Actualizar groups/la-fuerza-oculta.md
- [ ] Crear fichas de nuevos NPCs
- [ ] Actualizar historial.md
```

### 6. Commit

Sugerir mensaje de commit en formato:
```
Añadir documentación de Sesión XX (DD Mes YYYY)
```

## Notas Importantes

- Las notas AI van en `ai-notes-summary/`, NO en `ai-notes/`
- El índice de ai-notes apunta a `ai-notes-summary/`
- Usar enlaces Jekyll: `{{ site.baseurl }}/ruta/` NO enlaces .md relativos
- Verificar que las estadísticas coincidan entre todos los índices

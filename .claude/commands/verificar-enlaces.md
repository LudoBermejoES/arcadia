# Verificar y Corregir Enlaces Rotos

Este comando te ayuda a detectar y corregir enlaces rotos en el sitio ArcadiaPage.

## Instrucciones

### 1. Ejecutar Verificación

Ejecuta linkinator para detectar enlaces rotos:

```bash
npx linkinator https://arcadia.ludobermejo.es --recurse --skip "youtube|gemini|google|github.com" --verbosity error
```

Para guardar resultados únicos:

```bash
npx linkinator https://arcadia.ludobermejo.es --recurse --skip "youtube|gemini|google|github.com" --verbosity error 2>&1 | grep "\[404\]" | sort -u > broken-links-report.txt
```

### 2. Categorías de Errores Comunes

#### A. Imágenes Inexistentes
- **Síntoma**: 404 en `/assets/img/characters/nombre.png`
- **Solución**: Verificar nombre exacto con `ls docs/assets/img/characters/ | sort`
- **Corrección típica**: Ajustar mayúsculas/minúsculas o extensión

#### B. Permalinks Incorrectos
- **Síntoma**: 404 en `/characters/details/nombre/`
- **Solución**: Verificar frontmatter del archivo con `grep "permalink:" docs/characters/details/nombre.md`
- **Corrección típica**: El permalink no coincide con la URL esperada

#### C. Enlaces .md en lugar de Jekyll
- **Síntoma**: 404 porque el enlace termina en `.md`
- **Solución**: Convertir `[texto](archivo.md)` a `[texto]({{ site.baseurl }}/ruta/)`
- **Buscar**: `grep -rn "\.md)" docs/ --include="*.md"`

#### D. Rutas Relativas Rotas
- **Síntoma**: 404 con rutas como `../../groups/`
- **Solución**: Convertir a `{{ site.baseurl }}/groups/ruta/`

#### E. Archivos Sin Frontmatter
- **Síntoma**: 404 porque Jekyll no procesó el archivo
- **Solución**: Añadir frontmatter YAML al inicio del archivo

### 3. Comandos de Diagnóstico

```bash
# Ver todos los permalinks de sesiones
grep -h "permalink:" docs/campaigns/la-fuerza-oculta/manual-notes/*.md | sort

# Ver todos los permalinks de personajes
grep -h "permalink:" docs/characters/details/*.md | sort

# Verificar imágenes existentes
ls docs/assets/img/characters/ | sort

# Buscar referencias a un texto específico
grep -rn "texto" docs/ --include="*.md"

# Buscar enlaces .md que deberían ser Jekyll
grep -rn "\.md)" docs/ --include="*.md" | head -20
```

### 4. Proceso de Corrección

1. **Identificar el archivo fuente** del enlace roto
2. **Verificar la URL destino correcta**
3. **Editar el archivo** con la corrección
4. **Verificar localmente** si es posible
5. **Documentar la corrección** en `.claude/LINKS_ROTOS.md`

### 5. Actualizar Documentación

Después de corregir enlaces, actualiza la tabla en `.claude/LINKS_ROTOS.md`:

```markdown
| Fecha | Corrección | Archivos Afectados |
|-------|------------|-------------------|
| YYYY-MM-DD | Descripción breve | archivo.md |
```

### 6. Notas Importantes

- **Case Sensitivity**: GitHub Pages (Linux) distingue mayúsculas/minúsculas
- **Evitar espacios**: En nombres de archivo
- **Preferir `{{ site.baseurl }}`**: Para todos los enlaces internos
- **Cache**: Los cambios pueden tardar en reflejarse
- **Notion exports**: Carpetas de Notion contienen caracteres especiales problemáticos

### 7. Verificación Final

Después de las correcciones, ejecutar nuevamente:

```bash
npx linkinator https://arcadia.ludobermejo.es --recurse --skip "youtube|gemini|google|github.com" --verbosity error
```

El objetivo es **0 errores 404**.

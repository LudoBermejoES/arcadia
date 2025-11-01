---
layout: page
title: "Reformatorio Nueva Esperanza - Guía del Esquema Visual"
permalink: /campaigns/aun-sin-nombre/reformatorio/README/
---

# Reformatorio Nueva Esperanza - Esquema Visual

[← Volver al Esquema](index.html)

Este directorio contiene el esquema visual de la organización del Reformatorio Nueva Esperanza en formato tldraw.

## Archivo Principal

**`reformatorio-schema.tldr`** - Diagrama organizacional completo del reformatorio

## Contenido del Esquema

### 🏝️ Estructura del Reformatorio

El diagrama incluye todas las personas relacionadas con el Reformatorio Nueva Esperanza en Isla Albedo:

#### 👤 Dirección
- **El Señor Nadie** - Director (53 años, anulación total de poderes)

#### 👥 Personal (6 personas)
- **Marcus "el Coach"** - Supervisor de Educación Física
- **Ana Flores** - Seguridad
- **Víctor Crofblob** - Profesor/Médico (50 años)
- **Daniel Quon** - Profesor
- **Elena "Frutas del Bosque"** - Psicóloga (⭐ clave para libertad)

#### 🌟 Protagonistas (3 personajes jugables)
- **Sergei** (PJ) - Metamorfo, 16-17 años, veterano del reformatorio
- **Tiritas** (Júlia Gasull) - Absorbe energía cinética, traumatizado
- **Kira** (Adriana Ferran Gonzalez) - Manipuladora eléctrica, 13-14 años

#### 👥 Internos Destacados (8 personajes con información detallada)
- **Tomás Vargas** - Conflictivo, temperamental
- **Yuki Tanaka** - Manipula hielo, bromista
- **Al Rashid** - Manipula oscuridad
- **Zara** - Niña pequeña con poderes sobre cacharros
- **Léa Dubois-Nguyen** - Se transforma al asustarse, 14-15 años
- **Jein Park** - Desaparece en oscuridad, posiblemente autista
- **Kaida Chen-Okafor** - Interno
- **Safiya Abbas-Petrov** - Interna
- **Fatima Al-Amin-Rodríguez** - Interna
- **Marcus Williams-Santos** - Interno

#### ❗ Desaparecidos (2 personas)
- **Amara Osei-Baptiste** - Empática, causaba discordia
- **Dimitri Volkov-Ramírez** - Interno

#### Otros Internos (5 adicionales)
- Jin Park-Okonkwo
- Ravi Kapoor-Müller
- Nia Thompson-Okafor
- Elio Rossi-Kim
- Luna Fernández-Zhang

**Total: ~18 internos jóvenes**

### 🔗 Relaciones Visualizadas

El diagrama muestra las siguientes conexiones:

1. **Director → Personal** - "Dirige"
2. **Director → Protagonistas** - "Supervisa"
3. **Sergei ↔ Tiritas** - Mejores amigos (competición de macarrones)
4. **Sergei → Kira** - Mentor (oreja reptante)
5. **Kira → Zara** - Se duchan juntas
6. **Víctor → Sergei** - Negociación (doble ración)

### 🔍 Misterios Documentados

- ⚠️ Tecleo misterioso nocturno
- ⚠️ Desaparición de Amara y Dimitri
- ⚠️ ¿Qué sucede realmente en Isla Albedo?

### ℹ️ Información General

- 📍 Ubicación: Isla Albedo (volcánica)
- 👥 Población: ~18 internos jóvenes
- 🏛️ Tipo: Institución de "rehabilitación"
- 🔒 Tema central: Control vs. Libertad

## Cómo Ver y Editar el Esquema

### Opción 1: Usar tldraw en línea

1. Ve a [tldraw.com](https://www.tldraw.com/)
2. Haz clic en el menú (☰) → File → Open
3. Selecciona el archivo `reformatorio-schema.tldr`
4. El diagrama se cargará automáticamente

### Opción 2: Integrar en el sitio web

Para integrar este diagrama en el sitio de GitHub Pages de Arcadia:

1. Sigue las instrucciones en `/how_to_draw_tldraw.md`
2. Implementa la aplicación React con tldraw
3. Carga el archivo `reformatorio-schema.tldr` automáticamente

### Opción 3: Editar programáticamente

El archivo `.tldr` es un JSON válido que puede ser editado:

```javascript
// Leer el archivo
const schema = JSON.parse(fs.readFileSync('reformatorio-schema.tldr', 'utf8'))

// Modificar shapes
schema.document.store['shape:sergei'].props.text = "Nuevo texto"

// Guardar
fs.writeFileSync('reformatorio-schema.tldr', JSON.stringify(schema, null, 2))
```

## Código de Colores

El diagrama usa colores para identificar roles:

- 🔴 **Rojo** - Autoridad/Peligro (Director, Desaparecidos)
- 🔵 **Azul** - Personal del reformatorio
- 🟢 **Verde** - Protagonistas (personajes jugables)
- 🟠 **Naranja** - Internos regulares
- 🟣 **Violeta** - Personal clave (Elena "Frutas del Bosque")
- ⚫ **Gris** - Información general/otros internos
- 🟡 **Amarillo** - Relaciones especiales

## Actualización del Esquema

Cuando se añadan nuevos personajes o relaciones al reformatorio:

1. Abre el archivo `.tldr` en tldraw.com
2. Añade los nuevos elementos manualmente
3. Descarga el archivo actualizado
4. Reemplaza `reformatorio-schema.tldr`

O edita el JSON directamente siguiendo el formato de shapes existentes.

## Referencias

- **Campaña**: [Reformatorio Nueva Esperanza](../index.html)
- **Esquema Visual**: [Ver Esquema Interactivo](index.html)
- **Personajes**: [Galería de Personajes]({{ site.baseurl }}/characters/gallery.html)
- **Guía tldraw**: [Documentación tldraw](/how_to_draw_tldraw.html)

---

*Última actualización: 1 de noviembre de 2025*

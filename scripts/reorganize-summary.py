#!/usr/bin/env python3
"""
Script para reorganizar el summary de La Fuerza Oculta:
1. Sesiones de última a primera (orden inverso)
2. Usar <details> para acordeones (últimas 5 abiertas, resto cerradas)
3. Usar h5 para las sesiones en lugar de h3
4. Mover "Temas Centrales y Evolución de Personajes" al final
"""

import re
from pathlib import Path

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def extract_sections(content):
    """Extrae las diferentes secciones del documento"""

    # Front matter
    front_matter_match = re.match(r'^(---\n.*?\n---\n)', content, re.DOTALL)
    front_matter = front_matter_match.group(1) if front_matter_match else ''
    content_without_fm = content[len(front_matter):] if front_matter else content

    # Encontrar secciones principales (## )
    sections = {}
    current_section = 'intro'
    current_content = []

    lines = content_without_fm.split('\n')

    for line in lines:
        if line.startswith('## '):
            if current_content:
                sections[current_section] = '\n'.join(current_content)
            current_section = line[3:].strip()
            current_content = [line]
        else:
            current_content.append(line)

    if current_content:
        sections[current_section] = '\n'.join(current_content)

    return front_matter, sections

def extract_sessions_from_section(section_content):
    """Extrae sesiones individuales de una sección"""
    sessions = []
    current_session = None
    current_lines = []

    lines = section_content.split('\n')

    for line in lines:
        # Detectar inicio de sesión (### Sesión o ### Sesiones)
        if re.match(r'^### Sesion|^### Sesión|^### Sesiones', line, re.IGNORECASE):
            if current_session:
                sessions.append({
                    'title': current_session,
                    'content': '\n'.join(current_lines).strip()
                })
            current_session = line[4:].strip()  # Quitar "### "
            current_lines = []
        elif current_session:
            current_lines.append(line)

    if current_session:
        sessions.append({
            'title': current_session,
            'content': '\n'.join(current_lines).strip()
        })

    return sessions

def get_session_number(title):
    """Extrae el número de sesión del título"""
    # Buscar patrones como "Sesión 49", "Sesiones 5-6", "Sesión Intercalada"
    match = re.search(r'Sesi[oó]n(?:es)?\s*(\d+)', title, re.IGNORECASE)
    if match:
        return int(match.group(1))
    # Para sesiones intercaladas, extraer fecha y calcular número aproximado
    # Sesión Intercalada del 23 noviembre 2025 es entre sesiones 40 y 42
    if 'Intercalada' in title:
        if '23 noviembre 2025' in title or 'noviembre 2025' in title:
            return 41  # Entre 40 y 42
        return 50  # Default alto si no tiene fecha
    return 0

def format_session_as_details(session, is_open=False):
    """Formatea una sesión como elemento <details>"""
    open_attr = ' open' if is_open else ''
    title = session['title']
    content = session['content']

    # Convertir h4 (####) a h6 dentro del contenido
    content = re.sub(r'^####\s+', '###### ', content, flags=re.MULTILINE)

    return f'''<details{open_attr}>
<summary><h5>{title}</h5></summary>

{content}

</details>
'''

def reorganize_summary(input_path, output_path=None):
    """Reorganiza el summary completo"""

    if output_path is None:
        output_path = input_path

    content = read_file(input_path)
    front_matter, sections = extract_sections(content)

    # Identificar secciones de sesiones vs otras secciones
    session_sections = []
    other_sections_before = []
    other_sections_after = []
    temas_section = None
    conexiones_section = None
    cronologia_section = None
    conclusion_section = None

    # Secciones que van al final
    final_section_names = [
        'Temas Centrales y Evolución de Personajes',
        'Conexiones con el Universo Expandido',
        'Cronología Definitiva',
        'Conclusión: De Reality Show a Transformación Espiritual'
    ]

    # Secciones que son fases con sesiones
    phase_patterns = [
        'Fase I', 'Fase II', 'Fase III', 'Fase IV',
        'Introducción'
    ]

    for section_name, section_content in sections.items():
        if section_name == 'intro':
            other_sections_before.append(('intro', section_content))
        elif any(final in section_name for final in final_section_names):
            if 'Temas Centrales' in section_name:
                temas_section = (section_name, section_content)
            elif 'Conexiones' in section_name:
                conexiones_section = (section_name, section_content)
            elif 'Cronología' in section_name:
                # La cronología puede contener sesiones también!
                cronologia_section = (section_name, section_content)
                # Extraer sesiones de la cronología si las tiene
                sessions_in_crono = extract_sessions_from_section(section_content)
                if sessions_in_crono:
                    for s in sessions_in_crono:
                        s['phase'] = 'Cronología'
                    session_sections.append((section_name + '_sessions', section_content))
            elif 'Conclusión' in section_name:
                conclusion_section = (section_name, section_content)
        elif any(phase in section_name for phase in phase_patterns):
            session_sections.append((section_name, section_content))
        else:
            # Verificar si la sección contiene sesiones (### Sesión)
            if '### Sesión' in section_content or '### Sesion' in section_content:
                session_sections.append((section_name, section_content))
            else:
                # Otras secciones van al principio
                other_sections_before.append((section_name, section_content))

    # Extraer todas las sesiones de las secciones de fases
    all_sessions = []
    for section_name, section_content in session_sections:
        sessions = extract_sessions_from_section(section_content)
        for session in sessions:
            session['phase'] = section_name
        all_sessions.extend(sessions)

    # Ordenar sesiones por número (de mayor a menor)
    all_sessions.sort(key=lambda s: get_session_number(s['title']), reverse=True)

    # Construir el nuevo documento
    output_lines = [front_matter]

    # Título e introducción
    output_lines.append('''# La Fuerza Oculta - Resumen Detallado de Campaña

*De participantes de reality show a héroes fugitivos: La evolución de seis jóvenes metahumanos*

---

## Introducción

La campaña "La Fuerza Oculta" narra la historia de seis jóvenes metahumanos que pasan de ser participantes ingenuos de un reality show a convertirse en héroes fugitivos que deben definir su propia versión de justicia. Desarrollada entre marzo de 2024 y febrero de 2026, la campaña explora temas de identidad, justicia, independencia y las consecuencias de elegir hacer lo correcto por encima de lo legal.

### Los Protagonistas

- **Justa McKomick / Sentencia** (Edu) - Tiradora experta que evoluciona hacia "Sentencia", rechazando el sistema judicial
- **Eslizón Esmeralda** (Sugus) - Metahumano reptil con habilidades de metamorfosis
- **Astrid/Kayface** (Xavi) - Joven con poderes de ilusión y creación de objetos
- **Diana** (Eslizo) - Heredera genéticamente modificada por Fatum con capacidad de detectar puntos débiles
- **Cia/Psique** (Conchi) - Telépata transgénero (Mateo) con poderes de manipulación mental
- **Hotman** (Jandro) - Metahumano con poderes de calor, hijo de familia adinerada

---

## Sesiones (de la más reciente a la más antigua)

''')

    # Añadir sesiones como acordeones
    # Las primeras 5 (más recientes) están abiertas
    for i, session in enumerate(all_sessions):
        is_open = i < 3  # Las 3 más recientes abiertas
        output_lines.append(format_session_as_details(session, is_open))

    output_lines.append('\n---\n')

    # Añadir secciones finales
    if temas_section:
        output_lines.append(f'\n## {temas_section[0]}\n')
        # Quitar el título duplicado del contenido
        content = temas_section[1]
        content = re.sub(r'^## .*\n', '', content)
        output_lines.append(content)

    if conexiones_section:
        output_lines.append(f'\n## {conexiones_section[0]}\n')
        content = conexiones_section[1]
        content = re.sub(r'^## .*\n', '', content)
        output_lines.append(content)

    if cronologia_section:
        output_lines.append(f'\n## {cronologia_section[0]}\n')
        content = cronologia_section[1]
        content = re.sub(r'^## .*\n', '', content)
        output_lines.append(content)

    if conclusion_section:
        output_lines.append(f'\n## {conclusion_section[0]}\n')
        content = conclusion_section[1]
        content = re.sub(r'^## .*\n', '', content)
        output_lines.append(content)

    # Escribir resultado
    final_content = '\n'.join(output_lines)
    write_file(output_path, final_content)
    print(f"Summary reorganizado guardado en: {output_path}")
    print(f"Total de sesiones procesadas: {len(all_sessions)}")

if __name__ == '__main__':
    script_dir = Path(__file__).parent
    project_root = script_dir.parent

    input_path = project_root / 'docs' / 'campaigns' / 'la-fuerza-oculta' / 'summary' / 'summary.md'

    reorganize_summary(input_path)

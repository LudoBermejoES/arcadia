#!/usr/bin/env python3
"""
Script para eliminar secciones específicas de los archivos de personajes del correccional.
Elimina: Ventajas y Desventajas, Equipamiento, Desarrollo y Arcos Narrativos, Potencial Narrativo
"""

import re
from pathlib import Path

# Lista de archivos de personajes del correccional
character_files = [
    "kaida-chen-okafor.md",
    "dmitri-volkov-ramirez.md",
    "amara-osei-baptiste.md",
    "safiya-abbas-petrov.md",
    "tomas-vargas-lee.md",
    "yuki-tanaka-al-rashid.md",
    "fatima-al-amin-rodriguez.md",
    "lea-dubois-nguyen.md",
    "marcus-williams-santos.md",
    "jin-park-okonkwo.md",
    "zara-qasim-kowalski.md",
    "ravi-kapoor-muller.md",
    "nia-thompson-okafor.md",
    "elio-rossi-kim.md",
    "luna-fernandez-zhang.md"
]

# Directorio de personajes
base_dir = Path("docs/characters/details")

# Secciones a eliminar (títulos exactos de nivel 2)
sections_to_remove = [
    "Ventajas y Desventajas",
    "Equipamiento",
    "Desarrollo y Arcos Narrativos",
    "Potencial Narrativo"
]

def remove_sections(content):
    """
    Elimina las secciones especificadas del contenido.
    Busca desde el título ## hasta el siguiente ## de nivel 2 (o final del archivo).
    """
    lines = content.split('\n')
    result_lines = []
    skip_mode = False
    current_section = None

    for line in lines:
        # Detectar encabezado de nivel 2
        if line.startswith('## '):
            section_title = line[3:].strip()

            # Verificar si es una sección a eliminar
            if section_title in sections_to_remove:
                skip_mode = True
                current_section = section_title
                continue
            else:
                # Es una nueva sección que no se debe eliminar
                skip_mode = False
                current_section = None

        # Solo añadir líneas si no estamos en modo skip
        if not skip_mode:
            result_lines.append(line)

    return '\n'.join(result_lines)

def main():
    """Procesa todos los archivos de personajes."""
    processed_count = 0

    for filename in character_files:
        filepath = base_dir / filename

        if not filepath.exists():
            print(f"Archivo no encontrado: {filepath}")
            continue

        # Leer archivo
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Eliminar secciones
        new_content = remove_sections(content)

        # Escribir archivo modificado
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"Procesado: {filename}")
        processed_count += 1

    print(f"\n{processed_count} archivos procesados correctamente")

if __name__ == "__main__":
    main()

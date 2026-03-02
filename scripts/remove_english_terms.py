#!/usr/bin/env python3
"""
Script para eliminar términos en inglés de los archivos de personajes del correccional.
Elimina las referencias técnicas en inglés que aparecen entre paréntesis.
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

# Patrones a eliminar (términos técnicos en inglés entre paréntesis)
patterns_to_remove = [
    r'\s*\(Energy Control - Fire\)',
    r'\s*\(Energy Control - Ice\)',
    r'\s*\(Energy Control - Electricity\)',
    r'\s*\(Force Field Generation\)',
    r'\s*\(Ranged Attack - Fire\)',
    r'\s*\(Super Speed\)',
    r'\s*\(Super Strength\)',
    r'\s*\(Shadow Control - Umbrakinesis\)',
    r'\s*\(Umbrakinesis\)',
    r'\s*\(Dream Walking - Oneiromancy\)',
    r'\s*\(Dream Walking\)',
    r'\s*\(Oneiromancy\)',
    r'\s*\(Telekinesis\)',
    r'\s*\(Empathic Manipulation\)',
    r'\s*\(Healing Touch\)',
    r'\s*\(Healing Factor\)',
    r'\s*\(Shapeshifting - Morphing\)',
    r'\s*\(Shapeshifting\)',
    r'\s*\(Morphing\)',
    r'\s*\(Phase Shifting - Intangibility\)',
    r'\s*\(Phase Shifting\)',
    r'\s*\(Intangibility\)',
    r'\s*\(Animal Empathy - Beast Friend\)',
    r'\s*\(Animal Empathy\)',
    r'\s*\(Beast Friend\)',
    r'\s*\(Light Projection\)',
    r'\s*\(Photokinesis\)',
]

def remove_english_terms(content):
    """
    Elimina los términos técnicos en inglés del contenido.
    """
    result = content

    # Aplicar cada patrón
    for pattern in patterns_to_remove:
        result = re.sub(pattern, '', result)

    return result

def main():
    """Procesa todos los archivos de personajes."""
    processed_count = 0
    total_removed = 0

    for filename in character_files:
        filepath = base_dir / filename

        if not filepath.exists():
            print(f"Archivo no encontrado: {filepath}")
            continue

        # Leer archivo
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Eliminar términos en inglés
        new_content = remove_english_terms(content)

        # Contar cuántos cambios se hicieron
        if new_content != content:
            chars_removed = len(content) - len(new_content)
            total_removed += chars_removed

            # Escribir archivo modificado
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

            print(f"Procesado: {filename} ({chars_removed} caracteres eliminados)")
            processed_count += 1
        else:
            print(f"Sin cambios: {filename}")

    print(f"\n{processed_count} archivos procesados correctamente")
    print(f"Total: {total_removed} caracteres de terminos en ingles eliminados")

if __name__ == "__main__":
    main()

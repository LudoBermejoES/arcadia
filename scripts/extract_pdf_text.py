#!/usr/bin/env python3
"""
Script para extraer el texto de cada página de un PDF a archivos TXT individuales.
Uso: python extract_pdf_text.py <archivo.pdf> [directorio_salida]
"""

import sys
from pathlib import Path

try:
    from PyPDF2 import PdfReader
except ImportError:
    print("Error: PyPDF2 no está instalado.")
    print("Instálalo con: pip install PyPDF2")
    sys.exit(1)


def extract_pdf_text(input_path: str, output_dir: str = None) -> None:
    """Extrae el texto de cada página de un PDF a archivos TXT individuales."""

    input_path = Path(input_path)

    if not input_path.exists():
        print(f"Error: El archivo '{input_path}' no existe.")
        sys.exit(1)

    # Directorio de salida: mismo que el PDF o el especificado
    if output_dir is None:
        output_dir = input_path.parent / f"{input_path.stem}_txt"
    else:
        output_dir = Path(output_dir)

    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"Leyendo: {input_path}")
    reader = PdfReader(input_path)
    total_pages = len(reader.pages)
    print(f"Total de páginas: {total_pages}")

    # Calcular el padding necesario para los números
    padding = len(str(total_pages))

    for i, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""

        output_filename = output_dir / f"{input_path.stem}_page_{str(i).zfill(padding)}.txt"

        with open(output_filename, "w", encoding="utf-8") as output_file:
            output_file.write(text)

        # Mostrar preview del contenido
        preview = text[:50].replace("\n", " ").strip()
        if len(text) > 50:
            preview += "..."
        print(f"  Página {i:>{padding}}: {output_filename.name} ({len(text)} chars)")

    print(f"\nCompletado. {total_pages} archivos TXT guardados en: {output_dir}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python extract_pdf_text.py <archivo.pdf> [directorio_salida]")
        print("Ejemplo: python extract_pdf_text.py documento.pdf ./textos/")
        sys.exit(1)

    input_file = sys.argv[1]
    output_directory = sys.argv[2] if len(sys.argv) > 2 else None

    extract_pdf_text(input_file, output_directory)

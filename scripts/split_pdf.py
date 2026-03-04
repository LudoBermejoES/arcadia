#!/usr/bin/env python3
"""
Script para dividir un PDF en páginas individuales.
Uso: python split_pdf.py <archivo.pdf> [directorio_salida]
"""

import sys
import os
from pathlib import Path

try:
    from PyPDF2 import PdfReader, PdfWriter
except ImportError:
    print("Error: PyPDF2 no está instalado.")
    print("Instálalo con: pip install PyPDF2")
    sys.exit(1)


def split_pdf(input_path: str, output_dir: str = None) -> None:
    """Divide un PDF en páginas individuales."""

    input_path = Path(input_path)

    if not input_path.exists():
        print(f"Error: El archivo '{input_path}' no existe.")
        sys.exit(1)

    # Directorio de salida: mismo que el PDF o el especificado
    if output_dir is None:
        output_dir = input_path.parent / f"{input_path.stem}_pages"
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
        writer = PdfWriter()
        writer.add_page(page)

        output_filename = output_dir / f"{input_path.stem}_page_{str(i).zfill(padding)}.pdf"

        with open(output_filename, "wb") as output_file:
            writer.write(output_file)

        print(f"  Creada: {output_filename.name}")

    print(f"\nCompletado. {total_pages} páginas guardadas en: {output_dir}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python split_pdf.py <archivo.pdf> [directorio_salida]")
        print("Ejemplo: python split_pdf.py documento.pdf ./paginas/")
        sys.exit(1)

    input_file = sys.argv[1]
    output_directory = sys.argv[2] if len(sys.argv) > 2 else None

    split_pdf(input_file, output_directory)

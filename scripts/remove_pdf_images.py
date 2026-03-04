#!/usr/bin/env python3
"""
Script para eliminar imágenes de archivos PDF.
Usa PyMuPDF (fitz) para procesar el PDF y eliminar todas las imágenes,
manteniendo solo el texto.

Uso: python remove_pdf_images.py <input.pdf> [output.pdf]
Si no se especifica output, se genera con sufijo '_no_images.pdf'
"""

import sys
import fitz  # PyMuPDF

def remove_images_from_pdf(input_path, output_path=None):
    """
    Elimina todas las imágenes de un PDF y guarda el resultado.

    Args:
        input_path: Ruta al PDF de entrada
        output_path: Ruta al PDF de salida (opcional)
    """
    if output_path is None:
        # Generar nombre de salida automáticamente
        if input_path.lower().endswith('.pdf'):
            output_path = input_path[:-4] + '_no_images.pdf'
        else:
            output_path = input_path + '_no_images.pdf'

    print(f"Procesando: {input_path}")
    print(f"Salida: {output_path}")

    # Abrir el documento
    doc = fitz.open(input_path)

    images_removed = 0

    # Iterar por cada página
    for page_num in range(len(doc)):
        page = doc[page_num]

        # Obtener lista de imágenes en la página
        image_list = page.get_images(full=True)

        if image_list:
            print(f"  Página {page_num + 1}: {len(image_list)} imagen(es) encontrada(s)")
            images_removed += len(image_list)

            # Eliminar cada imagen
            for img_index, img in enumerate(image_list):
                xref = img[0]  # xref de la imagen
                try:
                    # Redactar (eliminar) la imagen
                    page.delete_image(xref)
                except Exception as e:
                    print(f"    Advertencia: No se pudo eliminar imagen {img_index + 1}: {e}")

        # Limpiar la página
        page.clean_contents()

    # Guardar el documento modificado
    doc.save(output_path, garbage=4, deflate=True)
    doc.close()

    print(f"\nCompletado: {images_removed} imagen(es) eliminada(s)")
    print(f"Archivo guardado: {output_path}")

    return output_path

def main():
    if len(sys.argv) < 2:
        print("Uso: python remove_pdf_images.py <input.pdf> [output.pdf]")
        print("\nEjemplo:")
        print("  python remove_pdf_images.py documento.pdf")
        print("  python remove_pdf_images.py documento.pdf documento_limpio.pdf")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else None

    try:
        remove_images_from_pdf(input_path, output_path)
    except FileNotFoundError:
        print(f"Error: No se encontró el archivo '{input_path}'")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()

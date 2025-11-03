#!/usr/bin/env python3
"""
Print Sheet PDF Generator
Creates printable PDF sheets with multiple cards per page for home printing
"""

from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.units import inch
import os

# Card specifications
CARD_WIDTH_INCH = 2.5
CARD_HEIGHT_INCH = 3.5

# Print layout options
LAYOUTS = {
    'letter_3x3': {
        'pagesize': letter,
        'cards_per_row': 3,
        'cards_per_col': 3,
        'margin': 0.25  # inch
    },
    'a4_3x3': {
        'pagesize': A4,
        'cards_per_row': 3,
        'cards_per_col': 3,
        'margin': 0.25
    },
    'letter_2x3': {
        'pagesize': letter,
        'cards_per_row': 2,
        'cards_per_col': 3,
        'margin': 0.5
    }
}

def create_print_sheet(cards_dir, output_pdf, layout='letter_3x3'):
    """Create printable PDF sheet with multiple cards per page"""

    layout_config = LAYOUTS[layout]
    c = canvas.Canvas(output_pdf, pagesize=layout_config['pagesize'])

    page_width, page_height = layout_config['pagesize']
    cards_per_row = layout_config['cards_per_row']
    cards_per_col = layout_config['cards_per_col']
    margin = layout_config['margin'] * inch

    cards_per_page = cards_per_row * cards_per_col

    # Calculate card spacing
    available_width = page_width - (2 * margin)
    available_height = page_height - (2 * margin)

    spacing_x = available_width / cards_per_row
    spacing_y = available_height / cards_per_col

    # Build card list (standard deck order)
    suits_order = ['clubs', 'diamonds', 'hearts', 'spades']
    ranks_order = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

    card_files = []
    for suit in suits_order:
        for rank in ranks_order:
            card_file = f"{rank}_{suit}.png"
            card_path = os.path.join(cards_dir, card_file)
            if os.path.exists(card_path):
                card_files.append((card_path, f"{rank} of {suit}"))

    # Process cards
    page_num = 1
    for idx, (card_path, card_name) in enumerate(card_files):
        if idx > 0 and idx % cards_per_page == 0:
            c.showPage()
            page_num += 1
            print(f"Page {page_num} started...")

        # Calculate position on current page
        card_idx_on_page = idx % cards_per_page
        row = card_idx_on_page // cards_per_row
        col = card_idx_on_page % cards_per_row

        # Center cards in their cells
        x = margin + col * spacing_x + (spacing_x - CARD_WIDTH_INCH * inch) / 2
        y = page_height - margin - (row + 1) * spacing_y + (spacing_y - CARD_HEIGHT_INCH * inch) / 2

        try:
            c.drawImage(
                card_path,
                x, y,
                width=CARD_WIDTH_INCH * inch,
                height=CARD_HEIGHT_INCH * inch,
                preserveAspectRatio=True
            )
            print(f"Added card {idx + 1}/{len(card_files)}: {card_name}")
        except Exception as e:
            print(f"Error adding {card_name}: {e}")

    c.save()
    print(f"\n✓ Created print PDF: {output_pdf}")
    print(f"✓ Layout: {layout} ({cards_per_row}x{cards_per_col} cards per page)")
    print(f"✓ Pages: {page_num}")
    print(f"✓ Total cards: {len(card_files)}")

def create_card_back_sheet(cards_dir, output_pdf, layout='letter_3x3', copies=9):
    """Create PDF sheet with multiple copies of card back for printing"""

    layout_config = LAYOUTS[layout]
    c = canvas.Canvas(output_pdf, pagesize=layout_config['pagesize'])

    page_width, page_height = layout_config['pagesize']
    cards_per_row = layout_config['cards_per_row']
    cards_per_col = layout_config['cards_per_col']
    margin = layout_config['margin'] * inch

    # Calculate card spacing
    available_width = page_width - (2 * margin)
    available_height = page_height - (2 * margin)

    spacing_x = available_width / cards_per_row
    spacing_y = available_height / cards_per_col

    card_back_path = os.path.join(cards_dir, 'card_back.png')

    if not os.path.exists(card_back_path):
        print(f"Error: Card back not found at {card_back_path}")
        return

    # Fill pages with card backs
    pages_needed = (52 + copies - 1) // copies  # Ceiling division

    for page in range(pages_needed):
        for row in range(cards_per_col):
            for col in range(cards_per_row):
                x = margin + col * spacing_x + (spacing_x - CARD_WIDTH_INCH * inch) / 2
                y = page_height - margin - (row + 1) * spacing_y + (spacing_y - CARD_HEIGHT_INCH * inch) / 2

                c.drawImage(
                    card_back_path,
                    x, y,
                    width=CARD_WIDTH_INCH * inch,
                    height=CARD_HEIGHT_INCH * inch,
                    preserveAspectRatio=True
                )

        if page < pages_needed - 1:
            c.showPage()

    c.save()
    print(f"\n✓ Created card back sheet: {output_pdf}")
    print(f"✓ Pages: {pages_needed}")

def main():
    """Main function to generate print PDFs"""

    script_dir = os.path.dirname(os.path.abspath(__file__))
    cards_dir = os.path.join(script_dir, 'generated_cards')
    output_dir = os.path.join(script_dir, 'print_output')

    os.makedirs(output_dir, exist_ok=True)

    # Check if cards exist
    if not os.path.exists(cards_dir):
        print(f"Error: Cards directory not found: {cards_dir}")
        print("Please run generate_cards.py first!")
        return

    # Create face sheet (US Letter, 3x3 layout)
    print("Creating card faces PDF (3x3 per page)...")
    face_output = os.path.join(output_dir, 'arcadia_deck_faces_3x3.pdf')
    create_print_sheet(cards_dir, face_output, layout='letter_3x3')

    # Create back sheet
    print("\nCreating card backs PDF (3x3 per page)...")
    back_output = os.path.join(output_dir, 'arcadia_deck_backs_3x3.pdf')
    create_card_back_sheet(cards_dir, back_output, layout='letter_3x3', copies=9)

    print(f"\n✓ Print PDFs ready in: {output_dir}")
    print(f"\nPrinting instructions:")
    print(f"  1. Print faces PDF on cardstock (300gsm recommended)")
    print(f"  2. Flip paper and print backs PDF on reverse side")
    print(f"  3. Cut cards carefully with hobby knife and ruler")
    print(f"  4. Optional: Round corners with corner rounder punch")

if __name__ == "__main__":
    main()

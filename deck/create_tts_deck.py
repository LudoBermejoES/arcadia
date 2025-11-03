#!/usr/bin/env python3
"""
Tabletop Simulator Deck Sheet Generator
Creates a single image sheet for Tabletop Simulator from individual cards
"""

from PIL import Image
import os

# Tabletop Simulator specifications
CARDS_PER_ROW = 10
CARDS_PER_COL = 7
MAX_CARDS = CARDS_PER_ROW * CARDS_PER_COL  # 70 cards

# Card dimensions (should match generated cards)
CARD_WIDTH = 750
CARD_HEIGHT = 1050

# Sheet dimensions
SHEET_WIDTH = CARD_WIDTH * CARDS_PER_ROW
SHEET_HEIGHT = CARD_HEIGHT * CARDS_PER_COL

def create_tts_sheet(cards_dir, output_file):
    """Create a Tabletop Simulator deck sheet from individual cards"""

    # Create blank sheet
    sheet = Image.new('RGB', (SHEET_WIDTH, SHEET_HEIGHT), (255, 255, 255))

    # Card order for a standard deck (suits alphabetically: clubs, diamonds, hearts, spades)
    suits_order = ['clubs', 'diamonds', 'hearts', 'spades']
    ranks_order = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

    # Build card list in order
    card_files = []
    for suit in suits_order:
        for rank in ranks_order:
            card_file = f"{rank}_{suit}.png"
            card_path = os.path.join(cards_dir, card_file)
            if os.path.exists(card_path):
                card_files.append(card_path)
            else:
                print(f"Warning: Card not found: {card_file}")

    # Add card back as the last card (position 69, index 69)
    card_back_path = os.path.join(cards_dir, 'card_back.png')
    if os.path.exists(card_back_path):
        card_files.append(card_back_path)

    # Place cards on sheet
    for idx, card_path in enumerate(card_files):
        if idx >= MAX_CARDS:
            print(f"Warning: More than {MAX_CARDS} cards, some will be skipped")
            break

        # Calculate position
        row = idx // CARDS_PER_ROW
        col = idx % CARDS_PER_ROW

        x = col * CARD_WIDTH
        y = row * CARD_HEIGHT

        # Load and paste card
        try:
            card = Image.open(card_path)
            sheet.paste(card, (x, y))
            print(f"Added card {idx + 1}/{len(card_files)}: {os.path.basename(card_path)}")
        except Exception as e:
            print(f"Error loading {card_path}: {e}")

    # Save sheet
    sheet.save(output_file, 'PNG', dpi=(300, 300))
    print(f"\n✓ Created TTS deck sheet: {output_file}")
    print(f"✓ Dimensions: {SHEET_WIDTH}x{SHEET_HEIGHT}px")
    print(f"✓ Cards: {min(len(card_files), MAX_CARDS)}")
    print(f"\nTo use in Tabletop Simulator:")
    print(f"  1. Upload {os.path.basename(output_file)} to an image host (imgur, etc.)")
    print(f"  2. In TTS, Objects > Components > Custom > Custom Deck")
    print(f"  3. Paste image URL")
    print(f"  4. Set Face: {output_file.replace('_face', '_back') if '_face' in output_file else output_file}")
    print(f"  5. Width: 10, Height: 7")

def create_tts_face_and_back():
    """Create separate face and back sheets for TTS"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    cards_dir = os.path.join(script_dir, 'generated_cards')
    output_dir = os.path.join(script_dir, 'tts_output')

    os.makedirs(output_dir, exist_ok=True)

    # Create face sheet (all 52 cards)
    face_output = os.path.join(output_dir, 'arcadia_deck_face.png')
    print("Creating face sheet...")
    create_tts_sheet(cards_dir, face_output)

    # Create back sheet (all backs)
    print("\nCreating back sheet...")
    back_sheet = Image.new('RGB', (SHEET_WIDTH, SHEET_HEIGHT), (255, 255, 255))
    card_back_path = os.path.join(cards_dir, 'card_back.png')

    if os.path.exists(card_back_path):
        card_back = Image.open(card_back_path)

        # Fill sheet with card backs (52 cards + extras for full 70-card grid)
        for idx in range(MAX_CARDS):
            row = idx // CARDS_PER_ROW
            col = idx % CARDS_PER_ROW

            x = col * CARD_WIDTH
            y = row * CARD_HEIGHT

            back_sheet.paste(card_back, (x, y))

        back_output = os.path.join(output_dir, 'arcadia_deck_back.png')
        back_sheet.save(back_output, 'PNG', dpi=(300, 300))
        print(f"✓ Created back sheet: {back_output}")
    else:
        print(f"Warning: Card back not found at {card_back_path}")

    print(f"\n✓ TTS deck sheets ready in: {output_dir}")

def main():
    """Main function"""
    create_tts_face_and_back()

if __name__ == "__main__":
    main()

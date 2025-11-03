#!/usr/bin/env python3
"""
Arcadia Playing Cards Generator
Generates a full 52-card deck with custom character images from the Arcadia universe
"""

from PIL import Image, ImageDraw, ImageFont
import os
import json

# Card specifications (300 DPI for print quality)
CARD_WIDTH = 750   # 2.5 inches at 300 DPI
CARD_HEIGHT = 1050  # 3.5 inches at 300 DPI
BLEED = 37         # 0.125 inches bleed
SAFE_ZONE = 50     # Safe zone for important elements
CORNER_RADIUS = 41 # 3.5mm rounded corners

# Card background color (RGB) - #630356
CARD_BACKGROUND_COLOR = (99, 3, 86)  # Deep Purple

# Card definitions
SUITS = {
    'spades': '♠',
    'hearts': '♥',
    'diamonds': '♦',
    'clubs': '♣'
}

RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

# Color mapping
SUIT_COLORS = {
    'spades': (218, 165, 32),   # Golden (Goldenrod)
    'hearts': (220, 20, 60),     # Crimson Red
    'diamonds': (220, 20, 60),   # Crimson Red
    'clubs': (218, 165, 32)      # Golden (Goldenrod)
}

def create_rounded_rectangle(size, radius, fill_color=(255, 255, 255)):
    """Create a rounded rectangle base card"""
    image = Image.new('RGBA', size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle(
        [(0, 0), size],
        radius=radius,
        fill=fill_color
    )
    return image

def add_character_image(card, character_img_path):
    """Add character image to card center, forcing 2:3 aspect ratio with center crop"""
    try:
        char_img = Image.open(character_img_path)

        # Convert to RGBA if needed
        if char_img.mode != 'RGBA':
            char_img = char_img.convert('RGBA')

        # Force 2:3 aspect ratio (width:height)
        img_width, img_height = char_img.size
        target_ratio = 2.0 / 3.0  # 0.6667
        current_ratio = img_width / img_height

        if abs(current_ratio - target_ratio) > 0.01:  # If ratio doesn't match
            if current_ratio > target_ratio:
                # Image is too wide, crop from left and right (center crop)
                new_width = int(img_height * target_ratio)
                left = (img_width - new_width) // 2
                right = left + new_width
                char_img = char_img.crop((left, 0, right, img_height))
            else:
                # Image is too tall, crop from top and bottom (center crop)
                new_height = int(img_width / target_ratio)
                top = (img_height - new_height) // 2
                bottom = top + new_height
                char_img = char_img.crop((0, top, img_width, bottom))

        # Now resize to fit card (maintaining 2:3 ratio)
        max_width = CARD_WIDTH - (2 * SAFE_ZONE)
        max_height = CARD_HEIGHT - (3 * SAFE_ZONE)

        char_img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)

        # Center the image
        x = (CARD_WIDTH - char_img.width) // 2
        y = (CARD_HEIGHT - char_img.height) // 2 + 20  # Slight offset down

        # Paste on card (purple background already set)
        card.paste(char_img, (x, y), char_img)

        return card
    except Exception as e:
        print(f"Warning: Could not load character image {character_img_path}: {e}")
        return card

def add_rank_and_suit(card, rank, suit, suit_symbol, color):
    """Add rank and suit symbols to corners"""
    draw = ImageDraw.Draw(card)

    # Load fonts (try multiple paths for cross-platform compatibility)
    rank_font = None
    suit_font = None

    font_paths = [
        # macOS
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSText.ttf",
        # Linux
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ]

    symbol_font_paths = [
        # macOS
        "/System/Library/Fonts/Apple Symbols.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        # Linux
        "/usr/share/fonts/truetype/symbola/Symbola.ttf",
    ]

    # Try to load rank font
    for font_path in font_paths:
        try:
            rank_font = ImageFont.truetype(font_path, 70)
            break
        except:
            continue

    # Try to load suit font
    for font_path in symbol_font_paths:
        try:
            suit_font = ImageFont.truetype(font_path, 60)
            break
        except:
            continue

    # Fallback to default if no fonts found
    if not rank_font:
        rank_font = ImageFont.load_default()
    if not suit_font:
        suit_font = ImageFont.load_default()

    # No background box - just text directly on purple background

    # Top-left corner
    draw.text((SAFE_ZONE, SAFE_ZONE), rank, fill=color, font=rank_font, stroke_width=2, stroke_fill=(0,0,0))
    draw.text((SAFE_ZONE + 5, SAFE_ZONE + 70), suit_symbol, fill=color, font=suit_font, stroke_width=2, stroke_fill=(0,0,0))

    # Bottom-right corner (rotated) - no white box
    temp_img = Image.new('RGBA', (120, 160), (0, 0, 0, 0))  # Transparent background
    temp_draw = ImageDraw.Draw(temp_img)
    temp_draw.text((10, 10), rank, fill=color, font=rank_font, stroke_width=2, stroke_fill=(0,0,0))
    temp_draw.text((15, 80), suit_symbol, fill=color, font=suit_font, stroke_width=2, stroke_fill=(0,0,0))
    temp_img = temp_img.rotate(180)
    card.paste(temp_img, (CARD_WIDTH - 120 - SAFE_ZONE, CARD_HEIGHT - 160 - SAFE_ZONE), temp_img)

    return card

def generate_card(rank, suit, character_img_path, output_path, character_name=""):
    """Generate a single playing card"""
    suit_symbol = SUITS[suit]
    color = SUIT_COLORS[suit]

    # Create base card with rounded corners and purple background
    card = create_rounded_rectangle((CARD_WIDTH, CARD_HEIGHT), CORNER_RADIUS, fill_color=CARD_BACKGROUND_COLOR)

    # Add character image
    card = add_character_image(card, character_img_path)

    # Add rank and suit
    card = add_rank_and_suit(card, rank, suit, suit_symbol, color)

    # Convert to RGB for saving (remove alpha channel)
    rgb_card = Image.new('RGB', card.size, (255, 255, 255))
    rgb_card.paste(card, mask=card.split()[3] if card.mode == 'RGBA' else None)

    # Save card
    rgb_card.save(output_path, 'PNG', dpi=(300, 300))
    print(f"Generated: {rank}{suit_symbol} - {character_name}")

def generate_joker(character_img_path, output_path, character_name="Joker"):
    """Generate a joker card"""

    # Create base card with rounded corners and purple background
    card = create_rounded_rectangle((CARD_WIDTH, CARD_HEIGHT), CORNER_RADIUS, fill_color=CARD_BACKGROUND_COLOR)

    # Add character image
    card = add_character_image(card, character_img_path)

    # Add "JOKER" text instead of rank/suit
    draw = ImageDraw.Draw(card)

    # Load fonts
    try:
        joker_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 80)
    except:
        joker_font = ImageFont.load_default()

    # Add "JOKER" text - no white box, directly on purple
    text = "JOKER"
    bbox = draw.textbbox((0, 0), text, font=joker_font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Top center
    text_x = (CARD_WIDTH - text_width) // 2
    text_y = SAFE_ZONE

    draw.text((text_x, text_y), text, fill=(218, 165, 32), font=joker_font, stroke_width=3, stroke_fill=(0,0,0))

    # Bottom center (rotated) - no white box
    temp_img = Image.new('RGBA', (text_width + 40, text_height + 20), (0, 0, 0, 0))  # Transparent
    temp_draw = ImageDraw.Draw(temp_img)
    temp_draw.text((20, 0), text, fill=(218, 165, 32), font=joker_font, stroke_width=3, stroke_fill=(0,0,0))
    temp_img = temp_img.rotate(180)

    bottom_x = (CARD_WIDTH - (text_width + 40)) // 2
    bottom_y = CARD_HEIGHT - SAFE_ZONE - text_height - 10
    card.paste(temp_img, (bottom_x, bottom_y), temp_img)

    # Convert to RGB for saving
    rgb_card = Image.new('RGB', card.size, (255, 255, 255))
    rgb_card.paste(card, mask=card.split()[3] if card.mode == 'RGBA' else None)

    # Save card
    rgb_card.save(output_path, 'PNG', dpi=(300, 300))
    print(f"Generated: JOKER - {character_name}")

def generate_card_back(output_path, back_image_path=None):
    """Generate symmetrical card back"""
    card = create_rounded_rectangle((CARD_WIDTH, CARD_HEIGHT), CORNER_RADIUS, fill_color=(255, 255, 255))
    draw = ImageDraw.Draw(card)

    if back_image_path and os.path.exists(back_image_path):
        back_img = Image.open(back_image_path)
        back_img = back_img.resize((CARD_WIDTH - 2*SAFE_ZONE, CARD_HEIGHT - 2*SAFE_ZONE))
        card.paste(back_img, (SAFE_ZONE, SAFE_ZONE))
    else:
        # Create default pattern - Arcadia themed
        # Outer border
        draw.rectangle(
            [SAFE_ZONE, SAFE_ZONE, CARD_WIDTH - SAFE_ZONE, CARD_HEIGHT - SAFE_ZONE],
            fill=(30, 60, 120),
            outline=(200, 180, 50),
            width=8
        )

        # Inner pattern - volcanic/island theme
        center_x = CARD_WIDTH // 2
        center_y = CARD_HEIGHT // 2

        # Concentric circles
        for i in range(5, 0, -1):
            radius = i * 50
            draw.ellipse(
                [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
                outline=(200, 180, 50),
                width=3
            )

        # Add "ARCADIA" text
        try:
            title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 60)
        except:
            title_font = ImageFont.load_default()

        text = "ARCADIA"
        bbox = draw.textbbox((0, 0), text, font=title_font)
        text_width = bbox[2] - bbox[0]
        text_x = (CARD_WIDTH - text_width) // 2
        text_y = center_y - 30

        draw.text((text_x, text_y), text, fill=(200, 180, 50), font=title_font)

    # Convert to RGB
    rgb_card = Image.new('RGB', card.size, (255, 255, 255))
    rgb_card.paste(card, mask=card.split()[3] if card.mode == 'RGBA' else None)

    rgb_card.save(output_path, 'PNG', dpi=(300, 300))
    print(f"Generated card back: {output_path}")

def load_character_mapping(mapping_file):
    """Load character assignments from JSON file"""
    with open(mapping_file, 'r', encoding='utf-8') as f:
        return json.load(f)

def main():
    """Main function to generate full deck"""

    # Paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    chars_path = os.path.join(script_dir, '..', 'docs', 'assets', 'img', 'characters')
    output_dir = os.path.join(script_dir, 'generated_cards')
    mapping_file = os.path.join(script_dir, 'character_assignments.json')

    os.makedirs(output_dir, exist_ok=True)

    # Load character mapping
    if not os.path.exists(mapping_file):
        print(f"Error: Character mapping file not found: {mapping_file}")
        print("Please create character_assignments.json first!")
        return

    character_map = load_character_mapping(mapping_file)

    # Fallback character for unmapped cards
    fallback_character = 'Arcadio.png'

    # Generate all 52 cards
    card_count = 0
    for suit in SUITS.keys():
        for rank in RANKS:
            card_key = f"{rank}_{suit}"

            # Get character assignment
            if card_key not in character_map:
                print(f"Warning: No character assigned for {card_key}, using fallback")
                char_info = {"file": fallback_character, "name": "Unknown"}
            else:
                char_info = character_map[card_key]

            char_file = char_info["file"]
            char_name = char_info.get("name", "Unknown")
            char_path = os.path.join(chars_path, char_file)

            # Check if character image exists
            if not os.path.exists(char_path):
                print(f"Warning: Character image not found: {char_path}")
                char_path = os.path.join(chars_path, fallback_character)

            # Output filename
            output_file = os.path.join(output_dir, f"{rank}_{suit}.png")

            # Generate card
            generate_card(rank, suit, char_path, output_file, char_name)
            card_count += 1

    # Generate jokers
    for joker_key in ['joker_1', 'joker_2']:
        if joker_key in character_map:
            char_info = character_map[joker_key]
            char_file = char_info["file"]
            char_name = char_info.get("name", "Joker")
            char_path = os.path.join(chars_path, char_file)

            if not os.path.exists(char_path):
                print(f"Warning: Joker character image not found: {char_path}")
                char_path = os.path.join(chars_path, fallback_character)

            output_file = os.path.join(output_dir, f"{joker_key}.png")
            generate_joker(char_path, output_file, char_name)
            card_count += 1

    # Generate card back
    back_output = os.path.join(output_dir, 'card_back.png')
    generate_card_back(back_output)

    print(f"\n✓ Generated {card_count} cards + card back in {output_dir}")
    print(f"✓ Standard deck: 52 cards + 2 jokers = 54 total")
    print(f"✓ All cards are 750x1050px @ 300 DPI (2.5\" × 3.5\")")
    print(f"\nNext steps:")
    print(f"  1. Review generated cards in: {output_dir}")
    print(f"  2. For printing: Upload to MakePlayingCards.com")
    print(f"  3. For Tabletop Simulator: Run create_tts_deck.py")

if __name__ == "__main__":
    main()

# Arcadia Playing Cards Generator

Complete toolkit for generating custom playing cards using Arcadia character images.

## 📁 Files

- **`generate_cards.py`** - Main script to generate 52 individual card images + card back
- **`character_assignments.json`** - Maps each card (rank + suit) to a character image
- **`create_tts_deck.py`** - Creates Tabletop Simulator deck sheets
- **`create_print_pdf.py`** - Creates printable PDF sheets for home printing
- **`README.md`** - This file

## 🚀 Quick Start

### 1. Generate Cards

```bash
# Make script executable
chmod +x generate_cards.py

# Run card generator
python3 generate_cards.py
```

This creates:
- 52 individual card images (750x1050px @ 300 DPI)
- 1 card back image
- Output folder: `generated_cards/`

### 2. Review Character Assignments

Edit `character_assignments.json` to customize which character appears on each card:

```json
{
  "A_spades": {
    "file": "El Emperador Oscuro.png",
    "name": "El Emperador Oscuro",
    "category": "Villano Principal"
  },
  ...
}
```

**Current Mapping:**
- ♠ **Spades** (Black) → Villains & Antagonists
- ♥ **Hearts** (Red) → La Familia & Classic Heroes
- ♦ **Diamonds** (Red) → La Fuerza Oculta & La Cacería Salvaje
- ♣ **Clubs** (Black) → Génesis & Crematorio characters

### 3. Optional: Create Outputs

**For Tabletop Simulator:**
```bash
python3 create_tts_deck.py
```
Creates: `tts_output/arcadia_deck_face.png` and `arcadia_deck_back.png`

**For Home Printing:**
```bash
# Requires: pip install reportlab
python3 create_print_pdf.py
```
Creates: `print_output/arcadia_deck_faces_3x3.pdf` and `arcadia_deck_backs_3x3.pdf`

## 📐 Specifications

### Card Dimensions
- **Standard Poker Size**: 2.5" × 3.5" (63.5mm × 88.9mm)
- **Pixels**: 750px × 1050px @ 300 DPI
- **Format**: PNG with rounded corners
- **Corners**: 3.5mm radius

### Print Specifications
- **Resolution**: 300 DPI (print quality)
- **Bleed**: 0.125" included
- **Safe Zone**: 0.125" from edge
- **Color Mode**: RGB (convert to CMYK for professional printing)

### Suit Colors
- ♠ Spades: Black (0, 0, 0)
- ♥ Hearts: Crimson Red (220, 20, 60)
- ♦ Diamonds: Crimson Red (220, 20, 60)
- ♣ Clubs: Black (0, 0, 0)

## 📋 Requirements

### Python Version
- Python 3.7+

### Dependencies

```bash
# Required for card generation
pip install Pillow

# Optional for PDF output
pip install reportlab
```

### Character Images
- Located in: `../docs/assets/img/characters/`
- Format: PNG or JPG
- Recommended: At least 500px on shortest side
- Transparency (alpha channel) supported

## 🎨 Customization

### Modify Character Assignments

Edit `character_assignments.json`:

```json
{
  "A_spades": {
    "file": "your-character.png",
    "name": "Character Name",
    "category": "Optional Category"
  }
}
```

### Change Card Design

Edit `generate_cards.py`:

1. **Colors**: Modify `SUIT_COLORS` dictionary
2. **Fonts**: Update font paths in `add_rank_and_suit()` function
3. **Layout**: Adjust `SAFE_ZONE`, positioning in `add_character_image()`
4. **Card Back**: Customize `generate_card_back()` function

### Card Back Options

**Option 1: Use Custom Image**
```python
# In generate_cards.py main() function:
generate_card_back(back_output, back_image_path='path/to/your/image.png')
```

**Option 2: Modify Default Pattern**
Edit the `generate_card_back()` function to create your own design.

## 🖨️ Print Options

### Option 1: Home Printing

1. Run `python3 create_print_pdf.py`
2. Print on 300gsm cardstock
3. Print faces, then flip and print backs
4. Cut with hobby knife and ruler
5. Optional: Round corners with corner punch

### Option 2: Professional Printing

**MakePlayingCards.com** (Recommended)
- Cost: ~$26 for 108 cards + shipping
- Upload individual PNG files (750x1050px)
- Choose card stock (Premium smooth recommended)
- Add to cart and order

**DriveThruCards.com**
- Requires PDF format
- Premium (11.6pt) or Embossed (10.7pt) stock
- Convert RGB to CMYK before uploading

### Option 3: Digital Only (Tabletop Simulator)

1. Run `python3 create_tts_deck.py`
2. Upload `arcadia_deck_face.png` to image host (Imgur, etc.)
3. Upload `arcadia_deck_back.png` to image host
4. In TTS: Objects > Components > Custom > Custom Deck
5. Paste URLs, set Width: 10, Height: 7

## 📊 Output Structure

```
deck/
├── generate_cards.py           # Main generator
├── character_assignments.json  # Card mapping
├── create_tts_deck.py         # TTS output
├── create_print_pdf.py        # PDF output
├── README.md                  # This file
├── generated_cards/           # Individual card PNGs
│   ├── A_spades.png
│   ├── 2_spades.png
│   ├── ...
│   └── card_back.png
├── tts_output/                # Tabletop Simulator sheets
│   ├── arcadia_deck_face.png
│   └── arcadia_deck_back.png
└── print_output/              # Printable PDFs
    ├── arcadia_deck_faces_3x3.pdf
    └── arcadia_deck_backs_3x3.pdf
```

## 🐛 Troubleshooting

### Cards are blank or missing characters
- Check that character image files exist in `../docs/assets/img/characters/`
- Verify filenames in `character_assignments.json` match exactly
- Check console output for "Warning: Could not load character image"

### Fonts look wrong
- Suit symbols require Unicode fonts with playing card symbols
- macOS: Uses `/System/Library/Fonts/Apple Symbols.ttf`
- Linux: Install `fonts-symbola` package
- Falls back to default font if custom fonts not found

### PDF generation fails
```bash
pip install reportlab
```

### Images are low quality
- Ensure source character images are at least 500px
- Output is 300 DPI (print quality)
- Avoid upscaling small images

## 🎯 Character Selection Tips

**Ace Cards** (Most Important)
- Choose iconic characters or leaders
- Current: El Emperador Oscuro, Garra, Eslizón Esmeralda, Sara10

**Face Cards** (Kings, Queens, Jacks)
- Major characters with strong visual presence
- Mix of heroes and villains for balance

**Number Cards**
- Supporting characters
- Group members
- Historical figures

**Jokers** (Optional)
- Special characters (Arcadio, Barrio Gótico)
- Meta-characters
- Easter eggs

## 📝 Notes

- All cards use character images from `/docs/assets/img/characters/`
- 173 characters available to choose from
- Current deck features 52 characters across all eras
- Card back features "ARCADIA" with volcanic/island theme
- Suit colors follow traditional red/black scheme

## 🔄 Regenerating Cards

To update cards after changing assignments:

```bash
# Delete old cards
rm -rf generated_cards/

# Regenerate
python3 generate_cards.py

# Optional: Regenerate TTS/print outputs
python3 create_tts_deck.py
python3 create_print_pdf.py
```

## 📚 Resources

- **Arcadia Characters**: `/docs/characters/`
- **Character Gallery**: `/docs/characters/gallery.md`
- **Print Specs**: See comments in scripts

## 🎮 Usage Ideas

1. **Game Night**: Print and play traditional card games with Arcadia theme
2. **Tabletop Simulator**: Virtual gaming sessions
3. **Collector Item**: Frame favorite cards as art prints
4. **Campaign Tool**: Use as initiative tracker, quest markers, or random encounters
5. **Gift**: Custom deck for Arcadia RPG players

## ✨ Future Enhancements

Potential improvements:
- Alternative card layouts (tarot-style, square cards)
- Custom suits (districts instead of traditional suits)
- Animated cards for digital use
- Character stats/abilities on cards
- Multi-language support

---

**Generated by**: Claude Code
**Project**: Arcadia 15-Year Anniversary Playing Cards
**Date**: 2025

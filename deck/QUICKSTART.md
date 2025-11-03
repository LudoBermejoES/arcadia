# 🚀 Quick Start - Arcadia Playing Cards

Generate your complete Arcadia-themed deck in 3 simple steps!

## Step 1: Install Dependencies

```bash
# Install Python image library (required)
pip install Pillow

# Optional: For PDF printing
pip install reportlab
```

## Step 2: Generate Your Deck

```bash
cd /Users/ludo/code/arcadia/deck
python3 generate_cards.py
```

**What happens:**
- ✅ Generates 52 custom cards with Arcadia characters
- ✅ Creates card back with "ARCADIA" theme
- ✅ Saves to `generated_cards/` folder
- ✅ Each card is 750x1050px @ 300 DPI (print quality)

**Time:** ~1-2 minutes

## Step 3: Choose Your Output

### Option A: Just Browse the Cards
```bash
open generated_cards/
```
View all 52 cards + card back as individual PNG files.

### Option B: Tabletop Simulator (Digital Gaming)
```bash
python3 create_tts_deck.py
```
Creates single-sheet images for Tabletop Simulator in `tts_output/`

### Option C: Print at Home
```bash
python3 create_print_pdf.py
```
Creates ready-to-print PDFs (3x3 cards per page) in `print_output/`

### Option D: Professional Printing
1. Upload individual cards from `generated_cards/` to **MakePlayingCards.com**
2. Cost: ~$26 for 108 cards + shipping
3. Choose card stock and finish
4. Receive professional deck in 1-2 weeks

## 🎨 Customize (Optional)

### Change Character Assignments
Edit `character_assignments.json`:
```json
{
  "A_spades": {
    "file": "your-favorite-character.png",
    "name": "Character Name"
  }
}
```

### Current Deck Theme:
- ♠ **Spades** → Villains (El Emperador Oscuro, Lucifer...)
- ♥ **Hearts** → La Familia Heroes (Garra, El Faraón...)
- ♦ **Diamonds** → La Fuerza Oculta (Eslizón, Diana...)
- ♣ **Clubs** → Supporting Cast (Sara10, Marcos Villar...)

## 📋 That's It!

You now have a complete custom playing card deck featuring 52 Arcadia characters!

## ❓ Need Help?

See [README.md](README.md) for:
- Full documentation
- Troubleshooting
- Customization options
- Print specifications

---

**Total Time:** 5-10 minutes from start to finished deck! 🎉

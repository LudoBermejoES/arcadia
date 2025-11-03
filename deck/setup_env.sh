#!/bin/bash
# Setup script for Arcadia Playing Cards Generator
# Creates a Python virtual environment and installs dependencies

set -e  # Exit on error

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "🎴 Setting up Arcadia Playing Cards Generator environment..."
echo ""

# Check Python version
echo "Checking Python version..."
PYTHON_VERSION=$(python3 --version 2>&1 | grep -oE '[0-9]+\.[0-9]+')
MAJOR=$(echo $PYTHON_VERSION | cut -d. -f1)
MINOR=$(echo $PYTHON_VERSION | cut -d. -f2)

if [ "$MAJOR" -lt 3 ] || ([ "$MAJOR" -eq 3 ] && [ "$MINOR" -lt 7 ]); then
    echo "❌ Error: Python 3.7 or higher required. Found: Python $PYTHON_VERSION"
    exit 1
fi

echo "✓ Python $PYTHON_VERSION detected"
echo ""

# Create virtual environment
if [ -d "venv" ]; then
    echo "Virtual environment already exists. Removing old venv..."
    rm -rf venv
fi

echo "Creating virtual environment..."
python3 -m venv venv

echo "✓ Virtual environment created"
echo ""

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip --quiet

echo "✓ pip upgraded"
echo ""

# Install dependencies
echo "Installing dependencies..."
echo "  - Pillow (image processing)"
echo "  - reportlab (PDF generation)"
pip install -r requirements.txt

echo ""
echo "✓ All dependencies installed"
echo ""

# Verify installation
echo "Verifying installation..."
python3 -c "from PIL import Image; print('✓ Pillow:', Image.__version__)"
python3 -c "from reportlab import Version; print('✓ ReportLab:', Version)"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To use the card generator:"
echo "  1. Activate the environment: source venv/bin/activate"
echo "  2. Generate cards: python3 generate_cards.py"
echo "  3. Deactivate when done: deactivate"
echo ""
echo "Quick start:"
echo "  source venv/bin/activate && python3 generate_cards.py"

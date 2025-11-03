#!/bin/bash
# Convenience script to activate venv and run card generator

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "Please run: ./setup_env.sh"
    exit 1
fi

# Activate venv
source venv/bin/activate

# Run the generator
python3 generate_cards.py

echo ""
echo "Virtual environment still active. To deactivate: deactivate"

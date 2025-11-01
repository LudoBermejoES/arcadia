#!/bin/bash

# Script to download character Avatar images from Foundry web server

# Base URL
BASE_URL="https://ludobermejo.es:30000"
OUTPUT_DIR="/Users/ludo/code/arcadia/docs/assets/img/characters"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Character mappings: "output_filename|source_path"
declare -a CHARACTERS=(
    "Ana Flores.png|tokenizer/npc-images/guardia_de_seguridad_ana_flores_34_a_os_.Avatar.webp"
    "Daniel Kwon.png|tokenizer/npc-images/profesor_daniel_kwon_38_a_os_.Avatar.webp"
    "Elena Mora.png|tokenizer/npc-images/elena_mora.Avatar.webp"
    "Hector Ruiz.png|tokenizer/npc-images/conserje_hector_ruiz_58_a_os_.Avatar.webp"
    "Marcus Coach Williams.png|tokenizer/npc-images/entrenador_marcus_coach_williams_45_a_os_.Avatar.webp"
    "Viktor Kozlov.png|tokenizer/npc-images/guardia_de_seguridad_viktor_kozlov_41_a_os_.Avatar.webp"
    "Yuki Tanaka.png|tokenizer/npc-images/jardinero_yuki_tanaka_52_a_os_.Avatar.webp"
)

echo "Downloading character avatars from $BASE_URL..."

for entry in "${CHARACTERS[@]}"; do
    IFS='|' read -r output_name source_path <<< "$entry"

    # Full URL (without query parameters)
    full_url="$BASE_URL/$source_path"

    # Temporary webp file
    temp_webp="$OUTPUT_DIR/${output_name%.png}.webp"

    # Final output path
    full_output="$OUTPUT_DIR/$output_name"

    echo "Downloading: $output_name"

    # Download with curl (skip certificate validation if needed)
    if curl -k -f -s -o "$temp_webp" "$full_url"; then
        echo "  Downloaded successfully"

        # Convert webp to png
        if command -v sips &> /dev/null; then
            echo "  Converting webp to png..."
            sips -s format png "$temp_webp" --out "$full_output" 2>/dev/null && rm "$temp_webp"
        elif command -v convert &> /dev/null; then
            echo "  Converting webp to png (using ImageMagick)..."
            convert "$temp_webp" "$full_output" && rm "$temp_webp"
        else
            echo "  Warning: No converter found, keeping as webp"
            mv "$temp_webp" "${full_output%.png}.webp"
        fi
    else
        echo "  ERROR: Failed to download from $full_url"
    fi
done

echo "Done! Check $OUTPUT_DIR for downloaded images."
ls -lh "$OUTPUT_DIR"

#!/bin/bash

# 1. PATHS CONFIGURATION
# Update these paths to match your actual local folders
SOURCE_PHOTOS="/Users/londonrently/Documents/website-photos"
WEB_TARGET="/Users/londonrently/Documents/website/photography/images"
RAPIDRAW="/Applications/RapidRAW.app/Contents/MacOS/RapidRAW"

echo "🚀 Starting automated photography portfolio export pipeline..."

# 2. RUN RAPIDRAW FOR THE TWO SWEET-SPOT SIZES
# High-Resolution, High-Compression Desktop Assets
echo "📸 Exporting Large Desktop assets (3072px @ 68% WebP)..."
$RAPIDRAW export "$SOURCE_PHOTOS" --output "$WEB_TARGET/lg" --format webp --quality 68 --long-edge 3072

# High-Density Mobile & Grid Assets
echo "📸 Exporting Small Mobile assets (1440px @ 65% WebP)..."
$RAPIDRAW export "$SOURCE_PHOTOS" --output "$WEB_TARGET/sm" --format webp --quality 65 --long-edge 1440

echo "🧹 Cleaning up RapidRAW filename suffixes..."

# 3. RENAME LOOP: Strips '_edited' from files so they match your HTML perfectly
FOLDERS=("lg" "sm")
for FOLDER in "${FOLDERS[@]}"; do
    TARGET_DIR="$WEB_TARGET/$FOLDER"
    if [ -d "$TARGET_DIR" ]; then
        for FILE in "$TARGET_DIR"/*_edited.webp; do
            if [ -f "$FILE" ]; then
                # Strips out '_edited.webp' and replaces it with clean '.webp'
                NEW_NAME="${FILE/_edited.webp/.webp}"
                mv "$FILE" "$NEW_NAME"
            fi
        done
    fi
done

echo "✅ All responsive web images cleanly generated and matched to your HTML!"
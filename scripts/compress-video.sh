#!/usr/bin/env bash
# Compress a video for the hero matrix background.
# Usage: ./scripts/compress-video.sh <input> [output-name]
#
# Output goes to public/videos/<output-name>.mp4
# If output-name is omitted, it is derived from the input filename.

set -euo pipefail

INPUT="${1:-}"
if [[ -z "$INPUT" ]]; then
  echo "Usage: $0 <input-file> [output-name]" >&2
  exit 1
fi

if [[ ! -f "$INPUT" ]]; then
  echo "Error: file not found: $INPUT" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/../public/videos"
mkdir -p "$OUT_DIR"

if [[ -n "${2:-}" ]]; then
  BASENAME="${2%.mp4}"
else
  BASENAME="$(basename "$INPUT")"
  BASENAME="${BASENAME%.*}"
  # kebab-case: lowercase, spaces/underscores → hyphens, strip special chars
  BASENAME="$(echo "$BASENAME" | tr '[:upper:]' '[:lower:]' | tr ' _' '-' | sed 's/[^a-z0-9-]//g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')"
fi

OUTPUT="$OUT_DIR/$BASENAME.mp4"

if [[ -f "$OUTPUT" ]]; then
  read -r -p "\"$OUTPUT\" already exists. Overwrite? [y/N] " confirm
  [[ "$confirm" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 0; }
fi

echo "Compressing → $OUTPUT"

ffmpeg -i "$INPUT" \
  -vf "scale=360:360:force_original_aspect_ratio=increase,crop=360:360" \
  -an \
  -c:v libx264 \
  -crf 28 \
  -preset fast \
  -movflags +faststart \
  -pix_fmt yuv420p \
  "$OUTPUT" -y

ORIGINAL_SIZE=$(du -sh "$INPUT" | cut -f1)
OUTPUT_SIZE=$(du -sh "$OUTPUT" | cut -f1)
echo "Done: $ORIGINAL_SIZE → $OUTPUT_SIZE  ($OUTPUT)"

# Add to videos.json
JSON_FILE="$OUT_DIR/videos.json"
ENTRY="/videos/$BASENAME.mp4"

if [[ -f "$JSON_FILE" ]] && jq -e --arg e "$ENTRY" 'index($e) != null' "$JSON_FILE" > /dev/null 2>&1; then
  echo "Already in videos.json: $ENTRY"
else
  jq --arg e "$ENTRY" '. + [$e]' "$JSON_FILE" > "$JSON_FILE.tmp" && mv "$JSON_FILE.tmp" "$JSON_FILE"
  echo "Added to videos.json: $ENTRY"
fi

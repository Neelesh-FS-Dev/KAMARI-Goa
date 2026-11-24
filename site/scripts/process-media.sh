#!/usr/bin/env bash
# Derives web-ready media from the untouched originals in the parent folder.
# Originals are read-only here; outputs go to public/media. Audio is stripped
# from every video (Instagram reels may carry third-party music).
set -euo pipefail
SRC="${1:-$(cd "$(dirname "$0")/../.." && pwd)}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/media"
mkdir -p "$OUT/img" "$OUT/video" "$OUT/poster"

shopt -s nullglob
for f in "$SRC"/*.jpg; do
  base="$(basename "$f" .jpg)"
  cwebp -quiet -q 78 -resize 1080 0 -metadata none "$f" -o "$OUT/img/$base.webp"
  cwebp -quiet -q 72 -resize 640 0 -metadata none "$f" -o "$OUT/img/$base-640.webp"
done

for f in "$SRC"/*.mp4; do
  base="$(basename "$f" .mp4)"
  ffmpeg -loglevel error -y -i "$f" -an -vf "scale='min(720,iw)':-2" \
    -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart -map_metadata -1 \
    "$OUT/video/$base.mp4"
  ffmpeg -loglevel error -y -ss 0.5 -i "$f" -frames:v 1 -vf "scale='min(720,iw)':-2" \
    -q:v 4 -map_metadata -1 "$OUT/poster/$base.jpg"
done
echo "done: $(ls "$OUT/img" | wc -l) images, $(ls "$OUT/video" | wc -l) videos"

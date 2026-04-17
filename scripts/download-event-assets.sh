#!/usr/bin/env bash
set -euo pipefail

CDN="https://dsccwzlsiywaismppowf.supabase.co/storage/v1/object/public"
COVER="$CDN/event-cover-images"
PROF="$CDN/profile_images"
ORG="$CDN/organization-logos"

OUT="public/events"
AVATARS="public/events/hosts"
mkdir -p "$OUT" "$AVATARS"

# Covers
curl -fsSL -o "$OUT/nylon-coachella.jpg"  "$COVER/4b9583fc-2e37-4933-80f9-540aeae00d2d/cover.jpg"
curl -fsSL -o "$OUT/into-the-night.jpg"   "$COVER/11c00c05-1be0-4ddc-9879-ec3addae6cc3/cover.jpg"
curl -fsSL -o "$OUT/scarface-basel.jpg"   "$COVER/f0b8ae6d-435e-4bb9-8594-ea73399909ba/cover.jpg"
curl -fsSL -o "$OUT/rummiklub.jpg"        "$COVER/e0373a8c-4de0-4301-9960-eb0994c9c43e/cover.jpg"

# Host avatars / org logos
curl -fsSL -o "$AVATARS/nylon.jpg"           "$ORG/e01ddacb-7117-425c-8cf7-ae59b4acfaa7/logo_1773700032246.jpg"
curl -fsSL -o "$AVATARS/william-etundi.jpg"  "$PROF/10316ad2-d39b-4f68-b233-00b768c2407d/profile_1774467229810.jpg"
curl -fsSL -o "$AVATARS/cx.jpg"              "$ORG/c3a20979-7767-46a6-b1ba-b0b2c004a888/logo_1774462330485.jpg"
curl -fsSL -o "$AVATARS/mxu-agency.jpg"      "$PROF/0e6d21a9-8e1d-4900-be71-29d3b38dc0a7/mxu%20prof.jpg"
curl -fsSL -o "$AVATARS/marnie.jpg"          "$PROF/565c37bf-2db5-4fc2-8572-6b453db1732e/profile_1762982737729.jpg"

echo "✅ Downloaded $(ls "$OUT" | wc -l | xargs) files to $OUT (including $(ls "$AVATARS" | wc -l | xargs) avatars)"

#!/usr/bin/env bash
# Content Engine — One-time setup script

set -e

echo "==> Setting up Content Engine..."

# Install system deps
echo "==> Checking system dependencies..."
if ! command -v ffmpeg &>/dev/null; then
  echo "  Installing ffmpeg..."
  sudo apt-get install -y ffmpeg
fi

if ! command -v python3 &>/dev/null; then
  echo "  Python3 not found. Please install Python 3.10+."
  exit 1
fi

echo "==> Installing edge-tts..."
pip3 install edge-tts mutagen --quiet

echo "==> Installing server dependencies..."
npm install

echo "==> Installing client dependencies..."
cd client && npm install && cd ..

# Copy .env if not present
if [ ! -f .env ]; then
  cp .env.example .env
  echo ""
  echo "  Created .env from .env.example"
  echo "  IMPORTANT: Edit .env and add your ANTHROPIC_API_KEY"
  echo ""
fi

# Create required directories
mkdir -p data logs assets/videos assets/thumbnails /tmp/content-engine

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit .env → add ANTHROPIC_API_KEY"
echo "  2. Add social platform credentials to .env"
echo "  3. npm run dev          → start backend (port 3001)"
echo "  4. cd client && npm run dev  → start frontend (port 5173)"
echo ""

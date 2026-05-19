#!/usr/bin/env bash
set -euo pipefail

echo "Building production bundle..."
npm install
npm run build

echo "Build complete. To deploy, you can use Vercel CLI (vercel --prod) or push to your Git provider linked with Vercel."

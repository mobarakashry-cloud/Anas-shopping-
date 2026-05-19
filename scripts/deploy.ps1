Write-Host "Building production bundle..."
npm install
npm run build
Write-Host "Build complete. Use Vercel CLI: vercel --prod or deploy manually via Vercel/Git provider."

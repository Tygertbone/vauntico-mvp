# Vauntico Development Test Script
# Tests the development environment

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  VAUNTICO DEV SERVER TEST" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "[1/3] Installing dependencies..." -ForegroundColor Yellow
    pnpm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Dependency installation failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed!" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/3] Checking project structure..." -ForegroundColor Yellow

$requiredFiles = @(
    "src/App.jsx",
    "src/main.jsx",
    "src/index.css",
    "src/pages/Dashboard.jsx",
    "src/pages/CreatorPass.jsx",
    "src/pages/Vaults.jsx",
    "src/pages/DreamMover.jsx",
    "src/pages/Pricing.jsx",
    "public/index.html",
    "index.html",
    "package.json",
    "vite.config.js",
    "tailwind.config.js"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file MISSING!" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-Not $allFilesExist) {
    Write-Host ""
    Write-Host "❌ Some required files are missing!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ All required files present!" -ForegroundColor Green
Write-Host ""
Write-Host "[3/3] Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📝 Dev server will start at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🚀 Routes available:" -ForegroundColor Cyan
Write-Host "   - http://localhost:3000/" -ForegroundColor White
Write-Host "   - http://localhost:3000/creator-pass" -ForegroundColor White
Write-Host "   - http://localhost:3000/vaults" -ForegroundColor White
Write-Host "   - http://localhost:3000/dream-mover" -ForegroundColor White
Write-Host "   - http://localhost:3000/pricing" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the dev server
pnpm dev

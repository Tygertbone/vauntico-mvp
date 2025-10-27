# 🚨 EMERGENCY DEPLOYMENT SCRIPT
# This will install Vercel CLI and deploy the correct version

Write-Host "========================================" -ForegroundColor Red
Write-Host "  EMERGENCY DEPLOYMENT - VAUNTICO MVP" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red
Write-Host ""

# Step 1: Install Vercel CLI
Write-Host "📥 Step 1/4: Installing Vercel CLI..." -ForegroundColor Yellow
npm install -g vercel

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Vercel CLI installed!" -ForegroundColor Green
Write-Host ""

# Step 2: Navigate to correct directory
Write-Host "📁 Step 2/4: Navigating to project..." -ForegroundColor Yellow
$targetPath = "C:\Users\admin\vauntico-mvp\vauntico-mvp\vauntico-mvp-cursur-build"

if (Test-Path $targetPath) {
    Set-Location $targetPath
    Write-Host "✅ In correct directory!" -ForegroundColor Green
} else {
    Write-Host "❌ Directory not found: $targetPath" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 3: Verify build exists
Write-Host "🔍 Step 3/4: Checking build..." -ForegroundColor Yellow
if (-not (Test-Path "dist")) {
    Write-Host "⚠️  Building project..." -ForegroundColor Yellow
    npm run build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed!" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Build ready!" -ForegroundColor Green
Write-Host ""

# Step 4: Deploy to production
Write-Host "🚀 Step 4/4: Deploying to Vercel Production..." -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT:" -ForegroundColor Yellow
Write-Host "  When prompted:" -ForegroundColor White
Write-Host "  1. Login with your Vercel account" -ForegroundColor White
Write-Host "  2. Link to existing project if asked" -ForegroundColor White
Write-Host "  3. Confirm production deployment" -ForegroundColor White
Write-Host ""
Write-Host "Press ANY KEY to start deployment..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Write-Host ""

vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Your site is now LIVE with ALL optimizations!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Yellow
    Write-Host "   1. Copy the Vercel URL from above" -ForegroundColor White
    Write-Host "   2. Test the URL immediately" -ForegroundColor White
    Write-Host "   3. If vauntico.com still shows old site:" -ForegroundColor White
    Write-Host "      - Go to Vercel Dashboard → Domains" -ForegroundColor White
    Write-Host "      - Reassign vauntico.com to THIS deployment" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Try manual deployment:" -ForegroundColor Yellow
    Write-Host "   1. Go to: https://vercel.com/new" -ForegroundColor White
    Write-Host "   2. Import: Tygertbone/vauntico-mvp" -ForegroundColor White
    Write-Host "   3. Root Directory: vauntico-mvp-cursur-build" -ForegroundColor White
    Write-Host "   4. Click Deploy" -ForegroundColor White
    Write-Host ""
}

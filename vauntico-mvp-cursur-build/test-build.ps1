#!/usr/bin/env pwsh
# Vauntico Build Health Test Script
# Tests build integrity after Phase 2 recovery

Write-Host "🧿 Vauntico Build Health Test" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Test 1: Check source files
Write-Host "✅ Test 1: Source File Integrity" -ForegroundColor Green
$srcFiles = (git ls-files src/ | Measure-Object).Count
$publicFiles = (git ls-files public/ | Measure-Object).Count
Write-Host "   Source files tracked: $srcFiles"
Write-Host "   Public files tracked: $publicFiles"

if ($srcFiles -ge 70 -and $publicFiles -ge 4) {
    Write-Host "   ✓ PASS: Source files intact`n" -ForegroundColor Green
} else {
    Write-Host "   ✗ FAIL: Missing source files`n" -ForegroundColor Red
    exit 1
}

# Test 2: Check critical config files
Write-Host "✅ Test 2: Configuration Files" -ForegroundColor Green
$configs = @("package.json", "vite.config.js", "tailwind.config.js", "vercel.json", "index.html")
$missing = @()

foreach ($config in $configs) {
    if (Test-Path $config) {
        Write-Host "   ✓ $config exists" -ForegroundColor Gray
    } else {
        Write-Host "   ✗ $config MISSING" -ForegroundColor Red
        $missing += $config
    }
}

if ($missing.Count -eq 0) {
    Write-Host "   ✓ PASS: All config files present`n" -ForegroundColor Green
} else {
    Write-Host "   ✗ FAIL: Missing configs: $($missing -join ', ')`n" -ForegroundColor Red
    exit 1
}

# Test 3: Check for submodule corruption
Write-Host "✅ Test 3: Submodule Corruption Check" -ForegroundColor Green
$submodules = git ls-files --stage | Select-String "^160000"

if ($submodules) {
    Write-Host "   ✗ FAIL: Found gitlink entries (submodule corruption):" -ForegroundColor Red
    Write-Host "   $submodules`n" -ForegroundColor Red
    exit 1
} else {
    Write-Host "   ✓ PASS: No submodule corruption detected`n" -ForegroundColor Green
}

# Test 4: Build test
Write-Host "✅ Test 4: Build Execution" -ForegroundColor Green
Write-Host "   Running pnpm build..." -ForegroundColor Gray

$buildOutput = pnpm run build 2>&1
$buildSuccess = $LASTEXITCODE -eq 0

if ($buildSuccess) {
    Write-Host "   ✓ PASS: Build completed successfully`n" -ForegroundColor Green
    
    # Check dist output
    if (Test-Path "dist/index.html") {
        $distSize = (Get-ChildItem dist -Recurse | Measure-Object -Property Length -Sum).Sum
        $distSizeMB = [math]::Round($distSize / 1MB, 2)
        Write-Host "   Dist size: $distSizeMB MB" -ForegroundColor Gray
    }
} else {
    Write-Host "   ✗ FAIL: Build failed`n" -ForegroundColor Red
    Write-Host $buildOutput
    exit 1
}

# Test 5: Git repository status
Write-Host "✅ Test 5: Git Repository Status" -ForegroundColor Green
$gitStatus = git status --porcelain

if ([string]::IsNullOrEmpty($gitStatus)) {
    Write-Host "   ✓ PASS: Working tree clean`n" -ForegroundColor Green
} else {
    Write-Host "   ⚠ WARNING: Uncommitted changes detected`n" -ForegroundColor Yellow
}

# Final Summary
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "🎉 ALL TESTS PASSED" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "🚀 Deployment Status: READY" -ForegroundColor Green
Write-Host "📊 Build Health: 100%" -ForegroundColor Green
Write-Host "🧿 Recovery: COMPLETE`n" -ForegroundColor Green

Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Push will trigger automatic Vercel deployment" -ForegroundColor Gray
Write-Host "  2. Monitor deployment at https://vercel.com" -ForegroundColor Gray
Write-Host "  3. Verify site at https://vauntico-mvp.vercel.app/`n" -ForegroundColor Gray

exit 0

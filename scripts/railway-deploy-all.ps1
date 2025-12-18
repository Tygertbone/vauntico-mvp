# Railway Deployment Script for Vauntico Project (PowerShell Version)
# This script will redeploy all services using Railway CLI

param(
    [switch]$Force = $false
)

# Colors for output
$Colors = @{
    Red = "Red"
    Green = "Green"
    Yellow = "Yellow"
    Blue = "Blue"
    White = "White"
}

function Write-ColorText {
    param(
        [string]$Text,
        [string]$Color = "White"
    )
    Write-Host $Text -ForegroundColor $Colors[$Color]
}

function Deploy-Service {
    param(
        [string]$ServiceName,
        [string]$ServicePath
    )
    
    Write-ColorText "🔄 Redeploying $ServiceName..." "Yellow"
    
    if (Test-Path $ServicePath) {
        Set-Location $ServicePath
        
        # Check if railway.toml exists
        if (-not (Test-Path "railway.toml")) {
            Write-ColorText "❌ railway.toml not found in $ServicePath" "Red"
            Set-Location ..
            return $false
        }
        
        Write-ColorText "📍 Current directory: $(Get-Location)" "Blue"
        Write-ColorText "📋 railway.toml found, proceeding with deployment..." "Blue"
        
        try {
            # Use redeploy command with automatic yes
            "y" | railway redeploy --service $ServiceName
            Write-ColorText "✅ $ServiceName redeployed successfully" "Green"
        }
        catch {
            Write-ColorText "❌ Failed to redeploy $ServiceName" "Red"
            Write-ColorText "Error: $($_.Exception.Message)" "Red"
            Set-Location ..
            return $false
        }
        
        Set-Location ..
        Write-Host ""
        return $true
    }
    else {
        Write-ColorText "❌ Directory $ServicePath not found" "Red"
        return $false
    }
}

# Main execution
Write-ColorText "🚀 Railway Deployment Script for Vauntico Project" "Blue"
Write-Host "=================================================="
Write-Host ""

Write-ColorText "📦 Starting deployment of all services..." "Blue"
Write-Host ""

# Deploy services that we know exist
$services = @(
    @{ Name = "vauntico-fulfillment-engine"; Path = "vauntico-fulfillment-engine" },
    @{ Name = "src"; Path = "src" },
    @{ Name = "homepage-redesign"; Path = "homepage-redesign" },
    @{ Name = "vault-landing"; Path = "vault-landing" }
)

$successCount = 0
$totalCount = $services.Count

foreach ($service in $services) {
    if (Deploy-Service -ServiceName $service.Name -ServicePath $service.Path) {
        $successCount++
    }
}

Write-Host ""
Write-ColorText "🎉 Deployment process completed!" "Green"
Write-Host ""
Write-ColorText "📊 Deployment Summary:" "Blue"
Write-Host "- Successful deployments: $successCount/$totalCount"
Write-Host ""

Write-ColorText "📋 Next Steps:" "Blue"
Write-Host "1. Check Railway dashboard for deployment status"
Write-Host "2. Run smoke tests: .\scripts\railway-smoke-test.ps1"
Write-Host "3. Verify health endpoints are accessible"
Write-Host ""
Write-ColorText "🔗 Railway Dashboard: https://railway.app" "Blue"

if ($successCount -eq $totalCount) {
    Write-Host ""
    Write-ColorText "🎊 All services deployed successfully!" "Green"
    exit 0
} else {
    Write-Host ""
    Write-ColorText "⚠️  Some deployments failed. Please check the errors above." "Yellow"
    exit 1
}

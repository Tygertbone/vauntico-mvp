# Simple Railway Deployment Script for Vauntico Project
# This script will redeploy all services using Railway CLI

function Deploy-Service {
    param(
        [string]$ServiceName,
        [string]$ServicePath
    )
    
    Write-Host "Deploying $ServiceName..."
    
    if (Test-Path $ServicePath) {
        Set-Location $ServicePath
        
        # Check if railway.toml exists
        if (-not (Test-Path "railway.toml")) {
            Write-Host "ERROR: railway.toml not found in $ServicePath"
            Set-Location ..
            return $false
        }
        
        Write-Host "Current directory: $(Get-Location)"
        Write-Host "railway.toml found, proceeding with deployment..."
        
        try {
            # Use redeploy command with automatic yes
            "y" | railway redeploy --service $ServiceName
            Write-Host "SUCCESS: $ServiceName deployed successfully"
        }
        catch {
            Write-Host "ERROR: Failed to deploy $ServiceName"
            Write-Host "Error: $($_.Exception.Message)"
            Set-Location ..
            return $false
        }
        
        Set-Location ..
        Write-Host ""
        return $true
    }
    else {
        Write-Host "ERROR: Directory $ServicePath not found"
        return $false
    }
}

# Main execution
Write-Host "Railway Deployment Script for Vauntico Project"
Write-Host "=================================================="
Write-Host ""

Write-Host "Starting deployment of all services..."
Write-Host ""

# Deploy services
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
Write-Host "Deployment process completed!"
Write-Host ""
Write-Host "Deployment Summary: $successCount/$totalCount services deployed successfully"
Write-Host ""

Write-Host "Next Steps:"
Write-Host "1. Check Railway dashboard for deployment status"
Write-Host "2. Run smoke tests: .\scripts\railway-smoke-test.ps1"
Write-Host "3. Verify health endpoints are accessible"
Write-Host ""
Write-Host "Railway Dashboard: https://railway.app"

if ($successCount -eq $totalCount) {
    Write-Host ""
    Write-Host "All services deployed successfully!"
    exit 0
} else {
    Write-Host ""
    Write-Host "Some deployments failed. Please check errors above."
    exit 1
}

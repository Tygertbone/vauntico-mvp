# Railway Create and Deploy Script for Vauntico Project
# This script will create new projects and deploy all services

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

function Create-And-Deploy-Service {
    param(
        [string]$ServiceName,
        [string]$ServicePath
    )
    
    Write-ColorText "Creating and deploying $ServiceName..." "Yellow"
    
    if (Test-Path $ServicePath) {
        Set-Location $ServicePath
        
        # Check if railway.toml exists
        if (-not (Test-Path "railway.toml")) {
            Write-ColorText "railway.toml not found in $ServicePath" "Red"
            Set-Location ..
            return $false
        }
        
        Write-ColorText "Current directory: $(Get-Location)" "Blue"
        
        try {
            # Initialize new project
            Write-ColorText "Creating new Railway project: $ServiceName" "Blue"
            railway init --name $ServiceName
            
            # Deploy the service
            Write-ColorText "Deploying $ServiceName..." "Blue"
            railway up --service $ServiceName
            
            Write-ColorText "$ServiceName deployed successfully" "Green"
            return $true
        }
        catch {
            Write-ColorText "Failed to deploy $ServiceName" "Red"
            Write-ColorText "Error: $($_.Exception.Message)" "Red"
            Set-Location ..
            return $false
        }
        
        Set-Location ..
        return $true
    }
    else {
        Write-ColorText "Directory $ServicePath not found" "Red"
        return $false
    }
}

# Main execution
Write-ColorText "Railway Create and Deploy Script for Vauntico Project" "Blue"
Write-Host "======================================================="
Write-Host ""

Write-ColorText "Creating new projects and deploying all services..." "Blue"
Write-Host ""

# Deploy all services
$services = @(
    @{ Name = "vauntico-fulfillment-engine"; Path = "vauntico-fulfillment-engine" },
    @{ Name = "vauntico-app"; Path = "src" },
    @{ Name = "vauntico-homepage"; Path = "homepage-redesign" },
    @{ Name = "vauntico-vault"; Path = "vault-landing" },
    @{ Name = "vauntico-api"; Path = "server-v2" }
)

$successCount = 0
$totalCount = $services.Count

foreach ($service in $services) {
    if (Create-And-Deploy-Service -ServiceName $service.Name -ServicePath $service.Path) {
        $successCount++
    }
    Write-Host ""
}

Write-Host ""
Write-ColorText "Deployment process completed!" "Green"
Write-Host ""
Write-ColorText "Deployment Summary:" "Blue"
Write-Host "- Successful deployments: $successCount/$totalCount"
Write-Host ""

Write-ColorText "Next Steps:" "Blue"
Write-Host "1. Check Railway dashboard for deployment status"
Write-Host "2. Wait for deployments to complete (may take several minutes)"
Write-Host "3. Test health endpoints using: .\scripts\railway-health-test-v2.ps1"
Write-Host ""
Write-ColorText "Railway Dashboard: https://railway.app" "Blue"

if ($successCount -eq $totalCount) {
    Write-Host ""
    Write-ColorText "All services deployed successfully!" "Green"
    exit 0
}
else {
    Write-Host ""
    Write-ColorText "Some deployments failed. Please check the errors above." "Yellow"
    exit 1
}

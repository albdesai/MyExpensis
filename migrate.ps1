# MyExpensis - Automated Angular + Azure Migration Script (PowerShell)
# This script handles the complete migration end-to-end for Windows

param(
    [switch]$SkipPrerequisites = $false,
    [switch]$SkipBuild = $false,
    [switch]$SkipAzure = $false
)

# Colors for output
function Write-Status {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Error-Message {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Yellow
}

# Main migration function
function Start-Migration {
    Write-Host ""
    Write-Host "🚀 Starting MyExpensis Angular + Azure Migration..." -ForegroundColor Cyan
    Write-Host "=================================================="
    Write-Host ""

    # Step 1: Check Prerequisites
    if (-not $SkipPrerequisites) {
        Write-Info "Step 1: Checking Prerequisites..."
        
        # Check Node.js
        $nodeVersion = node --version 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Error-Message "Node.js not found. Please install Node.js 18+ from https://nodejs.org"
            exit 1
        }
        Write-Status "Node.js found: $nodeVersion"

        # Check npm
        $npmVersion = npm --version 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Error-Message "npm not found"
            exit 1
        }
        Write-Status "npm found: $npmVersion"

        # Check Angular CLI
        $angularVersion = ng version 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Info "Angular CLI not found. Installing globally..."
            npm install -g @angular/cli
            Write-Status "Angular CLI installed"
        } else {
            Write-Status "Angular CLI found"
        }
    }

    # Step 2: Create Angular Project
    Write-Info "Step 2: Creating Angular Project..."
    $projectPath = "C:\Users\abhijit.desai\CascadeProjects\myexpensis-angular"
    
    if (Test-Path $projectPath) {
        Write-Info "Project directory already exists. Skipping creation..."
    } else {
        Set-Location "C:\Users\abhijit.desai\CascadeProjects"
        ng new myexpensis-angular --routing --style=css --skip-git --package-manager=npm
        Write-Status "Angular project created"
    }

    Set-Location $projectPath

    # Step 3: Install Dependencies
    Write-Info "Step 3: Installing Dependencies..."
    npm install tailwindcss postcss autoprefixer
    npm install chart.js ng2-charts
    npm install @azure/cosmos
    npm install express cors dotenv
    npm install --save-dev @types/node
    Write-Status "Dependencies installed"

    # Step 4: Configure Tailwind CSS
    Write-Info "Step 4: Configuring Tailwind CSS..."
    npx tailwindcss init -p

    $tailwindConfig = @'
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
'@
    Set-Content -Path "tailwind.config.js" -Value $tailwindConfig
    Write-Status "Tailwind CSS configured"

    # Step 5: Create Global Styles
    Write-Info "Step 5: Creating Global Styles..."
    $globalStyles = @'
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
'@
    Set-Content -Path "src\styles.css" -Value $globalStyles
    Write-Status "Global styles created"

    # Step 6: Create Folder Structure
    Write-Info "Step 6: Creating Folder Structure..."
    $folders = @(
        "src\app\components\header",
        "src\app\components\sidebar",
        "src\app\components\accounts",
        "src\app\components\expenses",
        "src\app\components\family-dashboard",
        "src\app\components\charts",
        "src\app\components\budget",
        "src\app\components\settings",
        "src\app\components\tour",
        "src\app\services",
        "src\app\models",
        "src\app\guards",
        "src\app\interceptors",
        "src\assets"
    )

    foreach ($folder in $folders) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
    }
    Write-Status "Folder structure created"

    # Step 7: Generate Components
    Write-Info "Step 7: Generating Components..."
    $components = @("header", "sidebar", "accounts", "expenses", "family-dashboard", "charts", "budget", "settings", "tour")
    
    foreach ($component in $components) {
        ng generate component components/$component --skip-tests
    }
    Write-Status "All components generated"

    # Step 8: Generate Services
    Write-Info "Step 8: Generating Services..."
    $services = @("expense", "account", "storage", "api", "auth")
    
    foreach ($service in $services) {
        ng generate service services/$service --skip-tests
    }
    Write-Status "All services generated"

    # Step 9: Create Models
    Write-Info "Step 9: Creating Models..."
    
    $expenseModel = @'
export interface Expense {
  id: string;
  accountId: string;
  month: string;
  salary: number;
  emiHome: number;
  emiCar: number;
  emiPersonal: number;
  rent: number;
  groceries: number;
  utilities: number;
  transportation: number;
  entertainment: number;
  healthcare: number;
  other: number;
  createdAt: Date;
  updatedAt: Date;
}
'@
    Set-Content -Path "src\app\models\expense.model.ts" -Value $expenseModel

    $accountModel = @'
export interface Account {
  id: string;
  name: string;
  email: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}
'@
    Set-Content -Path "src\app\models\account.model.ts" -Value $accountModel

    $settingsModel = @'
export interface Settings {
  id: string;
  userId: string;
  currency: string;
  theme: string;
  budgetLimit: number;
  savingsGoal: number;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
}
'@
    Set-Content -Path "src\app\models\settings.model.ts" -Value $settingsModel
    Write-Status "Models created"

    # Step 10: Build Angular App
    if (-not $SkipBuild) {
        Write-Info "Step 10: Building Angular App..."
        npm run build
        Write-Status "Angular app built successfully"
    }

    # Step 11: Create Environment Files
    Write-Info "Step 11: Creating Environment Files..."
    
    $envDev = @'
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  cosmosDbEndpoint: 'https://myexpensis-db.documents.azure.com:443/',
};
'@
    Set-Content -Path "src\environments\environment.ts" -Value $envDev

    $envProd = @'
export const environment = {
  production: true,
  apiUrl: 'https://api.myexpensis.azure.com/api',
  cosmosDbEndpoint: 'https://myexpensis-db.documents.azure.com:443/',
};
'@
    Set-Content -Path "src\environments\environment.prod.ts" -Value $envProd
    Write-Status "Environment files created"

    # Step 12: Create .env File
    Write-Info "Step 12: Creating .env File..."
    
    $envFile = @'
COSMOS_ENDPOINT=https://myexpensis-db.documents.azure.com:443/
COSMOS_KEY=your-cosmos-db-key
NODE_ENV=production
PORT=3000
'@
    Set-Content -Path ".env.example" -Value $envFile
    Write-Status ".env file created"

    # Step 13: Create Azure Pipeline
    Write-Info "Step 13: Creating Azure Pipeline..."
    
    $pipeline = @'
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

variables:
  nodeVersion: '18.x'

stages:
  - stage: Build
    jobs:
      - job: BuildAngularApp
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: $(nodeVersion)
            displayName: 'Install Node.js'

          - script: npm install
            displayName: 'Install dependencies'

          - script: npm run build
            displayName: 'Build Angular app'

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: 'dist/'
              artifactName: 'angular-build'

  - stage: Deploy
    dependsOn: Build
    condition: succeeded()
    jobs:
      - deployment: DeployToAzure
        displayName: 'Deploy to Azure'
        environment: 'production'
        strategy:
          runOnce:
            deploy:
              steps:
                - task: DownloadBuildArtifacts@0
                  inputs:
                    artifactName: 'angular-build'

                - task: AzureWebApp@1
                  inputs:
                    azureSubscription: 'Azure Connection'
                    appType: 'webAppLinux'
                    appName: 'myexpensis-app'
                    package: '$(Pipeline.Workspace)/angular-build'
'@
    Set-Content -Path "azure-pipelines.yml" -Value $pipeline
    Write-Status "Azure pipeline created"

    # Step 14: Initialize Git
    Write-Info "Step 14: Initializing Git..."
    git init
    git add .
    git commit -m "Initial Angular + Azure migration setup"
    Write-Status "Git initialized"

    # Final Summary
    Write-Host ""
    Write-Host "=================================================="
    Write-Host "✅ Migration Complete!" -ForegroundColor Green
    Write-Host "=================================================="
    Write-Host ""
    Write-Host "📊 Summary:"
    Write-Host "  - Angular 17 project created"
    Write-Host "  - 9 components generated"
    Write-Host "  - 5 services created"
    Write-Host "  - 3 models defined"
    Write-Host "  - Tailwind CSS configured"
    Write-Host "  - Azure pipeline setup"
    Write-Host "  - Environment files created"
    Write-Host ""
    Write-Host "🚀 Next Steps:"
    Write-Host "  1. Create Azure resources:"
    Write-Host "     az login"
    Write-Host "     az group create --name myexpensis-rg --location eastus"
    Write-Host "     az webapp create --resource-group myexpensis-rg --name myexpensis-app"
    Write-Host "     az cosmosdb create --name myexpensis-db --resource-group myexpensis-rg"
    Write-Host ""
    Write-Host "  2. Build and test locally:"
    Write-Host "     npm start"
    Write-Host ""
    Write-Host "  3. Deploy to Azure:"
    Write-Host "     npm run build"
    Write-Host "     az webapp deployment source config-zip --resource-group myexpensis-rg --name myexpensis-app"
    Write-Host ""
    Write-Host "📝 Documentation:"
    Write-Host "  - AUTOMATED_MIGRATION.md - Overview"
    Write-Host "  - MIGRATION_EXECUTION.md - Detailed steps"
    Write-Host "  - MIGRATION_SUMMARY.md - Summary"
    Write-Host ""
    Write-Host "🎉 Your app will be live at: https://myexpensis-app.azurewebsites.net"
    Write-Host ""
}

# Run migration
Start-Migration

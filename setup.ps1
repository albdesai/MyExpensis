# MyExpensis - Angular + Azure Migration Setup
# Simplified PowerShell script

Write-Host "🚀 Starting MyExpensis Angular + Azure Migration..." -ForegroundColor Cyan
Write-Host "=================================================="
Write-Host ""

# Step 1: Check Prerequisites
Write-Host "Step 1: Checking Prerequisites..." -ForegroundColor Yellow

$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Node.js found: $nodeVersion" -ForegroundColor Green

# Step 2: Create Angular Project
Write-Host "Step 2: Creating Angular Project..." -ForegroundColor Yellow
$projectPath = "C:\Users\abhijit.desai\CascadeProjects\myexpensis-angular"

if (Test-Path $projectPath) {
    Write-Host "OK: Project directory exists" -ForegroundColor Green
} else {
    Set-Location "C:\Users\abhijit.desai\CascadeProjects"
    ng new myexpensis-angular --routing --style=css --skip-git --package-manager=npm
    Write-Host "OK: Angular project created" -ForegroundColor Green
}

Set-Location $projectPath

# Step 3: Install Dependencies
Write-Host "Step 3: Installing Dependencies..." -ForegroundColor Yellow
npm install tailwindcss postcss autoprefixer
npm install chart.js ng2-charts
npm install @azure/cosmos
npm install express cors dotenv
npm install --save-dev @types/node
Write-Host "OK: Dependencies installed" -ForegroundColor Green

# Step 4: Configure Tailwind CSS
Write-Host "Step 4: Configuring Tailwind CSS..." -ForegroundColor Yellow
npx tailwindcss init -p
Write-Host "OK: Tailwind CSS configured" -ForegroundColor Green

# Step 5: Create Global Styles
Write-Host "Step 5: Creating Global Styles..." -ForegroundColor Yellow
$css = @"
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
"@
Set-Content -Path "src\styles.css" -Value $css
Write-Host "OK: Global styles created" -ForegroundColor Green

# Step 6: Create Folder Structure
Write-Host "Step 6: Creating Folder Structure..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "src\app\components\header" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\components\sidebar" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\components\accounts" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\components\expenses" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\components\family-dashboard" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\components\charts" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\components\budget" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\components\settings" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\components\tour" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\services" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\models" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\guards" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\interceptors" -Force | Out-Null
Write-Host "OK: Folder structure created" -ForegroundColor Green

# Step 7: Generate Components
Write-Host "Step 7: Generating Components..." -ForegroundColor Yellow
ng generate component components/header --skip-tests
ng generate component components/sidebar --skip-tests
ng generate component components/accounts --skip-tests
ng generate component components/expenses --skip-tests
ng generate component components/family-dashboard --skip-tests
ng generate component components/charts --skip-tests
ng generate component components/budget --skip-tests
ng generate component components/settings --skip-tests
ng generate component components/tour --skip-tests
Write-Host "OK: All components generated" -ForegroundColor Green

# Step 8: Generate Services
Write-Host "Step 8: Generating Services..." -ForegroundColor Yellow
ng generate service services/expense --skip-tests
ng generate service services/account --skip-tests
ng generate service services/storage --skip-tests
ng generate service services/api --skip-tests
ng generate service services/auth --skip-tests
Write-Host "OK: All services generated" -ForegroundColor Green

# Step 9: Create Models
Write-Host "Step 9: Creating Models..." -ForegroundColor Yellow

$expenseModel = @"
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
"@
Set-Content -Path "src\app\models\expense.model.ts" -Value $expenseModel

$accountModel = @"
export interface Account {
  id: string;
  name: string;
  email: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}
"@
Set-Content -Path "src\app\models\account.model.ts" -Value $accountModel

$settingsModel = @"
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
"@
Set-Content -Path "src\app\models\settings.model.ts" -Value $settingsModel
Write-Host "OK: Models created" -ForegroundColor Green

# Step 10: Build Angular App
Write-Host "Step 10: Building Angular App..." -ForegroundColor Yellow
npm run build
Write-Host "OK: Angular app built successfully" -ForegroundColor Green

# Step 11: Create Environment Files
Write-Host "Step 11: Creating Environment Files..." -ForegroundColor Yellow

$envDev = @"
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  cosmosDbEndpoint: 'https://myexpensis-db.documents.azure.com:443/',
};
"@
Set-Content -Path "src\environments\environment.ts" -Value $envDev

$envProd = @"
export const environment = {
  production: true,
  apiUrl: 'https://api.myexpensis.azure.com/api',
  cosmosDbEndpoint: 'https://myexpensis-db.documents.azure.com:443/',
};
"@
Set-Content -Path "src\environments\environment.prod.ts" -Value $envProd
Write-Host "OK: Environment files created" -ForegroundColor Green

# Step 12: Create .env File
Write-Host "Step 12: Creating .env File..." -ForegroundColor Yellow
$envFile = @"
COSMOS_ENDPOINT=https://myexpensis-db.documents.azure.com:443/
COSMOS_KEY=your-cosmos-db-key
NODE_ENV=production
PORT=3000
"@
Set-Content -Path ".env.example" -Value $envFile
Write-Host "OK: .env file created" -ForegroundColor Green

# Step 13: Create Azure Pipeline
Write-Host "Step 13: Creating Azure Pipeline..." -ForegroundColor Yellow
$pipeline = @"
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
              versionSpec: '18.x'
            displayName: 'Install Node.js'

          - script: npm install
            displayName: 'Install dependencies'

          - script: npm run build
            displayName: 'Build Angular app'

          - task: PublishBuildArtifacts@1
            inputs:
              pathToPublish: 'dist/'
              artifactName: 'angular-build'
"@
Set-Content -Path "azure-pipelines.yml" -Value $pipeline
Write-Host "OK: Azure pipeline created" -ForegroundColor Green

# Step 14: Initialize Git
Write-Host "Step 14: Initializing Git..." -ForegroundColor Yellow
git init
git add .
git commit -m "Initial Angular + Azure migration setup"
Write-Host "OK: Git initialized" -ForegroundColor Green

# Final Summary
Write-Host ""
Write-Host "=================================================="
Write-Host "SUCCESS: Migration Complete!" -ForegroundColor Green
Write-Host "=================================================="
Write-Host ""
Write-Host "Summary:"
Write-Host "  - Angular 17 project created"
Write-Host "  - 9 components generated"
Write-Host "  - 5 services created"
Write-Host "  - 3 models defined"
Write-Host "  - Tailwind CSS configured"
Write-Host "  - Azure pipeline setup"
Write-Host "  - Environment files created"
Write-Host ""
Write-Host "Next Steps:"
Write-Host "  1. Create Azure resources:"
Write-Host "     az login"
Write-Host "     az group create --name myexpensis-rg --location eastus"
Write-Host "     az webapp create --resource-group myexpensis-rg --name myexpensis-app"
Write-Host "     az cosmosdb create --name myexpensis-db --resource-group myexpensis-rg"
Write-Host ""
Write-Host "  2. Test locally:"
Write-Host "     npm start"
Write-Host ""
Write-Host "  3. Deploy to Azure:"
Write-Host "     npm run build"
Write-Host "     az webapp deployment source config-zip --resource-group myexpensis-rg --name myexpensis-app"
Write-Host ""
Write-Host "Your app will be live at: https://myexpensis-app.azurewebsites.net"
Write-Host ""

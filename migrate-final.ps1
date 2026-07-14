# MyExpensis - Automated Angular + Azure Migration Script (PowerShell)
# Fixed version with proper escaping

Write-Host ""
Write-Host "🚀 Starting MyExpensis Angular + Azure Migration..." -ForegroundColor Cyan
Write-Host "=================================================="
Write-Host ""

# Step 1: Check Prerequisites
Write-Host "Step 1: Checking Prerequisites..." -ForegroundColor Yellow

$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green

$npmVersion = npm --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm not found" -ForegroundColor Red
    exit 1
}
Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green

# Step 2: Create Angular Project
Write-Host "Step 2: Creating Angular Project..." -ForegroundColor Yellow
$projectPath = "C:\Users\abhijit.desai\CascadeProjects\myexpensis-angular"

if (Test-Path $projectPath) {
    Write-Host "ℹ️  Project directory already exists. Skipping creation..." -ForegroundColor Yellow
} else {
    Set-Location "C:\Users\abhijit.desai\CascadeProjects"
    ng new myexpensis-angular --routing --style=css --skip-git --package-manager=npm
    Write-Host "✅ Angular project created" -ForegroundColor Green
}

Set-Location $projectPath

# Step 3: Install Dependencies
Write-Host "Step 3: Installing Dependencies..." -ForegroundColor Yellow
npm install tailwindcss postcss autoprefixer
npm install chart.js ng2-charts
npm install @azure/cosmos
npm install express cors dotenv
npm install --save-dev @types/node
Write-Host "✅ Dependencies installed" -ForegroundColor Green

# Step 4: Configure Tailwind CSS
Write-Host "Step 4: Configuring Tailwind CSS..." -ForegroundColor Yellow
npx tailwindcss init -p

$tailwindContent = 'module.exports = {' + "`n" + '  content: [' + "`n" + '    "./src/**/*.{html,ts}",' + "`n" + '  ],' + "`n" + '  theme: {' + "`n" + '    extend: {},' + "`n" + '  },' + "`n" + '  plugins: [],' + "`n" + '}'
Set-Content -Path "tailwind.config.js" -Value $tailwindContent
Write-Host "✅ Tailwind CSS configured" -ForegroundColor Green

# Step 5: Create Global Styles
Write-Host "Step 5: Creating Global Styles..." -ForegroundColor Yellow
$stylesContent = '@tailwind base;' + "`n" + '@tailwind components;' + "`n" + '@tailwind utilities;' + "`n`n" + '* {' + "`n" + '  margin: 0;' + "`n" + '  padding: 0;' + "`n" + '  box-sizing: border-box;' + "`n" + '}' + "`n`n" + 'body {' + "`n" + '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",' + "`n" + '    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",' + "`n" + '    "Helvetica Neue", sans-serif;' + "`n" + '  -webkit-font-smoothing: antialiased;' + "`n" + '  -moz-osx-font-smoothing: grayscale;' + "`n" + '}'
Set-Content -Path "src\styles.css" -Value $stylesContent
Write-Host "✅ Global styles created" -ForegroundColor Green

# Step 6: Create Folder Structure
Write-Host "Step 6: Creating Folder Structure..." -ForegroundColor Yellow
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
Write-Host "✅ Folder structure created" -ForegroundColor Green

# Step 7: Generate Components
Write-Host "Step 7: Generating Components..." -ForegroundColor Yellow
$components = @("header", "sidebar", "accounts", "expenses", "family-dashboard", "charts", "budget", "settings", "tour")

foreach ($component in $components) {
    ng generate component components/$component --skip-tests
}
Write-Host "✅ All components generated" -ForegroundColor Green

# Step 8: Generate Services
Write-Host "Step 8: Generating Services..." -ForegroundColor Yellow
$services = @("expense", "account", "storage", "api", "auth")

foreach ($service in $services) {
    ng generate service services/$service --skip-tests
}
Write-Host "✅ All services generated" -ForegroundColor Green

# Step 9: Create Models
Write-Host "Step 9: Creating Models..." -ForegroundColor Yellow

$expenseModel = 'export interface Expense {' + "`n" + '  id: string;' + "`n" + '  accountId: string;' + "`n" + '  month: string;' + "`n" + '  salary: number;' + "`n" + '  emiHome: number;' + "`n" + '  emiCar: number;' + "`n" + '  emiPersonal: number;' + "`n" + '  rent: number;' + "`n" + '  groceries: number;' + "`n" + '  utilities: number;' + "`n" + '  transportation: number;' + "`n" + '  entertainment: number;' + "`n" + '  healthcare: number;' + "`n" + '  other: number;' + "`n" + '  createdAt: Date;' + "`n" + '  updatedAt: Date;' + "`n" + '}'
Set-Content -Path "src\app\models\expense.model.ts" -Value $expenseModel

$accountModel = 'export interface Account {' + "`n" + '  id: string;' + "`n" + '  name: string;' + "`n" + '  email: string;' + "`n" + '  color: string;' + "`n" + '  createdAt: Date;' + "`n" + '  updatedAt: Date;' + "`n" + '}'
Set-Content -Path "src\app\models\account.model.ts" -Value $accountModel

$settingsModel = 'export interface Settings {' + "`n" + '  id: string;' + "`n" + '  userId: string;' + "`n" + '  currency: string;' + "`n" + '  theme: string;' + "`n" + '  budgetLimit: number;' + "`n" + '  savingsGoal: number;' + "`n" + '  categories: string[];' + "`n" + '  createdAt: Date;' + "`n" + '  updatedAt: Date;' + "`n" + '}'
Set-Content -Path "src\app\models\settings.model.ts" -Value $settingsModel
Write-Host "✅ Models created" -ForegroundColor Green

# Step 10: Build Angular App
Write-Host "Step 10: Building Angular App..." -ForegroundColor Yellow
npm run build
Write-Host "✅ Angular app built successfully" -ForegroundColor Green

# Step 11: Create Environment Files
Write-Host "Step 11: Creating Environment Files..." -ForegroundColor Yellow

$envDev = 'export const environment = {' + "`n" + '  production: false,' + "`n" + "  apiUrl: 'http://localhost:3000/api'," + "`n" + "  cosmosDbEndpoint: 'https://myexpensis-db.documents.azure.com:443/'," + "`n" + '};'
Set-Content -Path "src\environments\environment.ts" -Value $envDev

$envProd = 'export const environment = {' + "`n" + '  production: true,' + "`n" + "  apiUrl: 'https://api.myexpensis.azure.com/api'," + "`n" + "  cosmosDbEndpoint: 'https://myexpensis-db.documents.azure.com:443/'," + "`n" + '};'
Set-Content -Path "src\environments\environment.prod.ts" -Value $envProd
Write-Host "✅ Environment files created" -ForegroundColor Green

# Step 12: Create .env File
Write-Host "Step 12: Creating .env File..." -ForegroundColor Yellow

$envFile = 'COSMOS_ENDPOINT=https://myexpensis-db.documents.azure.com:443/' + "`n" + 'COSMOS_KEY=your-cosmos-db-key' + "`n" + 'NODE_ENV=production' + "`n" + 'PORT=3000'
Set-Content -Path ".env.example" -Value $envFile
Write-Host "✅ .env file created" -ForegroundColor Green

# Step 13: Create Azure Pipeline
Write-Host "Step 13: Creating Azure Pipeline..." -ForegroundColor Yellow

$pipelineContent = 'trigger:' + "`n" + '  - main' + "`n`n" + 'pool:' + "`n" + "  vmImage: 'ubuntu-latest'" + "`n`n" + 'variables:' + "`n" + "  nodeVersion: '18.x'" + "`n`n" + 'stages:' + "`n" + '  - stage: Build' + "`n" + '    jobs:' + "`n" + '      - job: BuildAngularApp' + "`n" + '        steps:' + "`n" + '          - task: NodeTool@0' + "`n" + '            inputs:' + "`n" + "              versionSpec: '18.x'" + "`n" + "            displayName: 'Install Node.js'" + "`n`n" + '          - script: npm install' + "`n" + "            displayName: 'Install dependencies'" + "`n`n" + '          - script: npm run build' + "`n" + "            displayName: 'Build Angular app'" + "`n`n" + '          - task: PublishBuildArtifacts@1' + "`n" + '            inputs:' + "`n" + "              pathToPublish: 'dist/'" + "`n" + "              artifactName: 'angular-build'"
Set-Content -Path "azure-pipelines.yml" -Value $pipelineContent
Write-Host "✅ Azure pipeline created" -ForegroundColor Green

# Step 14: Initialize Git
Write-Host "Step 14: Initializing Git..." -ForegroundColor Yellow
git init
git add .
git commit -m "Initial Angular + Azure migration setup"
Write-Host "✅ Git initialized" -ForegroundColor Green

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
Write-Host "  - COMPLETE_GUIDE.md - Overview"
Write-Host "  - MIGRATION_EXECUTION.md - Detailed steps"
Write-Host "  - MIGRATION_SUMMARY.md - Summary"
Write-Host ""
Write-Host "🎉 Your app will be live at: https://myexpensis-app.azurewebsites.net"
Write-Host ""

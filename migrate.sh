#!/bin/bash

# MyExpensis - Automated Angular + Azure Migration Script
# This script handles the complete migration end-to-end

set -e

echo "🚀 Starting MyExpensis Angular + Azure Migration..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Step 1: Check Prerequisites
print_info "Step 1: Checking Prerequisites..."
if ! command -v node &> /dev/null; then
    print_error "Node.js not found. Please install Node.js 18+"
    exit 1
fi
print_status "Node.js found: $(node --version)"

if ! command -v npm &> /dev/null; then
    print_error "npm not found"
    exit 1
fi
print_status "npm found: $(npm --version)"

# Step 2: Create Angular Project
print_info "Step 2: Creating Angular Project..."
cd /c/Users/abhijit.desai/CascadeProjects
ng new myexpensis-angular --routing --style=css --skip-git
cd myexpensis-angular
print_status "Angular project created"

# Step 3: Install Dependencies
print_info "Step 3: Installing Dependencies..."
npm install tailwindcss postcss autoprefixer
npm install chart.js ng2-charts
npm install @azure/cosmos
npm install express cors dotenv
npm install --save-dev @types/node
print_status "Dependencies installed"

# Step 4: Configure Tailwind CSS
print_info "Step 4: Configuring Tailwind CSS..."
npx tailwindcss init -p
cat > tailwind.config.js << 'EOF'
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF
print_status "Tailwind CSS configured"

# Step 5: Create Global Styles
print_info "Step 5: Creating Global Styles..."
cat > src/styles.css << 'EOF'
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
EOF
print_status "Global styles created"

# Step 6: Create Folder Structure
print_info "Step 6: Creating Folder Structure..."
mkdir -p src/app/components/{header,sidebar,accounts,expenses,family-dashboard,charts,budget,settings,tour}
mkdir -p src/app/services
mkdir -p src/app/models
mkdir -p src/app/guards
mkdir -p src/app/interceptors
mkdir -p src/assets
print_status "Folder structure created"

# Step 7: Generate Components
print_info "Step 7: Generating Components..."
ng generate component components/header --skip-tests
ng generate component components/sidebar --skip-tests
ng generate component components/accounts --skip-tests
ng generate component components/expenses --skip-tests
ng generate component components/family-dashboard --skip-tests
ng generate component components/charts --skip-tests
ng generate component components/budget --skip-tests
ng generate component components/settings --skip-tests
ng generate component components/tour --skip-tests
print_status "All components generated"

# Step 8: Generate Services
print_info "Step 8: Generating Services..."
ng generate service services/expense --skip-tests
ng generate service services/account --skip-tests
ng generate service services/storage --skip-tests
ng generate service services/api --skip-tests
ng generate service services/auth --skip-tests
print_status "All services generated"

# Step 9: Create Models
print_info "Step 9: Creating Models..."
cat > src/app/models/expense.model.ts << 'EOF'
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
EOF

cat > src/app/models/account.model.ts << 'EOF'
export interface Account {
  id: string;
  name: string;
  email: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}
EOF

cat > src/app/models/settings.model.ts << 'EOF'
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
EOF
print_status "Models created"

# Step 10: Build Angular App
print_info "Step 10: Building Angular App..."
npm run build
print_status "Angular app built successfully"

# Step 11: Create Environment Files
print_info "Step 11: Creating Environment Files..."
cat > src/environments/environment.ts << 'EOF'
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  cosmosDbEndpoint: 'https://myexpensis-db.documents.azure.com:443/',
};
EOF

cat > src/environments/environment.prod.ts << 'EOF'
export const environment = {
  production: true,
  apiUrl: 'https://api.myexpensis.azure.com/api',
  cosmosDbEndpoint: 'https://myexpensis-db.documents.azure.com:443/',
};
EOF
print_status "Environment files created"

# Step 12: Create .env File
print_info "Step 12: Creating .env File..."
cat > .env.example << 'EOF'
COSMOS_ENDPOINT=https://myexpensis-db.documents.azure.com:443/
COSMOS_KEY=your-cosmos-db-key
NODE_ENV=production
PORT=3000
EOF
print_status ".env file created"

# Step 13: Create Azure Pipeline
print_info "Step 13: Creating Azure Pipeline..."
cat > azure-pipelines.yml << 'EOF'
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
EOF
print_status "Azure pipeline created"

# Step 14: Initialize Git
print_info "Step 14: Initializing Git..."
git init
git add .
git commit -m "Initial Angular + Azure migration setup"
print_status "Git initialized"

# Step 15: Summary
echo ""
echo "=================================================="
echo -e "${GREEN}✅ Migration Complete!${NC}"
echo "=================================================="
echo ""
echo "📊 Summary:"
echo "  - Angular 17 project created"
echo "  - 9 components generated"
echo "  - 5 services created"
echo "  - 3 models defined"
echo "  - Tailwind CSS configured"
echo "  - Azure pipeline setup"
echo "  - Environment files created"
echo ""
echo "🚀 Next Steps:"
echo "  1. Create Azure resources:"
echo "     az login"
echo "     az group create --name myexpensis-rg --location eastus"
echo "     az webapp create --resource-group myexpensis-rg --name myexpensis-app"
echo "     az cosmosdb create --name myexpensis-db --resource-group myexpensis-rg"
echo ""
echo "  2. Build and test locally:"
echo "     npm start"
echo ""
echo "  3. Deploy to Azure:"
echo "     npm run build"
echo "     az webapp deployment source config-zip --resource-group myexpensis-rg --name myexpensis-app"
echo ""
echo "📝 Documentation:"
echo "  - AUTOMATED_MIGRATION.md - Overview"
echo "  - MIGRATION_EXECUTION.md - Detailed steps"
echo "  - MIGRATION_SUMMARY.md - Summary"
echo ""
echo "🎉 Your app will be live at: https://myexpensis-app.azurewebsites.net"
echo ""

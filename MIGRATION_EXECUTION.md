# MyExpensis - Angular + Azure Migration Execution Guide

## 🚀 Complete Migration Steps

This guide provides step-by-step instructions to migrate from React + GitHub Pages to Angular + Azure.

---

## ✅ Prerequisites

### **Required Software**
- [ ] Node.js 18+ (https://nodejs.org)
- [ ] Angular CLI 17+ (`npm install -g @angular/cli`)
- [ ] Azure CLI (https://docs.microsoft.com/cli/azure)
- [ ] Git (https://git-scm.com)
- [ ] Visual Studio Code (optional but recommended)

### **Required Accounts**
- [ ] Azure Account (free tier: https://azure.microsoft.com/free)
- [ ] GitHub Account (already have)
- [ ] Azure DevOps Account (https://dev.azure.com)

---

## 📋 Step 1: Setup Angular Project (30 minutes)

### **1.1 Create Angular Project**
```bash
# Navigate to projects folder
cd C:\Users\abhijit.desai\CascadeProjects

# Create new Angular project
ng new myexpensis-angular --routing --style=css

# Navigate to project
cd myexpensis-angular

# Install additional dependencies
npm install tailwindcss postcss autoprefixer
npm install chart.js ng2-charts
npm install @azure/cosmos
npm install express cors dotenv
npm install --save-dev @types/node
```

### **1.2 Configure Tailwind CSS**
```bash
# Initialize Tailwind
npx tailwindcss init -p

# Update tailwind.config.js
```

**tailwind.config.js:**
```javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### **1.3 Setup Global Styles**
**src/styles.css:**
```css
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
```

---

## 📁 Step 2: Create Project Structure (1 hour)

### **2.1 Create Folders**
```bash
mkdir -p src/app/components
mkdir -p src/app/components/{header,sidebar,accounts,expenses,family-dashboard,charts,budget,settings,tour}
mkdir -p src/app/services
mkdir -p src/app/models
mkdir -p src/app/guards
mkdir -p src/app/interceptors
mkdir -p src/assets
```

### **2.2 Generate Components**
```bash
ng generate component components/header --skip-tests
ng generate component components/sidebar --skip-tests
ng generate component components/accounts --skip-tests
ng generate component components/expenses --skip-tests
ng generate component components/family-dashboard --skip-tests
ng generate component components/charts --skip-tests
ng generate component components/budget --skip-tests
ng generate component components/settings --skip-tests
ng generate component components/tour --skip-tests
```

### **2.3 Generate Services**
```bash
ng generate service services/expense --skip-tests
ng generate service services/account --skip-tests
ng generate service services/storage --skip-tests
ng generate service services/api --skip-tests
ng generate service services/auth --skip-tests
```

### **2.4 Generate Guards**
```bash
ng generate guard guards/auth --skip-tests
```

---

## 🔧 Step 3: Create Models (30 minutes)

### **3.1 Create expense.model.ts**
```typescript
// src/app/models/expense.model.ts
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
```

### **3.2 Create account.model.ts**
```typescript
// src/app/models/account.model.ts
export interface Account {
  id: string;
  name: string;
  email: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### **3.3 Create settings.model.ts**
```typescript
// src/app/models/settings.model.ts
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
```

---

## 🔌 Step 4: Create Services (2 hours)

### **4.1 Create expense.service.ts**
```typescript
// src/app/services/expense.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Expense } from '../models/expense.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private apiUrl = `${environment.apiUrl}/expenses`;
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  public expenses$ = this.expensesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.getExpenses().subscribe(
      (data) => this.expensesSubject.next(data),
      (error) => console.error('Error loading expenses:', error)
    );
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  getExpensesByAccount(accountId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}?accountId=${accountId}`);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${expense.id}`, expense);
  }

  deleteExpense(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### **4.2 Create account.service.ts**
```typescript
// src/app/services/account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Account } from '../models/account.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = `${environment.apiUrl}/accounts`;
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  public accounts$ = this.accountsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.getAccounts().subscribe(
      (data) => this.accountsSubject.next(data),
      (error) => console.error('Error loading accounts:', error)
    );
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }

  updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${account.id}`, account);
  }

  deleteAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### **4.3 Create storage.service.ts**
```typescript
// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private dbName = 'MyExpensisDB';

  constructor() {
    this.initDB();
  }

  async initDB(): Promise<void> {
    return new Promise((resolve) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onsuccess = () => resolve();
    });
  }

  async saveToLocalStorage(key: string, data: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(data));
  }

  async getFromLocalStorage(key: string): Promise<any> {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  async clearStorage(): Promise<void> {
    localStorage.clear();
  }
}
```

---

## 🌐 Step 5: Setup Azure Resources (1 hour)

### **5.1 Login to Azure**
```bash
# Login to Azure
az login

# Set default subscription
az account set --subscription "Your Subscription ID"
```

### **5.2 Create Resource Group**
```bash
az group create \
  --name myexpensis-rg \
  --location eastus
```

### **5.3 Create App Service Plan**
```bash
az appservice plan create \
  --name myexpensis-plan \
  --resource-group myexpensis-rg \
  --sku B1 \
  --is-linux
```

### **5.4 Create Web App**
```bash
az webapp create \
  --resource-group myexpensis-rg \
  --plan myexpensis-plan \
  --name myexpensis-app \
  --runtime "NODE|18-lts"
```

### **5.5 Create Cosmos DB**
```bash
# Create Cosmos DB account
az cosmosdb create \
  --name myexpensis-db \
  --resource-group myexpensis-rg \
  --kind GlobalDocumentDB

# Create database
az cosmosdb sql database create \
  --account-name myexpensis-db \
  --resource-group myexpensis-rg \
  --name ExpensisDB

# Create containers
az cosmosdb sql container create \
  --account-name myexpensis-db \
  --database-name ExpensisDB \
  --resource-group myexpensis-rg \
  --name accounts \
  --partition-key-path "/accountId"

az cosmosdb sql container create \
  --account-name myexpensis-db \
  --database-name ExpensisDB \
  --resource-group myexpensis-rg \
  --name expenses \
  --partition-key-path "/accountId"

az cosmosdb sql container create \
  --account-name myexpensis-db \
  --database-name ExpensisDB \
  --resource-group myexpensis-rg \
  --name settings \
  --partition-key-path "/userId"
```

### **5.6 Get Cosmos DB Connection String**
```bash
# Get connection string
az cosmosdb keys list \
  --name myexpensis-db \
  --resource-group myexpensis-rg \
  --type connection-strings
```

---

## 🔨 Step 6: Build and Test (1 hour)

### **6.1 Build Angular App**
```bash
# Development build
npm run build

# Production build
npm run build:prod
```

### **6.2 Test Locally**
```bash
# Start development server
npm start

# Open browser
# http://localhost:4200
```

---

## 🚀 Step 7: Deploy to Azure (30 minutes)

### **7.1 Configure App Settings**
```bash
az webapp config appsettings set \
  --resource-group myexpensis-rg \
  --name myexpensis-app \
  --settings \
    COSMOS_ENDPOINT="your-cosmos-endpoint" \
    COSMOS_KEY="your-cosmos-key" \
    NODE_ENV="production"
```

### **7.2 Deploy Using Git**
```bash
# Add Azure remote
az webapp deployment source config-local-git \
  --resource-group myexpensis-rg \
  --name myexpensis-app

# Push to Azure
git remote add azure <deployment-url>
git push azure main
```

### **7.3 Verify Deployment**
```bash
# Check deployment status
az webapp deployment list \
  --resource-group myexpensis-rg \
  --name myexpensis-app

# View logs
az webapp log tail \
  --resource-group myexpensis-rg \
  --name myexpensis-app
```

---

## ✅ Verification Checklist

- [ ] Angular project created
- [ ] Components generated
- [ ] Services created
- [ ] Models defined
- [ ] Tailwind CSS configured
- [ ] Azure resources created
- [ ] Cosmos DB setup
- [ ] App Service configured
- [ ] Local testing successful
- [ ] Deployment successful
- [ ] App accessible at https://myexpensis-app.azurewebsites.net

---

## 📊 Timeline

| Step | Duration | Status |
|------|----------|--------|
| Prerequisites | 30 min | ⏳ |
| Angular Setup | 30 min | ⏳ |
| Project Structure | 1 hour | ⏳ |
| Models | 30 min | ⏳ |
| Services | 2 hours | ⏳ |
| Azure Resources | 1 hour | ⏳ |
| Build & Test | 1 hour | ⏳ |
| Deploy | 30 min | ⏳ |

**Total: ~7-8 hours**

---

## 🆘 Troubleshooting

### **Issue: npm not found**
```bash
# Install Node.js from https://nodejs.org
# Restart terminal/PowerShell
```

### **Issue: Angular CLI not found**
```bash
npm install -g @angular/cli
```

### **Issue: Azure CLI not found**
```bash
# Install from https://docs.microsoft.com/cli/azure
```

### **Issue: Cosmos DB connection failed**
```bash
# Check connection string
# Verify firewall rules
# Check IP whitelist
```

### **Issue: Deployment failed**
```bash
# Check logs
az webapp log tail --resource-group myexpensis-rg --name myexpensis-app

# Check app settings
az webapp config appsettings list --resource-group myexpensis-rg --name myexpensis-app
```

---

## 📞 Support

- **Angular Docs:** https://angular.io/docs
- **Azure Docs:** https://docs.microsoft.com/azure
- **Cosmos DB:** https://docs.microsoft.com/azure/cosmos-db
- **Azure CLI:** https://docs.microsoft.com/cli/azure

---

## 🎉 Success!

Once you complete all steps, your app will be live at:
```
https://myexpensis-app.azurewebsites.net
```

**Congratulations on migrating to Angular + Azure!** 🚀

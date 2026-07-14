# MyExpensis - React to Angular + Azure Migration Plan

## 📋 Migration Status

**Current Status:** React 18 + GitHub Pages  
**Target Status:** Angular 17+ + Azure Cloud  
**Timeline:** 2-3 weeks

---

## 🎯 Phase-by-Phase Migration Plan

### **Phase 1: Project Setup (Week 1)**

#### **Step 1.1: Create Angular Project Structure**
```bash
ng new myexpensis-angular
cd myexpensis-angular
npm install tailwindcss postcss autoprefixer
npm install chart.js ng2-charts
npm install @azure/cosmos
npm install @angular/common @angular/forms @angular/http
```

#### **Step 1.2: Create Folder Structure**
```
src/app/
├── components/
│   ├── header/
│   │   ├── header.component.ts
│   │   ├── header.component.html
│   │   └── header.component.css
│   ├── sidebar/
│   ├── accounts/
│   │   ├── accounts.component.ts
│   │   ├── accounts.component.html
│   │   └── accounts.component.css
│   ├── expenses/
│   │   ├── expenses.component.ts
│   │   ├── expenses.component.html
│   │   └── expenses.component.css
│   ├── family-dashboard/
│   │   ├── family-dashboard.component.ts
│   │   ├── family-dashboard.component.html
│   │   └── family-dashboard.component.css
│   ├── charts/
│   │   ├── charts.component.ts
│   │   ├── charts.component.html
│   │   └── charts.component.css
│   ├── budget/
│   │   ├── budget.component.ts
│   │   ├── budget.component.html
│   │   └── budget.component.css
│   ├── settings/
│   │   ├── settings.component.ts
│   │   ├── settings.component.html
│   │   └── settings.component.css
│   └── tour/
│       ├── tour.component.ts
│       ├── tour.component.html
│       └── tour.component.css
├── services/
│   ├── expense.service.ts
│   ├── account.service.ts
│   ├── storage.service.ts
│   ├── api.service.ts
│   └── auth.service.ts
├── models/
│   ├── expense.model.ts
│   ├── account.model.ts
│   ├── settings.model.ts
│   └── user.model.ts
├── guards/
│   └── auth.guard.ts
├── interceptors/
│   └── http.interceptor.ts
├── app.component.ts
├── app.component.html
├── app.component.css
├── app.routing.ts
└── app.module.ts
```

---

### **Phase 2: Component Migration (Week 1-2)**

#### **Step 2.1: Create Models**

**expense.model.ts**
```typescript
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

**account.model.ts**
```typescript
export interface Account {
  id: string;
  name: string;
  email: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**settings.model.ts**
```typescript
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

#### **Step 2.2: Create Services**

**expense.service.ts**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private apiUrl = 'https://api.myexpensis.azure.com/api/expenses';
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  public expenses$ = this.expensesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.http.get<Expense[]>(this.apiUrl).subscribe(
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

**account.service.ts**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = 'https://api.myexpensis.azure.com/api/accounts';
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  public accounts$ = this.accountsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.http.get<Account[]>(this.apiUrl).subscribe(
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

**storage.service.ts**
```typescript
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private dbName = 'MyExpensisDB';

  constructor() {
    this.initDB();
  }

  async initDB(): Promise<void> {
    // Initialize IndexedDB
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

### **Phase 3: Azure Setup (Week 2)**

#### **Step 3.1: Create Azure Resources**
```bash
# Login to Azure
az login

# Create resource group
az group create --name myexpensis-rg --location eastus

# Create App Service Plan
az appservice plan create \
  --name myexpensis-plan \
  --resource-group myexpensis-rg \
  --sku B1 --is-linux

# Create Web App
az webapp create \
  --resource-group myexpensis-rg \
  --plan myexpensis-plan \
  --name myexpensis-app \
  --runtime "node|18-lts"

# Create Cosmos DB
az cosmosdb create \
  --name myexpensis-db \
  --resource-group myexpensis-rg \
  --kind GlobalDocumentDB

# Create Cosmos DB Database
az cosmosdb sql database create \
  --account-name myexpensis-db \
  --resource-group myexpensis-rg \
  --name ExpensisDB

# Create Containers
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

---

### **Phase 4: Backend API (Week 2-3)**

#### **Step 4.1: Create Node.js/Express Backend**

**server.ts**
```typescript
import express from 'express';
import { CosmosClient } from '@azure/cosmos';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!
});

const database = client.database('ExpensisDB');
const accountsContainer = database.container('accounts');
const expensesContainer = database.container('expenses');
const settingsContainer = database.container('settings');

// Middleware
app.use(cors());
app.use(express.json());

// Routes - Accounts
app.get('/api/accounts', async (req, res) => {
  try {
    const { resources } = await accountsContainer.items.readAll().fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/accounts', async (req, res) => {
  try {
    const { resource } = await accountsContainer.items.create(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/accounts/:id', async (req, res) => {
  try {
    const { resource } = await accountsContainer.item(req.params.id).replace(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/accounts/:id', async (req, res) => {
  try {
    await accountsContainer.item(req.params.id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes - Expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const { resources } = await expensesContainer.items.readAll().fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    const { resource } = await expensesContainer.items.create(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/expenses/:id', async (req, res) => {
  try {
    const { resource } = await expensesContainer.item(req.params.id).replace(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    await expensesContainer.item(req.params.id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

### **Phase 5: DevOps & Deployment (Week 3)**

#### **Step 5.1: Create Azure DevOps Pipeline**

**azure-pipelines.yml**
```yaml
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
            displayName: 'Publish artifacts'

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
```

---

## 📊 Migration Checklist

### **Phase 1: Setup**
- [ ] Install Angular CLI
- [ ] Create Angular project
- [ ] Install dependencies
- [ ] Create folder structure
- [ ] Setup Tailwind CSS

### **Phase 2: Components**
- [ ] Create models
- [ ] Create services
- [ ] Create components
- [ ] Setup routing
- [ ] Migrate UI

### **Phase 3: Azure**
- [ ] Create Azure account
- [ ] Create resource group
- [ ] Create App Service
- [ ] Create Cosmos DB
- [ ] Create containers

### **Phase 4: Backend**
- [ ] Create Express server
- [ ] Setup Cosmos DB connection
- [ ] Create API endpoints
- [ ] Test endpoints
- [ ] Add error handling

### **Phase 5: DevOps**
- [ ] Create Azure DevOps project
- [ ] Create pipeline
- [ ] Connect GitHub
- [ ] Setup auto-deployment
- [ ] Test deployment

### **Phase 6: Testing**
- [ ] Test locally
- [ ] Test on Azure
- [ ] Test database
- [ ] Test API
- [ ] Performance testing

### **Phase 7: Launch**
- [ ] Setup custom domain
- [ ] Enable HTTPS
- [ ] Setup monitoring
- [ ] Setup alerts
- [ ] Launch to production

---

## 🎯 Success Criteria

✅ Angular app builds successfully
✅ Azure resources created
✅ Backend API working
✅ Database connected
✅ DevOps pipeline working
✅ App deployed to Azure
✅ All features working
✅ Performance acceptable

---

## 📈 Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Setup | 2-3 days | Pending |
| Components | 3-4 days | Pending |
| Azure | 2-3 days | Pending |
| Backend | 3-4 days | Pending |
| DevOps | 2-3 days | Pending |
| Testing | 2-3 days | Pending |
| Launch | 1-2 days | Pending |

**Total: 2-3 weeks**

---

## 💡 Key Points

1. **Backup Current Data** - Export all data before migration
2. **Test Thoroughly** - Test each component
3. **Monitor Performance** - Use Azure Monitor
4. **Plan Downtime** - Schedule migration window
5. **Document Changes** - Keep migration notes
6. **Rollback Plan** - Have backup ready

---

**Ready to start the migration?** 🚀

Follow this plan phase by phase for a smooth transition to Angular + Azure!

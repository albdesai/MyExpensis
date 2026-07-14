# Angular + Azure Quick Start Guide

## ⚡ 5-Minute Setup

### **Step 1: Create Angular Project**
```bash
# Install Angular CLI
npm install -g @angular/cli

# Create new project
ng new myexpensis-angular
cd myexpensis-angular

# Install dependencies
npm install
npm install tailwindcss postcss autoprefixer
npm install chart.js ng2-charts
npm install @azure/cosmos
```

### **Step 2: Create Azure Account**
```bash
# Go to https://azure.microsoft.com/en-us/free/
# Create free account (includes $200 credit)
# Download Azure CLI
```

### **Step 3: Create Azure Resources**
```bash
# Login
az login

# Create resource group
az group create --name myexpensis-rg --location eastus

# Create App Service
az appservice plan create \
  --name myexpensis-plan \
  --resource-group myexpensis-rg \
  --sku B1 --is-linux

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
```

### **Step 4: Build and Deploy**
```bash
# Build Angular app
ng build --configuration production

# Deploy to Azure
az webapp deployment source config-zip \
  --resource-group myexpensis-rg \
  --name myexpensis-app \
  --src dist/myexpensis-angular.zip
```

### **Step 5: Access Your App**
```
https://myexpensis-app.azurewebsites.net
```

---

## 📁 Project Structure

```
myexpensis-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── accounts/
│   │   │   ├── expenses/
│   │   │   ├── family-dashboard/
│   │   │   ├── charts/
│   │   │   ├── budget/
│   │   │   └── settings/
│   │   ├── services/
│   │   │   ├── expense.service.ts
│   │   │   ├── account.service.ts
│   │   │   └── api.service.ts
│   │   ├── models/
│   │   │   ├── expense.model.ts
│   │   │   └── account.model.ts
│   │   ├── app.component.ts
│   │   ├── app.routing.ts
│   │   └── app.module.ts
│   ├── styles/
│   │   └── styles.css
│   └── main.ts
├── angular.json
├── tsconfig.json
├── package.json
└── azure-pipelines.yml
```

---

## 🔧 Key Components

### **1. Expense Service**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private apiUrl = 'https://api.myexpensis.azure.com/api/expenses';

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addExpense(expense: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, expense);
  }

  updateExpense(expense: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${expense.id}`, expense);
  }

  deleteExpense(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### **2. Account Service**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = 'https://api.myexpensis.azure.com/api/accounts';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addAccount(account: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, account);
  }

  updateAccount(account: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${account.id}`, account);
  }

  deleteAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### **3. Main Component**
```typescript
import { Component, OnInit } from '@angular/core';
import { ExpenseService } from './services/expense.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  expenses: any[] = [];
  accounts: any[] = [];
  activeTab = 'accounts';

  constructor(
    private expenseService: ExpenseService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.loadAccounts();
    this.loadExpenses();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe(
      (data) => this.accounts = data,
      (error) => console.error('Error loading accounts:', error)
    );
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(
      (data) => this.expenses = data,
      (error) => console.error('Error loading expenses:', error)
    );
  }

  addExpense(expense: any) {
    this.expenseService.addExpense(expense).subscribe(
      () => this.loadExpenses(),
      (error) => console.error('Error adding expense:', error)
    );
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id).subscribe(
      () => this.loadExpenses(),
      (error) => console.error('Error deleting expense:', error)
    );
  }
}
```

---

## 🚀 Deployment Commands

### **Local Development**
```bash
# Start dev server
ng serve

# Open browser
# http://localhost:4200
```

### **Production Build**
```bash
# Build for production
ng build --configuration production

# Output: dist/myexpensis-angular/
```

### **Deploy to Azure**
```bash
# Deploy using Azure CLI
az webapp deployment source config-zip \
  --resource-group myexpensis-rg \
  --name myexpensis-app \
  --src dist/myexpensis-angular.zip
```

---

## 📊 Comparison: React vs Angular

| Feature | React | Angular |
|---------|-------|---------|
| **Setup Time** | 5 min | 10 min |
| **Learning Curve** | Easy | Medium |
| **Bundle Size** | ~50KB | ~150KB |
| **Performance** | Fast | Very Fast |
| **Enterprise** | Good | Excellent |
| **Community** | Large | Large |
| **TypeScript** | Optional | Built-in |
| **Routing** | React Router | @angular/router |
| **Forms** | React Hook Form | @angular/forms |
| **HTTP** | Axios | HttpClient |

---

## 💾 Database: Cosmos DB vs LocalStorage

| Feature | LocalStorage | Cosmos DB |
|---------|-------------|-----------|
| **Capacity** | 5-10MB | Unlimited |
| **Speed** | Fast | Very Fast |
| **Scalability** | Limited | Unlimited |
| **Backup** | Manual | Automatic |
| **Replication** | None | Global |
| **Cost** | Free | ~$13/month |
| **Offline** | Yes | No |
| **Sync** | None | Real-time |

---

## 🔐 Security Features

### **Azure Security**
- ✅ HTTPS by default
- ✅ DDoS protection
- ✅ Web Application Firewall
- ✅ Azure AD integration
- ✅ Encryption at rest
- ✅ Encryption in transit
- ✅ Key Vault for secrets

### **Cosmos DB Security**
- ✅ Encryption at rest
- ✅ Encryption in transit
- ✅ Role-based access control
- ✅ IP firewall
- ✅ Virtual network support
- ✅ Audit logging

---

## 📈 Scaling

Azure automatically scales your app based on demand:
- ✅ Auto-scaling based on CPU/Memory
- ✅ Global CDN for fast delivery
- ✅ Load balancing
- ✅ Database auto-scaling

---

## 🎯 Next Steps

1. **Create Angular Project** ✅
2. **Setup Azure Account** ✅
3. **Create Azure Resources** ✅
4. **Build Components** - In Progress
5. **Create Backend API** - Next
6. **Setup DevOps Pipeline** - Next
7. **Deploy to Azure** - Final

---

## 📞 Support Resources

### **Angular**
- Docs: https://angular.io
- CLI: https://angular.io/cli
- Community: https://angular.io/community

### **Azure**
- Portal: https://portal.azure.com
- Docs: https://docs.microsoft.com/azure
- CLI: https://docs.microsoft.com/cli/azure

### **Cosmos DB**
- Docs: https://docs.microsoft.com/azure/cosmos-db
- Emulator: https://docs.microsoft.com/azure/cosmos-db/local-emulator

---

## 💡 Pro Tips

1. **Use Azure Free Tier** - $200 credit for 30 days
2. **Enable Auto-Scaling** - Handle traffic spikes
3. **Use Cosmos DB Emulator** - Test locally first
4. **Setup Monitoring** - Track performance
5. **Enable Backups** - Protect your data
6. **Use Key Vault** - Secure secrets
7. **Setup CDN** - Faster content delivery

---

**Ready to go Angular + Azure?** 🚀

Start with the quick setup above and follow the full migration guide for detailed instructions!

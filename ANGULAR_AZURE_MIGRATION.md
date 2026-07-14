# MyExpensis - Angular + Azure Migration Guide

## 📋 Migration Overview

This guide covers migrating from **React + GitHub Pages** to **Angular + Azure Cloud**.

```
Current Stack          →    New Stack
─────────────────────────────────────────
React 18              →    Angular 17+
Vite                  →    Angular CLI
Tailwind CSS          →    Tailwind CSS
GitHub Pages          →    Azure App Service
GitHub Actions        →    Azure DevOps
LocalStorage          →    Azure Cosmos DB
```

---

## 🎯 Why Angular + Azure?

### **Angular Benefits**
✅ Full-featured framework (not just UI library)
✅ Built-in routing, forms, HTTP client
✅ TypeScript by default
✅ Dependency injection
✅ Better for enterprise apps
✅ Larger ecosystem
✅ More scalable

### **Azure Benefits**
✅ Enterprise-grade cloud platform
✅ Integrated DevOps pipeline
✅ Auto-scaling
✅ Global CDN
✅ Database services (Cosmos DB, SQL)
✅ Authentication (Azure AD)
✅ Monitoring & analytics
✅ Cost-effective

---

## 📊 Architecture Comparison

### **Current: React + GitHub Pages**
```
┌─────────────────┐
│   React App     │
├─────────────────┤
│  Vite Build     │
├─────────────────┤
│ GitHub Pages    │
│ (Static)        │
├─────────────────┤
│ LocalStorage    │
│ (Client-side)   │
└─────────────────┘
```

### **New: Angular + Azure**
```
┌──────────────────────┐
│   Angular App        │
├──────────────────────┤
│  Angular CLI Build   │
├──────────────────────┤
│  Azure App Service   │
│  (Managed)           │
├──────────────────────┤
│  Azure Cosmos DB     │
│  (Cloud Database)    │
├──────────────────────┤
│  Azure DevOps        │
│  (CI/CD Pipeline)    │
└──────────────────────┘
```

---

## 🚀 Step-by-Step Migration

### **Phase 1: Setup Angular Project**

#### **1.1 Create New Angular Project**
```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Create new Angular project
ng new myexpensis-angular
cd myexpensis-angular

# Choose options:
# - Routing: Yes
# - Stylesheet format: CSS (or SCSS)
```

#### **1.2 Install Dependencies**
```bash
npm install
npm install tailwindcss postcss autoprefixer
npm install chart.js ng2-charts
npm install @azure/cosmos
npm install @angular/common @angular/forms @angular/http
```

---

## 🔧 Key Services

### **Expense Service**
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

### **Account Service**
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

---

## 🌐 Azure Setup

### **Create Azure Resources**
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
```

---

## 🚀 Deployment

### **Build and Deploy**
```bash
# Build Angular app
ng build --configuration production

# Deploy to Azure
az webapp deployment source config-zip \
  --resource-group myexpensis-rg \
  --name myexpensis-app \
  --src dist/myexpensis-angular.zip
```

### **Access Your App**
```
https://myexpensis-app.azurewebsites.net
```

---

## 📊 Cost Comparison

| Service | React + GitHub | Angular + Azure |
|---------|---|---|
| **Hosting** | Free | $12/month (B1) |
| **Database** | Free (localStorage) | Free (Cosmos DB free tier) |
| **CI/CD** | Free | Free (first 1800 min) |
| **Total** | $0 | ~$12/month |

---

## ✅ Migration Checklist

- [ ] Create Angular project
- [ ] Install dependencies
- [ ] Create components
- [ ] Create services
- [ ] Setup Azure account
- [ ] Create Azure resources
- [ ] Create backend API
- [ ] Setup DevOps pipeline
- [ ] Deploy to Azure
- [ ] Test on production

---

## 🎯 Key Differences

| Aspect | React | Angular |
|--------|-------|---------|
| **Type** | Library | Framework |
| **Language** | JavaScript | TypeScript |
| **Routing** | React Router | @angular/router |
| **Forms** | React Hook Form | @angular/forms |
| **HTTP** | Axios/Fetch | HttpClient |
| **State** | useState/Context | Services/RxJS |
| **Build** | Vite | Angular CLI |

---

## 📚 Resources

- **Angular Docs:** https://angular.io/docs
- **Azure Docs:** https://docs.microsoft.com/azure
- **Cosmos DB:** https://docs.microsoft.com/azure/cosmos-db
- **Azure DevOps:** https://docs.microsoft.com/azure/devops

---

**Ready to migrate to Angular + Azure?** 🚀

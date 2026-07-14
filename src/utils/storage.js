// IndexedDB Storage Manager for MyExpensis
// Provides persistent local storage with better performance than localStorage

const DB_NAME = 'MyExpensisDB'
const DB_VERSION = 1

// Object stores (tables)
const STORES = {
  ACCOUNTS: 'accounts',
  EXPENSES: 'expenses',
  SETTINGS: 'settings',
  BACKUPS: 'backups'
}

let db = null

// Initialize IndexedDB
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      console.error('Database failed to open:', request.error)
      reject(request.error)
    }

    request.onsuccess = () => {
      db = request.result
      console.log('Database opened successfully')
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      db = event.target.result
      console.log('Database upgrade needed, creating object stores...')

      // Create accounts store
      if (!db.objectStoreNames.contains(STORES.ACCOUNTS)) {
        const accountStore = db.createObjectStore(STORES.ACCOUNTS, { keyPath: 'id' })
        accountStore.createIndex('createdAt', 'createdAt', { unique: false })
      }

      // Create expenses store
      if (!db.objectStoreNames.contains(STORES.EXPENSES)) {
        const expenseStore = db.createObjectStore(STORES.EXPENSES, { keyPath: 'id' })
        expenseStore.createIndex('accountId', 'accountId', { unique: false })
        expenseStore.createIndex('month', 'month', { unique: false })
      }

      // Create settings store
      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' })
      }

      // Create backups store
      if (!db.objectStoreNames.contains(STORES.BACKUPS)) {
        const backupStore = db.createObjectStore(STORES.BACKUPS, { keyPath: 'id', autoIncrement: true })
        backupStore.createIndex('timestamp', 'timestamp', { unique: false })
      }
    }
  })
}

// ACCOUNTS OPERATIONS
export const addAccount = (account) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.ACCOUNTS], 'readwrite')
    const store = transaction.objectStore(STORES.ACCOUNTS)
    const request = store.add(account)

    request.onsuccess = () => {
      console.log('Account added:', account.name)
      resolve(request.result)
    }
    request.onerror = () => reject(request.error)
  })
}

export const getAccounts = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.ACCOUNTS], 'readonly')
    const store = transaction.objectStore(STORES.ACCOUNTS)
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export const getAccount = (id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.ACCOUNTS], 'readonly')
    const store = transaction.objectStore(STORES.ACCOUNTS)
    const request = store.get(id)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export const updateAccount = (account) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.ACCOUNTS], 'readwrite')
    const store = transaction.objectStore(STORES.ACCOUNTS)
    const request = store.put(account)

    request.onsuccess = () => {
      console.log('Account updated:', account.name)
      resolve(request.result)
    }
    request.onerror = () => reject(request.error)
  })
}

export const deleteAccount = (id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.ACCOUNTS], 'readwrite')
    const store = transaction.objectStore(STORES.ACCOUNTS)
    const request = store.delete(id)

    request.onsuccess = () => {
      console.log('Account deleted')
      resolve()
    }
    request.onerror = () => reject(request.error)
  })
}

// EXPENSES OPERATIONS
export const addExpense = (expense) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.EXPENSES], 'readwrite')
    const store = transaction.objectStore(STORES.EXPENSES)
    const request = store.add(expense)

    request.onsuccess = () => {
      console.log('Expense added:', expense.month)
      resolve(request.result)
    }
    request.onerror = () => reject(request.error)
  })
}

export const getExpenses = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.EXPENSES], 'readonly')
    const store = transaction.objectStore(STORES.EXPENSES)
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export const getExpensesByAccount = (accountId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.EXPENSES], 'readonly')
    const store = transaction.objectStore(STORES.EXPENSES)
    const index = store.index('accountId')
    const request = index.getAll(accountId)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export const getExpense = (id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.EXPENSES], 'readonly')
    const store = transaction.objectStore(STORES.EXPENSES)
    const request = store.get(id)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export const updateExpense = (expense) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.EXPENSES], 'readwrite')
    const store = transaction.objectStore(STORES.EXPENSES)
    const request = store.put(expense)

    request.onsuccess = () => {
      console.log('Expense updated:', expense.month)
      resolve(request.result)
    }
    request.onerror = () => reject(request.error)
  })
}

export const deleteExpense = (id) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.EXPENSES], 'readwrite')
    const store = transaction.objectStore(STORES.EXPENSES)
    const request = store.delete(id)

    request.onsuccess = () => {
      console.log('Expense deleted')
      resolve()
    }
    request.onerror = () => reject(request.error)
  })
}

// SETTINGS OPERATIONS
export const saveSettings = (settings) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SETTINGS], 'readwrite')
    const store = transaction.objectStore(STORES.SETTINGS)
    const request = store.put({ key: 'appSettings', ...settings })

    request.onsuccess = () => {
      console.log('Settings saved')
      resolve(request.result)
    }
    request.onerror = () => reject(request.error)
  })
}

export const getSettings = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.SETTINGS], 'readonly')
    const store = transaction.objectStore(STORES.SETTINGS)
    const request = store.get('appSettings')

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// BACKUP OPERATIONS
export const createBackup = (data) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.BACKUPS], 'readwrite')
    const store = transaction.objectStore(STORES.BACKUPS)
    const backup = {
      data,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }
    const request = store.add(backup)

    request.onsuccess = () => {
      console.log('Backup created')
      resolve(request.result)
    }
    request.onerror = () => reject(request.error)
  })
}

export const getBackups = () => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.BACKUPS], 'readonly')
    const store = transaction.objectStore(STORES.BACKUPS)
    const request = store.getAll()

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export const restoreBackup = (backupId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.BACKUPS], 'readonly')
    const store = transaction.objectStore(STORES.BACKUPS)
    const request = store.get(backupId)

    request.onsuccess = () => {
      if (request.result) {
        console.log('Backup restored:', request.result.timestamp)
        resolve(request.result.data)
      } else {
        reject(new Error('Backup not found'))
      }
    }
    request.onerror = () => reject(request.error)
  })
}

export const deleteBackup = (backupId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.BACKUPS], 'readwrite')
    const store = transaction.objectStore(STORES.BACKUPS)
    const request = store.delete(backupId)

    request.onsuccess = () => {
      console.log('Backup deleted')
      resolve()
    }
    request.onerror = () => reject(request.error)
  })
}

// EXPORT ALL DATA (for JSON export)
export const exportAllData = async () => {
  try {
    const accounts = await getAccounts()
    const expenses = await getExpenses()
    const settings = await getSettings()

    return {
      accounts,
      expenses,
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }
  } catch (error) {
    console.error('Error exporting data:', error)
    throw error
  }
}

// IMPORT ALL DATA (from JSON)
export const importAllData = async (data) => {
  try {
    // Clear existing data
    await clearAllData()

    // Import accounts
    if (data.accounts && Array.isArray(data.accounts)) {
      for (const account of data.accounts) {
        await addAccount(account)
      }
    }

    // Import expenses
    if (data.expenses && Array.isArray(data.expenses)) {
      for (const expense of data.expenses) {
        await addExpense(expense)
      }
    }

    // Import settings
    if (data.settings) {
      await saveSettings(data.settings)
    }

    console.log('Data imported successfully')
    return true
  } catch (error) {
    console.error('Error importing data:', error)
    throw error
  }
}

// CLEAR ALL DATA
export const clearAllData = async () => {
  try {
    const transaction = db.transaction(
      [STORES.ACCOUNTS, STORES.EXPENSES, STORES.SETTINGS],
      'readwrite'
    )

    transaction.objectStore(STORES.ACCOUNTS).clear()
    transaction.objectStore(STORES.EXPENSES).clear()
    transaction.objectStore(STORES.SETTINGS).clear()

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log('All data cleared')
        resolve()
      }
      transaction.onerror = () => reject(transaction.error)
    })
  } catch (error) {
    console.error('Error clearing data:', error)
    throw error
  }
}

// GET DATABASE STATS
export const getDBStats = async () => {
  try {
    const accounts = await getAccounts()
    const expenses = await getExpenses()
    const backups = await getBackups()

    return {
      accountsCount: accounts.length,
      expensesCount: expenses.length,
      backupsCount: backups.length,
      totalRecords: accounts.length + expenses.length + backups.length,
      lastBackup: backups.length > 0 ? backups[backups.length - 1].timestamp : null
    }
  } catch (error) {
    console.error('Error getting DB stats:', error)
    throw error
  }
}

export default {
  initDB,
  addAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  addExpense,
  getExpenses,
  getExpensesByAccount,
  getExpense,
  updateExpense,
  deleteExpense,
  saveSettings,
  getSettings,
  createBackup,
  getBackups,
  restoreBackup,
  deleteBackup,
  exportAllData,
  importAllData,
  clearAllData,
  getDBStats
}

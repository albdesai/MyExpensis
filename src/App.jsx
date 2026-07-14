import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Download, Upload, TrendingUp, PieChart as PieChartIcon, BarChart3, Target, AlertCircle, Briefcase, Users, HelpCircle, Menu, X } from 'lucide-react'
import MonthlyTracker from './components/MonthlyTracker'
import CategoryBreakdown from './components/CategoryBreakdown'
import SummaryDashboard from './components/SummaryDashboard'
import Charts from './components/Charts'
import BudgetPlanner from './components/BudgetPlanner'
import CareerPlanner from './components/CareerPlanner'
import AccountManager from './components/AccountManager'
import ImprovedFamilyDashboard from './components/ImprovedFamilyDashboard'
import TourPage from './components/TourPage'
import ModernHeader from './components/ModernHeader'
import MobileNav from './components/MobileNav'
import SettingsPanel from './components/SettingsPanel'
import * as storage from './utils/storage'

export default function App() {
  const [activeTab, setActiveTab] = useState('accounts')
  const [data, setData] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [currentAccount, setCurrentAccount] = useState(null)
  const [showTour, setShowTour] = useState(false)
  const [settings, setSettings] = useState({
    currency: '₹',
    theme: 'light',
    budgetLimit: 50000,
    savingsGoal: 10000,
    categories: ['Rent', 'Groceries', 'Utilities', 'Transportation', 'Entertainment', 'Healthcare', 'Other']
  })

  // Initialize database and load data on app start
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize IndexedDB
        await storage.initDB()
        console.log('✅ Database initialized')

        // Load accounts from IndexedDB
        const savedAccounts = await storage.getAccounts()
        if (savedAccounts && savedAccounts.length > 0) {
          setAccounts(savedAccounts)
          setCurrentAccount(savedAccounts[0])
        }

        // Load expenses from IndexedDB
        const savedData = await storage.getExpenses()
        if (savedData && savedData.length > 0) {
          setData(savedData)
        }

        // Load settings from IndexedDB
        const savedSettings = await storage.getSettings()
        if (savedSettings) {
          setSettings(savedSettings)
        }

        console.log('✅ Data loaded from IndexedDB')
      } catch (error) {
        console.error('Error initializing app:', error)
        // Fallback to localStorage if IndexedDB fails
        const savedData = localStorage.getItem('expenseData')
        if (savedData) setData(JSON.parse(savedData))
        const savedSettings = localStorage.getItem('appSettings')
        if (savedSettings) setSettings(JSON.parse(savedSettings))
        const savedAccounts = localStorage.getItem('accounts')
        if (savedAccounts) {
          const parsedAccounts = JSON.parse(savedAccounts)
          setAccounts(parsedAccounts)
          if (parsedAccounts.length > 0) setCurrentAccount(parsedAccounts[0])
        }
      }
    }

    initializeApp()
  }, [])

  // Save expenses to IndexedDB whenever data changes
  useEffect(() => {
    if (data.length > 0) {
      const saveData = async () => {
        try {
          for (const expense of data) {
            const existing = await storage.getExpense(expense.id)
            if (existing) {
              await storage.updateExpense(expense)
            } else {
              await storage.addExpense(expense)
            }
          }
          console.log('✅ Expenses saved to IndexedDB')
        } catch (error) {
          console.error('Error saving expenses:', error)
          localStorage.setItem('expenseData', JSON.stringify(data))
        }
      }
      saveData()
    }
  }, [data])

  // Save settings to IndexedDB whenever settings change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await storage.saveSettings(settings)
        console.log('✅ Settings saved to IndexedDB')
      } catch (error) {
        console.error('Error saving settings:', error)
        localStorage.setItem('appSettings', JSON.stringify(settings))
      }
    }
    saveSettings()
  }, [settings])

  // Save accounts to IndexedDB whenever accounts change
  useEffect(() => {
    if (accounts.length > 0) {
      const saveAccounts = async () => {
        try {
          for (const account of accounts) {
            const existing = await storage.getAccount(account.id)
            if (existing) {
              await storage.updateAccount(account)
            } else {
              await storage.addAccount(account)
            }
          }
          console.log('✅ Accounts saved to IndexedDB')
        } catch (error) {
          console.error('Error saving accounts:', error)
          localStorage.setItem('accounts', JSON.stringify(accounts))
        }
      }
      saveAccounts()
    }
  }, [accounts])

  const addAccount = (newAccount) => {
    const updated = [...accounts, newAccount]
    setAccounts(updated)
    setCurrentAccount(newAccount)
  }

  const deleteAccount = (accountId) => {
    const updated = accounts.filter(acc => acc.id !== accountId)
    setAccounts(updated)
    if (currentAccount?.id === accountId) {
      setCurrentAccount(updated.length > 0 ? updated[0] : null)
    }
  }

  const selectAccount = (accountId) => {
    const account = accounts.find(acc => acc.id === accountId)
    setCurrentAccount(account)
  }

  const addMonth = (newEntry) => {
    if (editingId) {
      setData(data.map(item => item.id === editingId ? { ...newEntry, id: editingId, accountId: currentAccount?.id } : item))
      setEditingId(null)
    } else {
      setData([...data, { ...newEntry, id: Date.now(), accountId: currentAccount?.id }])
    }
  }

  const deleteMonth = (id) => {
    setData(data.filter(item => item.id !== id))
  }

  const editMonth = (id) => {
    setEditingId(id)
    setActiveTab('tracker')
  }

  const downloadData = async () => {
    try {
      // Export all data from IndexedDB
      const exportedData = await storage.exportAllData()
      
      // Create backup in IndexedDB
      await storage.createBackup(exportedData)
      
      // Download as JSON file
      const dataStr = JSON.stringify(exportedData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `MyExpensis_${new Date().toISOString().split('T')[0]}.json`
      link.click()
      
      console.log('✅ Data exported and backup created')
      alert('✅ Data exported successfully!')
    } catch (error) {
      console.error('Error exporting data:', error)
      alert('Error exporting data. Please try again.')
    }
  }

  const uploadData = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const uploadedData = JSON.parse(e.target.result)
          
          // Import data into IndexedDB
          await storage.importAllData(uploadedData)
          
          // Update React state
          if (uploadedData.accounts) setAccounts(uploadedData.accounts)
          if (uploadedData.expenses) setData(uploadedData.expenses)
          if (uploadedData.settings) setSettings(uploadedData.settings)
          
          console.log('✅ Data imported successfully')
          alert('✅ Data imported successfully!')
        } catch (error) {
          console.error('Error importing data:', error)
          alert('Error importing data. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  const editingData = editingId ? data.find(item => item.id === editingId) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24 md:pb-8">
      {/* Modern Header */}
      <ModernHeader
        onTour={() => setShowTour(true)}
        onExport={downloadData}
        onImport={uploadData}
        onSettings={() => {}}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-0 py-4 md:py-6">

        {/* Desktop Tabs */}
        <div className="hidden md:block bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200">
            <button
              onClick={() => setActiveTab('accounts')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'accounts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users size={20} /> Accounts
            </button>
            <button
              onClick={() => setActiveTab('family')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'family'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              👨‍👩‍👧‍👦 Family Dashboard
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'tracker'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingUp size={20} /> Monthly Tracker
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'categories'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <PieChartIcon size={20} /> Categories
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'charts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 size={20} /> Charts
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'summary'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📊 Summary
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'budget'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Target size={20} /> Budget Planner
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'career'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Briefcase size={20} /> Career Growth
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'accounts' && (
          <AccountManager
            accounts={accounts}
            onAddAccount={addAccount}
            onDeleteAccount={deleteAccount}
            onSelectAccount={selectAccount}
            currentAccount={currentAccount}
          />
        )}

        {activeTab === 'family' && (
          <ImprovedFamilyDashboard data={data} accounts={accounts} settings={settings} />
        )}

        {activeTab === 'tracker' && (
          <MonthlyTracker
            data={data}
            onAdd={addMonth}
            onDelete={deleteMonth}
            onEdit={editMonth}
            editingData={editingData}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        )}

        {activeTab === 'categories' && (
          <CategoryBreakdown data={data} />
        )}

        {activeTab === 'charts' && (
          <Charts data={data} />
        )}

        {activeTab === 'summary' && (
          <SummaryDashboard data={data} />
        )}

        {activeTab === 'budget' && (
          <BudgetPlanner data={data} settings={settings} />
        )}

        {activeTab === 'career' && (
          <CareerPlanner data={data} settings={settings} />
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tour Modal */}
      {showTour && <TourPage onClose={() => setShowTour(false)} />}

      {/* Settings Panel */}
      <SettingsPanel settings={settings} onSettingsChange={setSettings} />
    </div>
  )
}

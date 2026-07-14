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

  useEffect(() => {
    const savedData = localStorage.getItem('expenseData')
    if (savedData) {
      setData(JSON.parse(savedData))
    }
    const savedSettings = localStorage.getItem('appSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
    const savedAccounts = localStorage.getItem('accounts')
    if (savedAccounts) {
      const parsedAccounts = JSON.parse(savedAccounts)
      setAccounts(parsedAccounts)
      if (parsedAccounts.length > 0) {
        setCurrentAccount(parsedAccounts[0])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('expenseData', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts))
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

  const downloadData = () => {
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `expense_tracker_${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const uploadData = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const uploadedData = JSON.parse(e.target.result)
          setData(uploadedData)
          alert('Data imported successfully!')
        } catch (error) {
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

import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, X, Play, BookOpen } from 'lucide-react'

export default function TourPage({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: '👋 Welcome to Expense Tracker',
      description: 'Your complete financial management solution for individuals and families',
      image: '💰',
      details: [
        'Track monthly expenses and salary',
        'Plan budgets and savings goals',
        'Manage multiple family accounts',
        'Visualize spending with charts',
        'Plan career growth and wealth'
      ]
    },
    {
      title: '👥 Create Family Accounts',
      description: 'Set up accounts for each family member',
      image: '👨‍👩‍👧‍👦',
      details: [
        'Go to "Accounts" tab',
        'Click "Add Account" button',
        'Enter name, email, and select color',
        'Create accounts for all family members',
        'Switch between accounts anytime'
      ]
    },
    {
      title: '📊 Monthly Tracker',
      description: 'Add your monthly salary and expenses',
      image: '📈',
      details: [
        'Select an account first',
        'Enter month name (e.g., January 2024)',
        'Add your monthly salary',
        'Fill in EMI amounts (Home, Car, Personal)',
        'Add other expenses (Rent, Groceries, etc.)',
        'Click "Add Month" to save'
      ]
    },
    {
      title: '📋 Categories Breakdown',
      description: 'See detailed expense breakdown by category',
      image: '🥧',
      details: [
        'View latest month expenses',
        'See percentage for each category',
        'Color-coded expense categories',
        'Progress bars for each category',
        'Summary statistics at bottom'
      ]
    },
    {
      title: '📉 Charts & Visualizations',
      description: 'Analyze spending patterns with 4 professional charts',
      image: '📊',
      details: [
        'Monthly Expense Trend (Line Chart)',
        'Expense Breakdown (Pie Chart)',
        'Salary vs Expenses (Bar Chart)',
        'Savings Rate Trend (Area Chart)',
        'Identify spending patterns'
      ]
    },
    {
      title: '📋 Summary Dashboard',
      description: 'Get annual overview and key metrics',
      image: '📊',
      details: [
        'Total annual salary',
        'Total annual expenses',
        'Total annual savings',
        'Monthly averages',
        'Highest and lowest expense months',
        'Detailed summary table'
      ]
    },
    {
      title: '🎯 Budget Planner',
      description: 'Set budget limits and track savings goals',
      image: '🎯',
      details: [
        'Set monthly budget limit',
        'Track budget usage with progress bar',
        'Get budget exceeded alerts',
        'Set monthly savings goal',
        'See savings progress',
        'Get budget recommendations'
      ]
    },
    {
      title: '💼 Career Growth Planner',
      description: 'Plan your salary growth and wealth projections',
      image: '💼',
      details: [
        'Set career goals with target salary',
        'Define strategy to achieve goals',
        'See salary growth timeline',
        'Get wealth projections',
        'View 6 career growth tips',
        'Track progress to goals'
      ]
    },
    {
      title: '👨‍👩‍👧‍👦 Family Dashboard',
      description: 'View combined family finances',
      image: '👨‍👩‍👧‍👦',
      details: [
        'See total family salary',
        'View combined expenses',
        'Track family savings',
        'Compare members side-by-side',
        'Family savings rate',
        'Family insights and averages'
      ]
    },
    {
      title: '⚙️ Settings & Customization',
      description: 'Personalize your app experience',
      image: '⚙️',
      details: [
        'Change currency (₹, $, €, £, ¥)',
        'Set budget limits',
        'Set savings goals',
        'Add/edit/remove expense categories',
        'Customize app theme',
        'All settings auto-save'
      ]
    },
    {
      title: '💾 Export & Import Data',
      description: 'Backup and share your financial data',
      image: '💾',
      details: [
        'Click "Export" to download JSON file',
        'Keep backups on Google Drive or USB',
        'Click "Import" to load data',
        'Share data with family members',
        'Restore from backups anytime'
      ]
    },
    {
      title: '🎉 You\'re All Set!',
      description: 'Start tracking your finances today',
      image: '🎉',
      details: [
        'Create family accounts',
        'Add your first month of expenses',
        'Explore all features',
        'Set budget and savings goals',
        'Share with family members',
        'Happy tracking! 💰'
      ]
    }
  ]

  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  const nextStep = () => {
    if (!isLast) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (!isFirst) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold">{step.image} {step.title}</h2>
            <p className="text-blue-100 mt-2">{step.description}</p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-blue-700 p-2 rounded transition flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-4 mb-8">
            {step.details.map((detail, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-0.5">{detail}</p>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-sm font-semibold text-gray-700">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={prevStep}
              disabled={isFirst}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                isFirst
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              <ChevronLeft size={20} /> Previous
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
            >
              Skip Tour
            </button>

            <button
              onClick={nextStep}
              disabled={isLast}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                isLast
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLast ? 'Start Using App' : 'Next'} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

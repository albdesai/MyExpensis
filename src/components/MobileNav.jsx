import React from 'react'
import { Home, BarChart3, Users, TrendingUp, Target } from 'lucide-react'

export default function MobileNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'accounts', icon: Users, label: 'Accounts', color: 'from-blue-500 to-blue-600' },
    { id: 'tracker', icon: Home, label: 'Add', color: 'from-green-500 to-green-600' },
    { id: 'family', icon: TrendingUp, label: 'Family', color: 'from-purple-500 to-purple-600' },
    { id: 'budget', icon: Target, label: 'Budget', color: 'from-orange-500 to-orange-600' },
    { id: 'charts', icon: BarChart3, label: 'Charts', color: 'from-pink-500 to-pink-600' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl md:hidden z-40 safe-area-inset-bottom">
      <div className="flex justify-around items-center px-1 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 ${
                isActive
                  ? `bg-gradient-to-b ${tab.color} text-white shadow-lg scale-110`
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <Icon size={22} />
              <span className="text-xs mt-0.5 font-semibold">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

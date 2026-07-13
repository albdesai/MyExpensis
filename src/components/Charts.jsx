import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function Charts({ data }) {
  const expenseTrendRef = useRef(null)
  const expenseBreakdownRef = useRef(null)
  const salaryVsExpenseRef = useRef(null)
  const savingsRateRef = useRef(null)

  const chartInstances = useRef({})

  useEffect(() => {
    if (data.length === 0) return

    // Destroy existing charts
    Object.values(chartInstances.current).forEach(chart => {
      if (chart) chart.destroy()
    })
    chartInstances.current = {}

    // Chart 1: Monthly Expense Trend
    if (expenseTrendRef.current) {
      const ctx = expenseTrendRef.current.getContext('2d')
      chartInstances.current.expenseTrend = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(item => item.month),
          datasets: [{
            label: 'Total Expenses',
            data: data.map(item => {
              const total = item.emiHome + item.emiCar + item.emiPersonal + item.rent + 
                          item.groceries + item.utilities + item.transportation + 
                          item.entertainment + item.healthcare + item.other
              return total
            }),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#ef4444',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: { display: true, text: 'Monthly Expense Trend' },
            legend: { display: true }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      })
    }

    // Chart 2: Expense Breakdown (Pie)
    if (expenseBreakdownRef.current && data.length > 0) {
      const latestMonth = data[data.length - 1]
      const ctx = expenseBreakdownRef.current.getContext('2d')
      
      const categories = [
        { name: 'Home Loan EMI', value: latestMonth.emiHome },
        { name: 'Car Loan EMI', value: latestMonth.emiCar },
        { name: 'Personal Loan EMI', value: latestMonth.emiPersonal },
        { name: 'Rent', value: latestMonth.rent },
        { name: 'Groceries', value: latestMonth.groceries },
        { name: 'Utilities', value: latestMonth.utilities },
        { name: 'Transportation', value: latestMonth.transportation },
        { name: 'Entertainment', value: latestMonth.entertainment },
        { name: 'Healthcare', value: latestMonth.healthcare },
        { name: 'Other', value: latestMonth.other },
      ].filter(cat => cat.value > 0)

      chartInstances.current.expenseBreakdown = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: categories.map(cat => cat.name),
          datasets: [{
            data: categories.map(cat => cat.value),
            backgroundColor: [
              '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4',
              '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#6b7280'
            ],
            borderColor: '#fff',
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: { display: true, text: 'Expense Breakdown (Latest Month)' },
            legend: { display: true, position: 'right' }
          }
        }
      })
    }

    // Chart 3: Salary vs Expenses
    if (salaryVsExpenseRef.current) {
      const ctx = salaryVsExpenseRef.current.getContext('2d')
      chartInstances.current.salaryVsExpense = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.month),
          datasets: [
            {
              label: 'Salary',
              data: data.map(item => item.salary),
              backgroundColor: '#22c55e',
              borderColor: '#16a34a',
              borderWidth: 1,
            },
            {
              label: 'Total Expenses',
              data: data.map(item => {
                const total = item.emiHome + item.emiCar + item.emiPersonal + item.rent + 
                            item.groceries + item.utilities + item.transportation + 
                            item.entertainment + item.healthcare + item.other
                return total
              }),
              backgroundColor: '#ef4444',
              borderColor: '#dc2626',
              borderWidth: 1,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: { display: true, text: 'Salary vs Monthly Expenses' },
            legend: { display: true }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      })
    }

    // Chart 4: Savings Rate Trend
    if (savingsRateRef.current) {
      const ctx = savingsRateRef.current.getContext('2d')
      chartInstances.current.savingsRate = new Chart(ctx, {
        type: 'area',
        data: {
          labels: data.map(item => item.month),
          datasets: [{
            label: 'Savings Rate (%)',
            data: data.map(item => {
              const total = item.emiHome + item.emiCar + item.emiPersonal + item.rent + 
                          item.groceries + item.utilities + item.transportation + 
                          item.entertainment + item.healthcare + item.other
              const remaining = item.salary - total
              return item.salary > 0 ? (remaining / item.salary * 100) : 0
            }),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#3b82f6',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: { display: true, text: 'Monthly Savings Rate Trend' },
            legend: { display: true }
          },
          scales: {
            y: { beginAtZero: true, max: 100 }
          }
        }
      })
    }

    return () => {
      Object.values(chartInstances.current).forEach(chart => {
        if (chart) chart.destroy()
      })
    }
  }, [data])

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <p className="text-gray-500 text-lg">No data to display. Add months to see charts.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <canvas ref={expenseTrendRef}></canvas>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <canvas ref={expenseBreakdownRef}></canvas>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <canvas ref={salaryVsExpenseRef}></canvas>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <canvas ref={savingsRateRef}></canvas>
        </div>
      </div>
    </div>
  )
}

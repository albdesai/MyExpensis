# 💰 Monthly Expense Tracker

A modern, responsive web application for tracking monthly expenses, salary, EMIs, and savings. Built with React, Vite, and Tailwind CSS.

**Live Demo:** https://github.com/albdesai/MyExpensis

## ✨ Features

### 📊 Monthly Expense Tracking
- Track salary and all expense categories
- Support for multiple EMIs (Home, Car, Personal loans)
- Automatic calculations for remaining balance and savings rate
- Edit and delete monthly entries

### 📈 Multiple Views
- **Monthly Tracker**: Add and manage monthly data with real-time calculations
- **Categories**: Breakdown expenses by category with percentages
- **Charts**: Visualize spending patterns with 4 different charts
- **Summary**: Annual overview and key metrics

### 📉 Charts & Visualizations
- Monthly expense trend (line chart)
- Expense breakdown (pie chart)
- Salary vs expenses comparison (bar chart)
- Savings rate trend (area chart)

### 💾 Data Management
- Local storage (data saved in browser)
- Export data to JSON file
- Import data from JSON file
- Auto-save functionality

### 👨‍👩‍👧‍👦 Family Sharing
- Share via local network (same WiFi)
- Export/import for offline sharing
- Cloud deployment ready

### 📱 Responsive Design
- Works on desktop, tablet, and mobile
- Beautiful gradient UI with Tailwind CSS
- Easy-to-use interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/albdesai/MyExpensis.git
   cd MyExpensis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

## 📖 Usage Guide

### Adding Monthly Data
1. Go to **Monthly Tracker** tab
2. Enter month name (e.g., "January 2024")
3. Enter your salary
4. Fill in all EMI amounts (Home, Car, Personal)
5. Fill in other expenses (Rent, Groceries, Utilities, etc.)
6. Click **"Add Month"** button
7. Data is automatically saved to browser storage

### Viewing Categories
- Go to **Categories** tab
- See breakdown of latest month's expenses
- View percentage distribution of each category
- See summary statistics

### Viewing Charts
- Go to **Charts** tab
- See 4 different visualizations
- Analyze spending trends over time

### Viewing Summary
- Go to **Summary** tab
- See annual totals and averages
- View expense extremes (highest/lowest months)
- Detailed breakdown table

### Exporting Data
1. Click **"Export"** button in header
2. JSON file will be downloaded with all your data
3. Keep backups on Google Drive or USB

### Importing Data
1. Click **"Import"** button in header
2. Select a previously exported JSON file
3. Data will be imported and merged

## 📊 Expense Categories

The app tracks the following categories:

**EMIs:**
- Home Loan EMI
- Car Loan EMI
- Personal Loan EMI

**Other Expenses:**
- Rent
- Groceries
- Utilities
- Transportation
- Entertainment
- Healthcare
- Other

## 💾 Data Storage

All data is stored locally in your browser using localStorage:
- ✅ Data persists between sessions
- ✅ No internet required after loading
- ✅ Data is private and not sent to any server
- ⚠️ Clearing browser data will delete all entries
- 💡 Export regularly to keep backups!

## 🌐 Browser Support

Works on:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 👨‍👩‍👧‍👦 Sharing with Family

### Option 1: Local Network (Recommended)
1. Start the app on your computer: `npm run dev`
2. Find your IP address: `ipconfig`
3. Share IP with family (e.g., `http://192.168.1.100:3000`)
4. Family accesses from same WiFi
5. Real-time data sync

### Option 2: Export/Import
1. Click **"Export"** button to download JSON file
2. Share the JSON file with family via email or cloud storage
3. They click **"Import"** to load the data
4. Manual sync needed for updates

### Option 3: Cloud Deployment
Deploy to services like:
- [Netlify](https://netlify.com)
- [Vercel](https://vercel.com)
- [GitHub Pages](https://pages.github.com/)

See [FAMILY_SHARING_GUIDE.md](./FAMILY_SHARING_GUIDE.md) for detailed instructions.

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized `dist` folder that can be deployed to any static hosting service.

## 📁 Project Structure

```
expense_tracker_app/
├── src/
│   ├── components/
│   │   ├── MonthlyTracker.jsx      (Add/edit monthly data)
│   │   ├── CategoryBreakdown.jsx   (Expense breakdown)
│   │   ├── Charts.jsx              (4 visualizations)
│   │   └── SummaryDashboard.jsx    (Annual overview)
│   ├── App.jsx                     (Main app logic)
│   ├── main.jsx                    (Entry point)
│   └── index.css                   (Tailwind styles)
├── index.html                      (HTML template)
├── package.json                    (Dependencies)
├── vite.config.js                  (Vite configuration)
├── tailwind.config.js              (Tailwind configuration)
└── postcss.config.js               (PostCSS configuration)
```

## 🛠️ Technologies Used

- **React 18.2.0**: UI framework
- **Vite 4.3.9**: Build tool and dev server
- **Tailwind CSS 3.3.2**: Styling
- **Chart.js**: Charts and visualizations
- **Lucide React**: Icons
- **Browser localStorage**: Data persistence

## 📚 Documentation

- **[START_HERE.md](./START_HERE.md)** - Quick start guide (⭐ Read this first!)
- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed installation
- **[COMMANDS_REFERENCE.md](./COMMANDS_REFERENCE.md)** - All commands
- **[FAMILY_SHARING_GUIDE.md](./FAMILY_SHARING_GUIDE.md)** - Sharing options
- **[FEATURES_OVERVIEW.md](./FEATURES_OVERVIEW.md)** - Feature details
- **[APP_SUMMARY.md](./APP_SUMMARY.md)** - Complete overview
- **[INDEX.md](./INDEX.md)** - Documentation index

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install
```

## 🐛 Troubleshooting

### "npm is not recognized"
- Install Node.js and restart your computer

### "Port 3000 already in use"
- Close other applications or restart your computer

### "npm install fails"
- Check your internet connection
- Run: `npm cache clean --force`
- Try `npm install` again

### "Data not saving"
- Check if localStorage is enabled in your browser
- Try clearing browser cache and reloading

### "Charts not displaying"
- Ensure you have at least one month of data
- Try refreshing the page

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for more troubleshooting.

## 💡 Tips & Best Practices

✅ **Export data regularly** - Keep backups on Google Drive or USB  
✅ **Update expenses weekly** - For accuracy  
✅ **Review charts monthly** - Track spending trends  
✅ **Share with family** - Use one of 3 sharing options  
✅ **Use same browser** - For consistent data  
✅ **Keep computer on** - If sharing via local network  

## 📊 Example Data

```
Month: January 2024
Salary: ₹50,000

EMIs:
- Home Loan: ₹15,000
- Car Loan: ₹8,000
- Personal Loan: ₹5,000

Other Expenses:
- Rent: ₹0
- Groceries: ₹8,000
- Utilities: ₹2,000
- Transportation: ₹3,000
- Entertainment: ₹2,000
- Healthcare: ₹1,000
- Other: ₹1,000

Auto-Calculated:
- Total EMI: ₹28,000
- Total Expenses: ₹45,000
- Remaining: ₹5,000
- Savings Rate: 10%
```

## 🎯 Features Roadmap

- [ ] Cloud sync across devices
- [ ] Mobile app version
- [ ] Budget alerts
- [ ] Bank integration
- [ ] Investment tracking
- [ ] Email reports
- [ ] Advanced analytics

## 📝 License

MIT License - Feel free to use and modify

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📞 Support

For help:
1. Check the [documentation files](./INDEX.md)
2. Review [SETUP_GUIDE.md](./SETUP_GUIDE.md) for troubleshooting
3. Open an issue on GitHub

## 🎉 Getting Started

1. **Clone this repository**
   ```bash
   git clone https://github.com/albdesai/MyExpensis.git
   ```

2. **Install dependencies**
   ```bash
   cd MyExpensis
   npm install
   ```

3. **Start the app**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

5. **Start tracking expenses!** 💰

---

**Happy Expense Tracking! 💰**

For detailed setup instructions, see [START_HERE.md](./START_HERE.md)

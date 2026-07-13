# 💰 Monthly Expense Tracker

A modern, responsive web application for tracking monthly expenses, salary, EMIs, and savings. Built with React, Vite, and Tailwind CSS.

## Features

✅ **Monthly Expense Tracking**
- Track salary and all expense categories
- Support for multiple EMIs (Home, Car, Personal loans)
- Automatic calculations for remaining balance and savings rate

✅ **Multiple Views**
- **Monthly Tracker**: Add and manage monthly data
- **Categories**: Breakdown expenses by category
- **Charts**: Visualize spending patterns with 4 different charts
- **Summary**: Annual overview and key metrics

✅ **Data Management**
- Local storage (data saved in browser)
- Export data to JSON file
- Import data from JSON file
- Edit and delete monthly entries

✅ **Charts & Visualizations**
- Monthly expense trend (line chart)
- Expense breakdown (pie chart)
- Salary vs expenses comparison (bar chart)
- Savings rate trend (area chart)

✅ **Responsive Design**
- Works on desktop, tablet, and mobile
- Beautiful gradient UI with Tailwind CSS
- Easy-to-use interface

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Navigate to project directory**
   ```bash
   cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app
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

## Usage

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

### Viewing Charts
- Go to **Charts** tab
- See 4 different visualizations:
  - Monthly expense trend
  - Expense breakdown pie chart
  - Salary vs expenses comparison
  - Savings rate trend

### Viewing Summary
- Go to **Summary** tab
- See annual totals and averages
- View expense extremes (highest/lowest months)
- Detailed breakdown table

### Exporting Data
1. Click **"Export"** button in header
2. JSON file will be downloaded with all your data

### Importing Data
1. Click **"Import"** button in header
2. Select a previously exported JSON file
3. Data will be imported and merged

### Editing/Deleting
- Click **Edit** (pencil icon) to modify a month
- Click **Delete** (trash icon) to remove a month

## Data Structure

Each month entry contains:
- Month name
- Salary
- EMI amounts (Home, Car, Personal)
- Expense categories (Rent, Groceries, Utilities, Transportation, Entertainment, Healthcare, Other)

## Browser Storage

All data is stored locally in your browser using localStorage. This means:
- ✅ Data persists between sessions
- ✅ No internet required after loading
- ✅ Data is private and not sent to any server
- ⚠️ Clearing browser data will delete all entries

## Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized `dist` folder that can be deployed.

## Sharing with Family

### Option 1: Local Network
1. Build the app: `npm run build`
2. Use a local server to share the dist folder
3. Family members access via your IP address

### Option 2: Export/Import
1. Export your data as JSON
2. Share the JSON file with family
3. They can import it into their own instance

### Option 3: Cloud Deployment
Deploy to services like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Troubleshooting

**Data not saving?**
- Check if localStorage is enabled in your browser
- Try clearing browser cache and reloading

**Charts not displaying?**
- Ensure you have at least one month of data
- Try refreshing the page

**Import not working?**
- Verify the JSON file format matches export format
- Check browser console for error messages

## Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **Chart.js**: Charts and visualizations
- **Lucide React**: Icons

## License

MIT License - Feel free to use and modify

## Support

For issues or suggestions, please check the code or create an issue.

---

**Happy Expense Tracking! 💰**

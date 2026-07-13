# ⚡ Quick Start (5 Minutes)

## What You Have
A complete expense tracker app with:
- 💰 Salary & EMI tracking
- 📊 Charts & visualizations
- 📋 Category breakdown
- 📈 Annual summary
- 👨‍👩‍👧‍👦 Family sharing

---

## Installation (First Time Only)

### Step 1: Install Node.js
- Download: https://nodejs.org/ (LTS version)
- Install and restart computer

### Step 2: Open Command Prompt
- Press `Windows + R`
- Type `cmd` and press Enter

### Step 3: Install App
Copy and paste:
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app && npm install
```
Press Enter and wait (2-3 minutes).

---

## Running the App

### Every Time You Want to Use It
Copy and paste in Command Prompt:
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app && npm run dev
```

Press Enter. Browser opens automatically at `http://localhost:3000`

### To Stop
Press `Ctrl + C` in Command Prompt

---

## Using the App

### 1. Add Monthly Data
- Go to **Monthly Tracker** tab
- Enter month name (e.g., "January 2024")
- Enter salary
- Enter all EMIs and expenses
- Click **"Add Month"**

### 2. View Breakdown
- Go to **Categories** tab
- See where your money goes

### 3. View Charts
- Go to **Charts** tab
- See 4 different visualizations

### 4. View Summary
- Go to **Summary** tab
- See annual totals and trends

### 5. Export Data
- Click **"Export"** button
- JSON file downloads
- Share with family

### 6. Import Data
- Click **"Import"** button
- Select JSON file
- Data loads

---

## Sharing with Family

### Option A: Same WiFi (Easiest)
1. Start the app on your computer
2. Find IP address:
   ```
   ipconfig
   ```
3. Look for "IPv4 Address" (e.g., 192.168.1.100)
4. Tell family to open: `http://192.168.1.100:3000`
5. Done! They can add expenses immediately

### Option B: Export/Import
1. Click **"Export"** in app
2. Email JSON file to family
3. They click **"Import"** to load data

### Option C: Cloud (Always Available)
1. Run: `npm run build`
2. Deploy `dist` folder to Netlify/Vercel
3. Share public URL with family

---

## File Structure
```
expense_tracker_app/
├── src/
│   ├── components/        (App screens)
│   ├── App.jsx           (Main app)
│   ├── main.jsx          (Entry point)
│   └── index.css         (Styles)
├── index.html            (HTML template)
├── package.json          (Dependencies)
├── vite.config.js        (Build config)
├── README.md             (Full docs)
├── SETUP_GUIDE.md        (Detailed setup)
└── FAMILY_SHARING_GUIDE.md (Sharing options)
```

---

## Keyboard Shortcuts
- `Ctrl + C` - Stop the app
- `Ctrl + Shift + Delete` - Clear browser data
- `F12` - Open developer tools (if needed)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "npm not found" | Restart computer after installing Node.js |
| "Port 3000 in use" | Close other apps or restart computer |
| "npm install fails" | Check internet, try `npm cache clean --force` |
| "App won't load" | Clear browser cache (Ctrl + Shift + Delete) |
| "Data disappeared" | Export regularly! Use backup JSON files |

---

## Important Tips

✅ **Export data weekly** - Keep backup JSON files
✅ **Use same browser** - For consistent data
✅ **Keep computer on** - If sharing via local network
✅ **Share IP address** - For family access
✅ **Check WiFi** - Family needs same WiFi for local access

---

## Next Steps

1. ✅ Install Node.js
2. ✅ Run `npm install`
3. ✅ Run `npm run dev`
4. ✅ Add your first month of expenses
5. ✅ Explore all tabs
6. ✅ Export data as backup
7. ✅ Share with family

---

## Full Documentation

- **README.md** - Complete feature list
- **SETUP_GUIDE.md** - Detailed installation
- **FAMILY_SHARING_GUIDE.md** - All sharing options

---

## Support

If stuck:
1. Check the error message
2. Restart the app
3. Clear browser cache
4. Reinstall: `npm install`

---

**You're ready! Start tracking expenses now! 💰**

Questions? Read the guides above.

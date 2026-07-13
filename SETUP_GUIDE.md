# 🚀 Quick Setup Guide

## For Windows Users

### Step 1: Install Node.js
1. Download from https://nodejs.org/ (LTS version recommended)
2. Run the installer and follow the steps
3. Restart your computer

### Step 2: Open Command Prompt
1. Press `Windows + R`
2. Type `cmd` and press Enter
3. You should see a black command window

### Step 3: Navigate to Project Folder
Copy and paste this command:
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app
```
Press Enter.

### Step 4: Install Dependencies
Copy and paste this command:
```
npm install
```
Press Enter and wait for it to complete (may take 2-3 minutes).

### Step 5: Start the App
Copy and paste this command:
```
npm run dev
```
Press Enter.

You should see:
```
VITE v4.3.9  ready in 123 ms

➜  Local:   http://localhost:3000/
```

The app will automatically open in your browser!

---

## For Family Members (Sharing the App)

### Option A: Run on Same Computer
1. Follow Steps 1-5 above
2. Other family members can access at `http://localhost:3000`

### Option B: Share Across Network
1. Find your computer's IP address:
   - Open Command Prompt
   - Type: `ipconfig`
   - Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Other computers on same WiFi can access:
   - `http://192.168.1.100:3000` (replace with your IP)

### Option C: Export/Import Data
1. Click **"Export"** button to download JSON file
2. Share the JSON file with family
3. They click **"Import"** to load the data

---

## Troubleshooting

### "npm is not recognized"
- Node.js not installed properly
- Restart your computer after installing Node.js
- Reinstall Node.js

### "Port 3000 already in use"
- Another app is using port 3000
- Close other applications or change port in `vite.config.js`

### "npm install fails"
- Check internet connection
- Try: `npm cache clean --force`
- Then run `npm install` again

### App not opening automatically
- Manually open browser
- Go to `http://localhost:3000`

---

## Daily Usage

### To Start the App
1. Open Command Prompt
2. Navigate to folder: `cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app`
3. Run: `npm run dev`
4. Open browser to `http://localhost:3000`

### To Stop the App
- Press `Ctrl + C` in Command Prompt

### Data is Saved Automatically
- All entries are saved in browser storage
- No need to manually save
- Data persists even after closing browser

---

## Building for Offline Use

To create a standalone version that doesn't need npm:

1. Run: `npm run build`
2. A `dist` folder is created
3. Open `dist/index.html` in any browser
4. Share the entire `dist` folder with family

---

## Getting Help

If you encounter issues:
1. Check the error message in Command Prompt
2. Restart the app
3. Clear browser cache (Ctrl + Shift + Delete)
4. Reinstall dependencies: `npm install`

---

**You're all set! Start tracking your expenses! 💰**

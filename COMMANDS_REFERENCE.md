# 🖥️ Commands Reference

## Copy & Paste Commands

### First Time Setup

#### 1. Install Node.js
- Download: https://nodejs.org/ (LTS version)
- Run installer
- Restart computer

#### 2. Install Dependencies
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app && npm install
```

### Running the App

#### Start Development Server
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app && npm run dev
```

#### Stop the App
Press `Ctrl + C` in Command Prompt

### Building for Production

#### Build for Deployment
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app && npm run build
```

#### Preview Production Build
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app && npm run preview
```

### Network & Sharing

#### Find Your IP Address
```
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

#### Access from Another Computer
Open browser and go to:
```
http://YOUR_IP:3000
```
Example: `http://192.168.1.100:3000`

### Maintenance Commands

#### Clear npm Cache
```
npm cache clean --force
```

#### Reinstall Dependencies
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app && rm -r node_modules && npm install
```

#### Check Node Version
```
node --version
```

#### Check npm Version
```
npm --version
```

---

## Command Breakdown

### `npm install`
- Installs all dependencies listed in package.json
- Creates node_modules folder
- Run once after downloading project

### `npm run dev`
- Starts development server
- Opens browser automatically
- Hot reload enabled (changes appear instantly)
- Press Ctrl+C to stop

### `npm run build`
- Creates optimized production build
- Generates dist folder
- Ready for deployment
- Smaller file size than dev version

### `npm run preview`
- Previews production build locally
- Shows how app will look when deployed
- Useful for testing before deployment

---

## Batch Commands (Copy & Paste)

### Complete Setup (All at Once)
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app && npm install && npm run dev
```

### Quick Start (After First Setup)
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app && npm run dev
```

### Build & Preview
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app && npm run build && npm run preview
```

---

## Troubleshooting Commands

### If npm install fails
```
npm cache clean --force
npm install
```

### If port 3000 is in use
Find process using port 3000:
```
netstat -ano | findstr :3000
```

Kill the process (replace PID with actual number):
```
taskkill /PID <PID> /F
```

### Check what's installed
```
npm list
```

### Update npm
```
npm install -g npm@latest
```

---

## File Management

### Navigate to Project
```
cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app
```

### List Files
```
dir
```

### Create New Folder
```
mkdir folder_name
```

### Delete Folder
```
rmdir /s folder_name
```

---

## Browser URLs

### Local Development
```
http://localhost:3000
```

### Local Network (Replace IP)
```
http://192.168.1.100:3000
```

### After Deployment (Example)
```
https://your-expense-tracker.netlify.app
```

---

## Environment Variables (If Needed)

Create `.env` file in project root:
```
VITE_API_URL=http://localhost:3000
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Git Commands (Optional)

### Initialize Git
```
git init
```

### Add Files
```
git add .
```

### Commit
```
git commit -m "Initial commit"
```

### Check Status
```
git status
```

---

## Quick Reference Table

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Start app | `npm run dev` |
| Build app | `npm run build` |
| Preview build | `npm run preview` |
| Find IP | `ipconfig` |
| Clear cache | `npm cache clean --force` |
| Check Node version | `node --version` |
| Check npm version | `npm --version` |
| Stop app | `Ctrl + C` |

---

## Step-by-Step First Time

1. Open Command Prompt (Windows + R → cmd → Enter)
2. Copy and paste:
   ```
   cd C:\Users\abhijit.desai\CascadeProjects\expense_tracker_app
   ```
3. Press Enter
4. Copy and paste:
   ```
   npm install
   ```
5. Wait for completion (2-3 minutes)
6. Copy and paste:
   ```
   npm run dev
   ```
7. Browser opens automatically
8. Start using the app!

---

## Keyboard Shortcuts in Command Prompt

| Shortcut | Action |
|----------|--------|
| `Ctrl + C` | Stop running process |
| `Ctrl + V` | Paste |
| `Ctrl + A` | Select all |
| `Up Arrow` | Previous command |
| `Down Arrow` | Next command |
| `Tab` | Auto-complete |

---

## Common Error Solutions

### "npm is not recognized"
```
# Restart computer after installing Node.js
# Then try again
```

### "Port 3000 already in use"
```
# Change port in vite.config.js
# Or close the app using port 3000
```

### "Cannot find module"
```
npm install
```

### "Permission denied"
```
# Run Command Prompt as Administrator
```

---

## Deployment Commands

### Deploy to Netlify
1. Build the app:
   ```
   npm run build
   ```
2. Drag `dist` folder to Netlify dashboard

### Deploy to Vercel
1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```
2. Deploy:
   ```
   vercel
   ```

### Deploy to GitHub Pages
1. Build:
   ```
   npm run build
   ```
2. Push `dist` folder to GitHub

---

## Useful Links

- Node.js: https://nodejs.org/
- npm: https://www.npmjs.com/
- Vite: https://vitejs.dev/
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- Chart.js: https://www.chartjs.org/

---

## Notes

- Always run commands in Command Prompt (not PowerShell)
- Navigate to project folder before running commands
- Don't close Command Prompt while app is running
- Use `Ctrl + C` to stop the app
- Restart computer if npm commands don't work

---

**Save this file for quick reference!** 📝

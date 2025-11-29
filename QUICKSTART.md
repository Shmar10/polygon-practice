# 🚀 Quick Start Guide

Get your Polygon Practice app running in 5 minutes!

## ✅ Prerequisites

Make sure you have:
- Node.js 18+ installed ([Download here](https://nodejs.org/))
- A code editor (VS Code recommended)
- Git (optional, for deployment)

## 🏃 Getting Started

### Step 1: You're Already Here!

Your project is set up and ready to go in the `polygon-practice-app` folder.

### Step 2: View Your App

The development server is already running! Open your browser to:

**http://localhost:5173**

You should see the Polygon Practice homepage! 🎉

### Step 3: Explore the Code

Key files to look at:
```
src/
├── App.jsx              ← Main app structure
├── pages/
│   ├── Home.jsx         ← Landing page
│   ├── AnglesPage.jsx   ← Angles practice
│   └── DiagonalsPage.jsx ← Diagonals practice
└── components/shared/
    └── Navigation.jsx    ← Top navigation bar
```

### Step 4: Make Your First Change

1. Open `src/pages/Home.jsx`
2. Find the line: `<h1 className="text-4xl...">Polygon Practice</h1>`
3. Change "Polygon Practice" to "My Awesome Polygon App"
4. Save the file
5. Watch your browser update instantly! ✨

## 🎯 What to Try Next

### Test the Features

1. **Navigate to Angles Practice** - Click "Angles" in the nav bar
2. **Start a Session** - Fill in your name and click "Start New Session"
3. **Answer Problems** - Try solving some problems!
4. **Try Challenge Mode** - Enable the 10-question challenge
5. **Check Diagonals** - Switch to the Diagonals practice mode

### Customize the App

Easy customizations to try:

#### Change Colors

In any component file, find Tailwind classes like:
```javascript
className="bg-blue-600"  // Background color
className="text-green-600" // Text color
```

Try changing them:
- `blue` → `purple`, `pink`, `indigo`
- `600` → `400` (lighter), `800` (darker)

#### Add Your School Name

In `src/pages/Home.jsx`, add below the title:
```javascript
<p className="text-lg text-gray-600 mt-2">
  Jefferson High School
</p>
```

#### Modify Problem Counts

Want more than 10 questions in challenge mode?

In `src/pages/AnglesPage.jsx`, find:
```javascript
const CHALLENGE_LENGTH = 10;
```

Change 10 to any number you want!

## 📦 Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates optimized files in the `dist` folder.

## 🌐 Deploy Options

### Quick Deploy to GitHub Pages

1. Create a GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```
4. Your app will be live at `https://username.github.io/polygon-practice-app/`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for more options (Synology, Netlify, Vercel).

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Check for code issues
npm run lint
```

## 📖 Learning Resources

- **[LEARNING.md](./LEARNING.md)** - Detailed explanations of concepts
- **[README.md](./README.md)** - Complete project documentation
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guides

## 🆘 Troubleshooting

### Port 5173 already in use

Kill the existing process or change the port in `vite.config.js`:
```javascript
export default defineConfig({
  server: { port: 3000 } // Change to any available port
})
```

### Changes not showing up

1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Restart dev server (Ctrl+C, then `npm run dev`)

### Build errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Can't find a file

Remember:
- Use forward slashes: `import X from './path/to/file'`
- File extensions matter: `.jsx` not `.js` for components
- Case sensitive: `Home.jsx` ≠ `home.jsx`

## 💡 Pro Tips

1. **Keep the dev server running** - It auto-reloads on changes
2. **Use React DevTools** - Install the browser extension
3. **Check the console** - Press F12 to see errors
4. **Read error messages** - They usually tell you exactly what's wrong
5. **Git commit often** - Save your progress frequently

## 🎓 Next Steps

1. ✅ Run the app (you're here!)
2. 📝 Read [LEARNING.md](./LEARNING.md) to understand the code
3. 🎨 Customize colors and text
4. ➕ Add a new feature
5. 🚀 Deploy to GitHub Pages

## 🎉 You're Ready!

You now have a fully functional, modern React app! 

**Explore, experiment, and have fun learning!** 🚀

---

*Need help? Check the other guides or search for React tutorials online.*


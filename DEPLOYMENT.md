# Deployment Guide

This guide covers multiple deployment options for the Polygon Practice app.

## 📦 Option 1: GitHub Pages (Recommended - Free & Easy)

### Automatic Deployment with GitHub Actions

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/polygon-practice-app.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy on every push to `main`

3. **Update the base path:**
   - Open `vite.config.js`
   - Change `'/polygon-practice-app/'` to match your repository name
   - Commit and push the changes

4. **Access your app:**
   - Your app will be available at: `https://YOUR_USERNAME.github.io/polygon-practice-app/`
   - Wait a few minutes for the first deployment to complete

### Manual Deployment with gh-pages

```bash
# Build and deploy in one command
npm run deploy

# Or step by step:
npm run build:gh-pages
npx gh-pages -d dist
```

---

## 🖥️ Option 2: Synology NAS (Self-Hosted)

### Method A: Web Station (Simple)

1. **Enable Web Station:**
   - Open Package Center on your Synology
   - Install "Web Station" if not already installed
   - Open Web Station

2. **Create a Virtual Host (Optional but recommended):**
   - Go to "General Settings" → "Virtual Host"
   - Click "Create"
   - Set up your hostname (e.g., `polygon.local`)
   - Choose a document root (e.g., `/web/polygon-practice`)

3. **Build the app:**
   ```bash
   npm run build
   ```

4. **Upload files:**
   - Copy all files from the `dist` folder to your Synology
   - Use File Station or FTP/SFTP
   - Place them in `/web/polygon-practice` (or your chosen directory)

5. **Access your app:**
   - Navigate to `http://YOUR_NAS_IP/polygon-practice`
   - Or `http://polygon.local` if you set up a virtual host

### Method B: Docker + Nginx (Advanced)

1. **Create a Dockerfile:**
   ```dockerfile
   FROM nginx:alpine
   COPY dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and deploy:**
   ```bash
   # Build the app
   npm run build
   
   # Build Docker image
   docker build -t polygon-practice .
   
   # Run container on Synology
   docker run -d -p 8080:80 --name polygon-practice polygon-practice
   ```

3. **Access your app:**
   - Navigate to `http://YOUR_NAS_IP:8080`

---

## ☁️ Option 3: Netlify (Free Tier Available)

1. **Install Netlify CLI (optional):**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   # Build the app
   npm run build
   
   # Deploy to Netlify
   netlify deploy --prod --dir=dist
   ```

   Or use the Netlify web interface:
   - Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

3. **Automatic Deployment (recommended):**
   - Connect your GitHub repository to Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`

---

## 🚀 Option 4: Vercel (Free Tier Available)

1. **Install Vercel CLI (optional):**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

   Or connect via the Vercel dashboard:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings

---

## 🌐 Option 5: Custom Domain Setup

### For GitHub Pages:
1. Add a `CNAME` file to the `public` folder with your domain
2. Configure your domain's DNS:
   - Add an A record pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add a CNAME record pointing to `YOUR_USERNAME.github.io`

### For Synology:
1. Configure your router to forward port 80/443 to your NAS
2. Set up a dynamic DNS service (Synology provides one)
3. Configure SSL certificates in Synology DSM

---

## 🔧 Development

Run the development server locally:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📝 Environment Variables

If you need to configure the Google Sheets integration:

1. Create a `.env` file:
   ```env
   VITE_GOOGLE_SHEETS_URL=your_script_url_here
   ```

2. Update `src/utils/googleSheets.js` to use the environment variable:
   ```javascript
   const GOOGLE_APP_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;
   ```

---

## 🐛 Troubleshooting

### GitHub Pages shows 404 on refresh
- This is normal for SPAs with client-side routing
- The included workflow handles this automatically
- Or add a `404.html` file that redirects to `index.html`

### Routing doesn't work on Synology
- Configure Web Station to redirect all routes to `index.html`
- Or use HashRouter instead of BrowserRouter in `App.jsx`

### Tailwind styles not loading
- Make sure you ran `npm install`
- Check that `postcss.config.js` and `tailwind.config.js` are present
- Clear your browser cache

---

## 📦 Build Output

The build process creates optimized static files in the `dist` folder:
- Minified JavaScript and CSS
- Optimized images
- Ready to deploy anywhere that serves static files

---

## 🔒 Security Notes

1. **Google Sheets URL:** Keep your Apps Script URL private if it contains sensitive data
2. **CORS:** The app uses `mode: 'no-cors'` for Google Sheets, which is necessary but limits error handling
3. **HTTPS:** Always use HTTPS in production for security

---

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Synology Web Station Guide](https://www.synology.com/en-us/knowledgebase/DSM/help/WebStation)
- [React Router Documentation](https://reactrouter.com/)


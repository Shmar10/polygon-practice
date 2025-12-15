# Quick Guide: Deploying to Synology NAS

This is a quick reference guide specifically for Synology NAS deployment. For full details, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## ✅ Pre-Deployment Checklist

- [ ] Web Station is installed and enabled on your Synology NAS
- [ ] You have Node.js and npm installed on your development machine
- [ ] You have access to your Synology via File Station, FTP, or SFTP

## 🚀 Quick Deployment Steps

### 1. Build the Application

```bash
cd polygon-practice-app
npm install  # Only needed first time
npm run build
```

**Important:** Use `npm run build` (NOT `npm run build:gh-pages`). This builds with base path `/` for root deployment.

### 2. Verify the Build

Check that `dist/index.html` has asset paths starting with `/` (not `/polygon-practice/`):

✅ **Correct:**
```html
<script src="/assets/index-xxx.js"></script>
```

❌ **Wrong:**
```html
<script src="/polygon-practice/assets/index-xxx.js"></script>
```

Also verify that `dist/.htaccess` exists (it should be automatically copied from `public/`).

### 3. Upload to Synology

**Option A: Using File Station (Easiest)**
1. Open File Station on your Synology
2. Navigate to `/web/` folder (create if it doesn't exist)
3. Create a new folder: `polygon-practice`
4. Upload **all contents** of the `dist` folder to `/web/polygon-practice/`
   - Make sure to include hidden files (`.htaccess`)
   - Enable "Show hidden files" in File Station settings if needed

**Option B: Using FTP/SFTP**
```bash
# From your development machine
cd polygon-practice-app/dist
# Upload all files using your FTP/SFTP client
# Destination: /web/polygon-practice/ on Synology
```

### 4. Configure Web Station

1. Open **Web Station** on your Synology
2. Go to **General Settings** → **Virtual Host**
3. Click **Create** (or use the default host)
4. Configure:
   - **Hostname:** Leave default or set custom (e.g., `polygon.local`)
   - **Document Root:** `/web/polygon-practice`
   - **HTTP Backend Server:** Apache HTTP Server (required for `.htaccess` support)
5. Click **Save**

### 5. Access Your App

- **Default:** `http://YOUR_NAS_IP/polygon-practice/`
- **With Virtual Host:** `http://polygon.local/` (or your configured hostname)

**Test routing:** Try accessing `http://YOUR_NAS_IP/polygon-practice/angles` - it should work!

## 🔧 Troubleshooting

### Routes return 404

**Problem:** Direct access to routes like `/angles` returns 404.

**Solution:**
1. Verify `.htaccess` file exists in `/web/polygon-practice/` on Synology
2. Ensure Apache HTTP Server is selected in Web Station (not Nginx)
3. Check that `mod_rewrite` is enabled (usually enabled by default)

### Assets not loading (CSS/JS files missing)

**Problem:** Page loads but no styles or JavaScript works.

**Solution:**
1. Check that all files from `dist/assets/` folder were uploaded
2. Verify paths in `dist/index.html` start with `/` (not `/polygon-practice/`)
3. Rebuild with `npm run build` (not `build:gh-pages`)
4. Clear browser cache

### App shows blank page

**Problem:** Page is completely white/blank.

**Solution:**
1. Open browser developer tools (F12) → Console tab
2. Look for error messages
3. Check Network tab to see if files are loading
4. Verify all files were uploaded correctly
5. Try accessing `index.html` directly: `http://YOUR_NAS_IP/polygon-practice/index.html`

### Using Nginx instead of Apache

If your Synology uses Nginx:

1. Copy configuration from `nginx-synology.conf` in the project root
2. Apply it to your Nginx configuration
3. The key part is: `try_files $uri $uri/ /index.html;`

## 📝 File Structure on Synology

After deployment, your Synology should have:

```
/web/polygon-practice/
├── .htaccess          ← Important for routing!
├── index.html
├── vite.svg
└── assets/
    ├── index-xxx.js
    └── index-xxx.css
```

## 🔄 Updating the App

To update after making changes:

1. Build again: `npm run build`
2. Upload new files from `dist/` folder to Synology
3. Replace existing files (keep `.htaccess` if you haven't modified it)
4. Clear browser cache or do a hard refresh (Ctrl+F5)

## 🔒 Security & HTTPS (Optional)

To enable HTTPS:

1. In Synology Control Panel → **Security** → **Certificate**
2. Create or import an SSL certificate
3. In Web Station → **Edit** your virtual host
4. Enable HTTPS and select your certificate
5. Access via: `https://YOUR_NAS_IP/polygon-practice/`

## 📚 Additional Resources

- Full deployment guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Synology Web Station documentation: [Official Guide](https://www.synology.com/en-us/knowledgebase/DSM/help/WebStation)
- React Router troubleshooting: [React Router Docs](https://reactrouter.com/)

## ❓ Need Help?

Common issues are covered above. For more details, check:
- Browser console for JavaScript errors
- Synology Web Station logs
- Apache/Nginx error logs


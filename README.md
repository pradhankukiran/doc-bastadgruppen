# Bastadgruppen Documentation App

A React + TypeScript web application built with Vite.

## Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher
- npm (comes with Node.js)

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

This creates a `dist/` folder containing all the static files ready for deployment.

---

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel auto-detects Vite settings - just click **"Deploy"**
5. Done! You'll get a URL like `your-project.vercel.app`

**To use your own domain:**
1. In Vercel dashboard, go to your project → **Settings** → **Domains**
2. Add your domain (e.g., `app.bastadgruppen.se`)
3. Vercel will show DNS records to add at your domain registrar
4. Add the DNS records and wait for verification (usually 5-30 minutes)

---

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repository
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy"**

**To use your own domain:**
1. Go to **Site settings** → **Domain management** → **Add custom domain**
2. Follow the DNS configuration instructions

---

### Option 3: Manual Upload (Any Static Hosting)

If you have traditional web hosting (cPanel, Plesk, etc.):

1. Run the build locally:
   ```bash
   npm install
   npm run build
   ```

2. Upload the entire contents of the `dist/` folder to your web server's public folder (usually `public_html` or `www`)

3. **Important for SPA routing:** Create a `.htaccess` file in the same folder with:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

### Option 4: GitHub Pages

1. Install gh-pages: `npm install -D gh-pages`
2. Add to `package.json` scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`

---

## Environment Variables

If you need to configure environment variables, create a `.env` file:

```
VITE_API_URL=https://your-api.com
```

Access in code with `import.meta.env.VITE_API_URL`

---

## Troubleshooting

**Blank page after deployment?**
- Make sure all files from `dist/` are uploaded
- Check that the `.htaccess` rewrite rules are in place (for Apache servers)

**Routes not working (404 on refresh)?**
- Your server needs to redirect all requests to `index.html`
- On Vercel/Netlify this is automatic
- On Apache, use the `.htaccess` file above
- On Nginx, add: `try_files $uri $uri/ /index.html;`

**Build failing?**
- Make sure you're using Node.js 18+
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

---

## Support

For deployment help, contact the developer.

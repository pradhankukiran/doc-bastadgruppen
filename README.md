# Bastadgruppen Documentation App

A professional web application for managing and viewing documentation, built with React, TypeScript, and Tailwind CSS.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## Features

- Dynamic documentation rendering and organization.
- Export options including PDF generation via `@react-pdf/renderer` and `jspdf`.
- Smooth animations and transitions powered by `framer-motion`.
- Fully responsive design optimized for mobile, tablet, and desktop screens.

---

## Prerequisites

Before setting up the project locally, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm (comes packaged with Node.js)

---

## Local Development

Follow these steps to run the application in a local development environment:

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

Once started, the development server will be accessible at `http://localhost:5173`.

---

## Build and Production

To package the application for production deployment, run:

```bash
npm run build
```

This command generates a `dist/` directory containing the optimized static assets ready for hosting.

---

## Deployment Configuration

### Option 1: Vercel (Recommended)

This project is configured for deployment on Vercel.

1. Connect your GitHub repository to Vercel.
2. Vercel automatically detects the Vite build configuration.
3. Click **Deploy**.

#### Custom Domain Configuration
1. Navigate to the project settings in the Vercel dashboard: **Settings** > **Domains**.
2. Add your custom domain (e.g., `app.bastadgruppen.se`).
3. Update the DNS records at your domain registrar as instructed by Vercel.

---

### Option 2: Netlify

1. Log in to Netlify and select **Add new site** > **Import an existing project**.
2. Connect your GitHub repository.
3. Apply the following Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy the site.

---

### Option 3: Manual Upload (Traditional Hosting)

To deploy on standard hosting servers (e.g., cPanel, Plesk):

1. Generate the production build locally:
   ```bash
   npm install
   npm run build
   ```
2. Upload the contents of the `dist/` directory to the server's public root (typically `public_html` or `www`).
3. For Apache servers, configure single-page application (SPA) routing by adding a `.htaccess` file in the root directory with the following configuration:
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

1. Install the deployment utility:
   ```bash
   npm install -D gh-pages
   ```
2. Add the deployment script to `package.json`:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Run the script:
   ```bash
   npm run deploy
   ```

---

## Environment Variables

For environment-specific configurations, create a `.env` file in the root directory:

```env
VITE_API_URL=https://your-api.com
```

Refer to environment variables in your code using `import.meta.env.VITE_API_URL`.

---

## Troubleshooting

### Blank Page After Deployment
- Confirm all files from the `dist/` directory were successfully uploaded.
- Ensure rewrite rules are active (especially on Apache servers).

### Routing Errors (404 on Page Refresh)
- Ensure your hosting server redirects all traffic to `index.html`.
- On Nginx, add the following directive:
  ```nginx
  try_files $uri $uri/ /index.html;
  ```
- On Vercel and Netlify, SPA routing is handled automatically.

### Build Failures
- Ensure your local Node.js version is 18+.
- Reset dependencies by deleting `node_modules` and `package-lock.json`, and running `npm install`.

# Båstadgruppen EU Declaration of Conformity Generator

A specialized React and TypeScript application built with Vite and Tailwind CSS to dynamically generate regulation-compliant, localized EU Declarations of Conformity (DoCs) for Båstadgruppen products and packaging.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## Project Overview

This application serves as an internal utility to automate the creation of official EU Declarations of Conformity (DoC). Compliance documents are generated as print-ready A4 PDFs containing standard legal, manufacturer, and notified body details tailored to EU PPE and recycling regulations.

---

## Core Features

- **Multi-Language Generation**: Generates compliant PDFs across 22 European languages concurrently (including Swedish, Norwegian, Polish, French, German, Italian, Spanish, Slovak, Greek, and Croatian).
- **Intelligent Brand and Signer Mapping**: Automatically applies the corresponding brand logos and maps authorized signers (along with their scanned signatures and job functions) based on the selected brand (such as Guardio, Monitor, Matterhorn, Top Swede, South West, or Båstadgruppen).
- **Notified Body Profiles**: Includes pre-configured profiles for major European certification institutes and notified bodies (including SGS Fimko, INSPEC International, RICOTEST, TÜV Rheinland, CCQS Certification Services, and DIN CERTCO).
- **Step-by-Step Compliance Wizard**: Uses an intuitive multi-step form built with Framer Motion, featuring data persistence using `localStorage` to save form progress across browser sessions.
- **Interactive Multi-PDF Viewer**: Features a document preview screen allowing users to toggle between localized PDF drafts inside an iframe container before downloading.
- **Custom Typography**: Registers specific fonts (Lato, Noto Sans for extended Latin character sets, and Caveat for handwritten signatures) to ensure high-fidelity document formatting.

---

## Prerequisites

Ensure you have the following installed:

- Node.js (version 18 or higher)
- npm (packaged with Node.js)

---

## Local Development

Follow these steps to set up the development environment:

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

The application will run locally at `http://localhost:5173`.

---

## Build and Production

To compile the application for production deployment, run:

```bash
npm run build
```

This compiles optimized, static assets into the `dist/` directory, ready to be hosted on any web server.

---

## Deployment Configuration

### Option 1: Vercel (Recommended)

This repository is pre-configured for Vercel deployment.

1. Import this repository into your Vercel account.
2. Vercel automatically detects Vite settings.
3. Click **Deploy**.

#### Custom Domain Configuration
- Navigate to the project settings in the Vercel dashboard: **Settings** > **Domains**.
- Add your custom domain (e.g., `app.bastadgruppen.se`).
- Update the DNS records at your domain registrar as instructed by Vercel.

---

### Option 2: Netlify

1. In the Netlify dashboard, select **Add new site** > **Import an existing project**.
2. Connect your GitHub repository.
3. Configure the following Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy**.

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

1. Install the deployment package:
   ```bash
   npm install -D gh-pages
   ```
2. Add the deployment script to `package.json`:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Deploy the application:
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

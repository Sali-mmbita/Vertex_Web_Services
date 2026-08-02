# CUSTOMIZATION.md — Visual Browser CMS & Free Deployment Guide

This documentation details how to customize this enterprise-grade contractor template for other home-service, plumbing, or technician clients, and how to host the resulting website completely for free.

---

## 🚀 1. Dual-State Architecture (Static + Dynamic CMS)

This template is engineered with a **Dual-State Configuration Model** that bridges high-performance Static Site Generation (SSG) with a beautiful, real-time visual client editor:

1.  **Static Fallback (`src/config/client.config.ts`):** Used during production compiles (`next build`) to ensure 100% fast loading, clean SEO schema injection (JSON-LD), and maximum static reliability.
2.  **Dynamic Browser CMS (`/admin`):** Reactively merges client-side edits stored inside the browser's `localStorage` (`vortex-custom-config`). 
    *   **Real-Time Previews:** When you make visual edits on `/admin` and click **"Save & Apply Preview"**, the entire website (Home page, Services, Blog, Testimonials, Chatbot, etc.) instantly re-renders using your custom parameters!

---

## 🛠️ 2. Structure of `client.config.ts`

The config implements the strict TypeScript interface `ClientConfig` defined in `src/types/config.ts`. It is managed centrally inside:
👉 **`src/config/client.config.ts`**

### A. Corporate Identity & Logo (`meta`)
Controls core company branding, telephone lines, support emails, regulatory licensing, and custom logo marks:

```typescript
export const clientConfig = {
  meta: {
    name: 'Vortex Flow Diagnostics',      // Corporate name
    phone: '(650) 555-FLOW',               // Displayed formatted phone
    phoneRaw: '6505553569',                // Tap-to-call mobile link (tel:)
    emergencyPhone: '(650) 555-9111',      // 24/7 hotline display
    emergencyPhoneRaw: '6505559111',       // Raw hotline link
    email: 'ops@vortexflow.com',           // Support email
    address: {
      street: '430 Sherman Ave, Suite 100', // Physical street
      city: 'Palo Alto',
      state: 'CA',
      zip: '94306',
      lat: 37.4419,                        // Latitude (centers map pins)
      lng: -122.1430,                      // Longitude
      serviceRadiusMiles: 15,              // Stated dispatch radius
      zipCodes: ['94301', '94303', '94306', '95051'] // Active ZIP codes for lookup map
    },
    licenseNumber: 'CSLB #1094832',        // Licensing or regulatory badge
    rating: 4.9,                           // Google rating (populates SEO schema)
    reviewCount: 248,                      // Count (populates SEO schema)
    establishedYear: 2012,                 // Used for operating year calculations
    socialLinks: {
      facebook: 'https://facebook.com/vortexflow',
      yelp: 'https://yelp.com/biz/vortexflow',
      google: 'https://google.com'
    },
    logo: {
      icon: 'Activity',                    // Lucide React icon name for logo brand
      primaryText: 'VORTEX',               // First bold logo word
      secondaryText: 'FLOW'                // Second accent logo word
    }
  },
  // ...
}
```

### B. Color Scheme & Brand Theme (`theme`)
Supports any valid CSS color input (including **HEX** `#4f46e5`, **RGB** `rgb(...)`, **HSL**, or **Names** like `purple`):

```typescript
  theme: {
    primaryAccent: '#4f46e5',    // Primary highlight color variable
    secondaryAccent: '#06b6d4',  // Secondary neon accent variable
    glassmorphism: {
      blur: 'xl',                // Core backdrop-blur strength
      bgOpacity: 0.08,
      borderOpacity: 0.12
    }
  }
```

---

## 🎨 3. Visual No-Code Studio Workspace (`/admin`)

To visually modify, test, and ship your client's brand coordinates in the browser:
1.  Run the local development compiler:
    ```powershell
    npm run dev
    ```
2.  Open your browser and navigate to:
    👉 **`http://localhost:3000/admin`**

### Tabbed Editing Suites:
*   **🏢 Company & Logo:** Visually customize corporate coordinates, support channels, and change the brand logo's Lucide icon, primary, and secondary text on the fly.
*   **🎨 Palette & Theme:** Features HTML5 **draggable color wheels** alongside text fields to design brand colors, with a **glowing, live visual swatch reviewer board** showing exactly how your chosen colors harmonize.
*   **🛠️ Services Catalog:** Add, edit, or delete service listings. Calibrate route slugs, Lucide icon landmarks, prices, and long descriptions.
*   **HelpCircle Searchable FAQs:** Add, edit, or delete FAQ accordion items. All FAQs automatically feed into Google’s search metadata `FAQPage` schema on build.
*   **FileText Blog Grid:** Write, publish, or delete blog articles (managing authors, snippets, read-times, tags, and multi-paragraph stories).
*   **Star Testimonials Feed:** Edit review sliders, adjusting star counts, names, Google/Yelp sources, and review texts.
*   **Image Before/After Sliders:** Edit before/after project comparison slides.
*   **Briefcase Careers Openings:** Manage active job openings. Add, edit, or delete job posts, detailing departments, salaries, descriptions, bulleted requirements, and job benefits.
*   **FileText Page Content Heroes:** Customize text layers, banners, titles, and CTA copies for the Home Page, About Story, and Careers headers.
*   **Sparkles Gemini AI Assistant:** Calibrate chatbot names, welcome greeting bubbles, and specialized NLP knowledge nodes (mapping trigger keywords to rich, markdown-compatible replies).

### Saving & Code Exporting Workflows:
*   **Save & Apply Preview:** Writes your state to `localStorage` and reloads. Your entire site immediately reflects your customized details!
*   **Download client.config.ts:** Once happy with the preview, click download to retrieve the perfectly serialized TypeScript file. Simply replace `src/config/client.config.ts` with this file.
*   **Revert Defaults:** Clears browser storage and restores the default repository coordinates.

---

## ☁️ 4. Free Hosting & Deployment Guide

This project is configured as a Next.js Static HTML Export (`output: 'export'` inside `next.config.js`). Running `npm run build` generates a standalone, fully optimized static website within the **`out/`** directory. This output can be hosted completely **for free** on premium developer clouds.

---

### Option A: Hosting on Vercel (Recommended)
Vercel is the creator of Next.js and provides instant, free hosting for static frontends with automatic SSL certificates, global CDN edge delivery, and preview deploys.

#### Method 1: Git-Connected (Automated Deploys)
1. Commit your codebase to a private/public repository on **GitHub**, **GitLab**, or **Bitbucket**.
2. Sign up or log into [Vercel](https://vercel.com) using your Git credentials.
3. Click **Add New** -> **Project**.
4. Import your repository from the displayed list.
5. In **Build & Development Settings**, Vercel automatically detects the **Next.js** framework:
   * **Build Command:** `next build` (or default)
   * **Output Directory:** `out` (Vercel automatically detects Next.js static exports)
6. Click **Deploy**. Vercel will build and serve your customized static template globally!
*Every subsequent `git push` to your master/main branch will automatically compile and roll out updates seamlessly!*

#### Method 2: Command Line (CLI Instant Deploy)
If you prefer not to use Git, deploy directly from your local terminal:
1. Open PowerShell/Terminal in the project root and run:
   ```powershell
   npm install -g vercel
   ```
2. Run the login command and follow instructions:
   ```powershell
   vercel login
   ```
3. Run the compiler and link command:
   ```powershell
   npm run build
   vercel
   ```
4. Choose default settings. To ship to production:
   ```powershell
   vercel --prod
   ```

---

### Option B: Hosting on Netlify
Netlify offers excellent free static hosting with clean routing rules.

#### Method 1: Drag-and-Drop Deploy (Easiest)
1. Run `npm run build` on your machine to generate the **`out/`** folder.
2. Go to [Netlify App Drop](https://app.netlify.com/drop).
3. Drag and drop the local **`out/`** directory directly into the browser box.
4. Netlify will deploy your site in 5 seconds and provide a random `netlify.app` subdomain!

#### Method 2: Git-Connected
1. Log into Netlify and click **Add new site** -> **Import an existing project**.
2. Connect GitHub and select your repository.
3. In the Build Configuration:
   * **Build command:** `npm run build`
   * **Publish directory:** `out`
4. Click **Deploy Site**.

#### 🔗 Clean URLs Config on Netlify (Highly Recommended)
Next.js exports paths like `/services.html`. If you want users to navigate using beautiful clean URLs (like `/services` instead of `/services.html`), create a file named `netlify.toml` in the project root containing:

```toml
[[redirects]]
  from = "/*"
  to = "/:splat"
  status = 200
  force = false
```

---

### Option C: Hosting on Cloudflare Pages
Cloudflare Pages offers unlimited bandwidth, extreme DDoS protection, and a free tier.

1. Commit your codebase to a GitHub/GitLab repository.
2. Sign up or log into [Cloudflare Dashboard](https://dash.cloudflare.com) and navigate to **Workers & Pages**.
3. Click **Create Application** -> **Pages** -> **Connect to Git**.
4. Authorize Cloudflare and select your repository.
5. Set up the Build configuration:
   * **Framework Preset:** `Next.js (Static HTML Export)`
   * **Build Command:** `npm run build`
   * **Build output directory:** `out`
6. Click **Save and Deploy**. Cloudflare compiles your code and serves it on its ultra-fast edge network!

---

### Option D: Hosting on GitHub Pages
GitHub Pages allows you to host the static export directly out of your GitHub repository.

1. Open `next.config.js` and if you are using a user repository (like `username.github.io/project-name`), set the `basePath` inside the NextConfig:
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/project-name', // Only if not deploying to a custom domain!
     images: { unoptimized: true }
   };
   ```
2. Install the `gh-pages` helper utility:
   ```powershell
   npm install dev gh-pages
   ```
3. Add a deploy script to your `package.json` under `"scripts"`:
   ```json
   "deploy": "npm run build && gh-pages -d out"
   ```
4. Run the deploy script:
   ```powershell
   npm run deploy
   ```
5. In GitHub under your repository **Settings** -> **Pages**, change the Source branch to `gh-pages` (Folder: `/root`). Your static site will compile and deploy automatically!

---

## 🔍 5. Local Testing & Verification

Remember: Static exports are meant to run on HTTP protocols. Always preview the compiled output locally before publishing:

```powershell
# Run the local HTTP server
npx serve out
```
Open `http://localhost:5000` to view the fully styled template exactly as search engines and browsers will render it!

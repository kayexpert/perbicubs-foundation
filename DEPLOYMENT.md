# 🚀 Deployment Guide: Perbicubs Foundation on Namecheap cPanel

> Complete step-by-step instructions for hosting this Next.js app on Namecheap
> cPanel with automatic GitHub deployments.

---

## Files Added to This Project

| File | Purpose |
|---|---|
| `server.js` | Node.js entry point for Phusion Passenger (cPanel's app runner) |
| `.cpanel.yml` | Auto-deploy script — runs `npm install` + `npm run build` after each git push |
| `.env.example` | Safe template listing all required environment variables (no real secrets) |

---

## Part 1 — Set Up Node.js App in cPanel

### Step 1: Open the Node.js App Manager
1. Log into **Namecheap cPanel** → scroll to **"Software"** section
2. Click **"Setup Node.js App"**

### Step 2: Create New Application
Click **"+ Create Application"** and fill in:

| Field | Value |
|---|---|
| **Node.js version** | `20.x` (select the latest 20.x available) |
| **Application mode** | `Production` |
| **Application root** | `public_html` *(or a subfolder, e.g., `public_html/perbicubs`)* |
| **Application URL** | Your domain (e.g., `perbicubs.org`) |
| **Application startup file** | `server.js` |

Click **"Create"**.

### Step 3: Add Environment Variables
In the same Node.js App page, scroll to **"Environment Variables"** and add each variable from `.env.example` with your **real production values**:

```
NEXT_PUBLIC_SUPABASE_URL         = https://mcaywvwsjavkfoesoblz.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = (your real key)
STRIPE_SECRET_KEY                = sk_live_... (your live key)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_... (your live key)
ADMIN_EMAIL                      = admin@perbicubs.org
ADMIN_PASSWORD                   = (strong password)
ADMIN_SESSION_SECRET             = (64-char hex — generate below)
NODE_ENV                         = production
```

**Generate a secure `ADMIN_SESSION_SECRET`** by running this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Click **"Save"** after adding all variables.

---

## Part 2 — Connect GitHub via cPanel Git Version Control

### Step 1: Generate a Deploy Key in cPanel
1. cPanel → **"Git Version Control"** (under Files section)
2. Click **"Create"**
3. In the setup form, cPanel will show you an **SSH public key** — copy it

### Step 2: Add the Deploy Key to GitHub
1. Go to your GitHub repo → **Settings** → **Deploy keys**
2. Click **"Add deploy key"**
3. Title: `Namecheap cPanel`
4. Key: paste the SSH key from cPanel
5. ✅ Check **"Allow write access"** → NO (read-only is fine for deploys)
6. Click **"Add key"**

### Step 3: Clone Your Repo in cPanel
Back in cPanel Git Version Control → Create:

| Field | Value |
|---|---|
| **Clone URL** | `git@github.com:yourusername/perbicubs-foundation.git` |
| **Repository path** | `/home/<cpanel_username>/repositories/perbicubs` |
| **Repository name** | `perbicubs` |

Click **"Create"**.

> ⚠️ Use the **SSH clone URL** (starting with `git@github.com:`), NOT the HTTPS URL.
> HTTPS requires a password/token on every pull; SSH uses the deploy key.

### Step 4: Configure the App to Use the Repo
After cloning, go back to **Setup Node.js App** and update the **Application root** to match where cPanel cloned the repo, or use cPanel's file manager to ensure `server.js` and `package.json` are in your application root.

### Step 5: Run the First Build
In **Setup Node.js App**, click **"Run NPM Install"** and then use the terminal button to run:
```bash
npm run build
```
This builds the production Next.js app for the first time.

---

## Part 3 — Enable Auto-Deploy on Git Push (Like Vercel)

### Step 1: Find Your cPanel Webhook URL
In cPanel → **Git Version Control** → find your repo → click the info/details icon.
There will be a **"Update via Webhook"** URL that looks like:
```
https://your-cpanel-server.namecheap.com:2083/execute/VersionControl/update?token=ABC123
```
Copy this URL.

### Step 2: Add Webhook to GitHub
1. Go to your GitHub repo → **Settings** → **Webhooks**
2. Click **"Add webhook"**
3. Fill in:
   - **Payload URL**: paste the cPanel webhook URL from above
   - **Content type**: `application/json`
   - **Which events**: Select **"Just the push event"**
   - **Active**: ✅ checked
4. Click **"Add webhook"**

### Step 3: Configure Branch Filter
> ⚠️ Important: cPanel Git Version Control only deploys from the branch that was set when you created the repo connection (typically `main` or `master`). Pushes to other branches will trigger a pull but won't deploy if the branch doesn't match.

To ensure only `main` deploys:
- In cPanel → Git Version Control → your repo → it will show the tracked branch
- Make sure it's set to `main`

### How Auto-Deploy Works After Setup
```
git push origin main
        ↓
GitHub Webhook fires instantly
        ↓
cPanel receives webhook → runs git pull
        ↓
.cpanel.yml runs: npm install → npm run build
        ↓
Phusion Passenger detects changes → restarts app
        ↓
Your site is updated! ✅ (typically within 2–5 minutes)
```

---

## Part 4 — Domain & SSL Setup

Since your domain is already registered with Namecheap, this is straightforward.

### Step 1: Point Domain to Your Hosting Account
1. Log into **Namecheap account panel** (not cPanel — the main namecheap.com dashboard)
2. Go to **Domain List** → click **Manage** next to your domain
3. Under **Nameservers**, make sure it's set to **"Namecheap Web Hosting DNS"**
   - This links your domain to your hosting account automatically

### Step 2: Add Domain to cPanel (if not already there)
1. In cPanel → **Domains** → **Addon Domains** (or it may be your primary domain)
2. If your domain is the **primary domain** of your hosting account, it's already connected

### Step 3: Enable Free SSL (HTTPS)
1. cPanel → **Security** → **SSL/TLS Status** (or **Let's Encrypt SSL**)
2. Click **"Run AutoSSL"** or **"Issue Certificate"** for your domain
3. SSL will be issued and installed automatically (free via Let's Encrypt)

### Step 4: Force HTTPS Redirect
1. cPanel → **Domains** → **Redirects**
2. Set up: `http://perbicubs.org` → `https://perbicubs.org` (301 permanent)
3. Also do: `http://www.perbicubs.org` → `https://perbicubs.org`

---

## Part 5 — Update External Services

### Update Supabase Allowed URLs
1. Go to [Supabase Dashboard](https://app.supabase.com) → Your Project
2. **Authentication** → **URL Configuration**
3. Update **Site URL**: `https://perbicubs.org`
4. Add to **Redirect URLs**:
   - `https://perbicubs.org/**`
   - `https://www.perbicubs.org/**`

### Update Stripe Webhook (if you have one configured)
1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**
2. Update the endpoint URL to: `https://perbicubs.org/api/webhook` (or your actual webhook route)

---

## Part 6 — Updating `.cpanel.yml` With Your Real Values

Before pushing, edit `.cpanel.yml` in this project and replace the placeholders:

```yaml
# Replace these two values:
- export NODEPATH=/home/<cpanel_username>/nodevenv/<app_folder_name>/20/bin
```

- `<cpanel_username>` → your actual cPanel username (shown top-right in cPanel)
- `<app_folder_name>` → the Application root folder name you chose in Part 1, Step 2

**Example** (if your cPanel username is `perbicub` and app root is `public_html`):
```yaml
- export NODEPATH=/home/perbicub/nodevenv/public_html/20/bin
```

---

## Part 7 — Final Checklist Before Going Live

- [ ] `.cpanel.yml` updated with your real cPanel username and app folder
- [ ] All environment variables set in cPanel Node.js App manager
- [ ] First build completed successfully on the server
- [ ] Site loads at `https://perbicubs.org`
- [ ] SSL padlock shows in browser
- [ ] Stripe checkout works end-to-end
- [ ] Admin login at `/admin/login` works
- [ ] Supabase data loads (blog posts, gallery, etc.)
- [ ] Test auto-deploy: make a small change, push to main, wait 2–5 min, verify change is live

---

## Troubleshooting

| Problem | Solution |
|---|---|
| Site shows "Application Error" | Check cPanel → Node.js App → logs. Usually a missing env variable or build failure |
| Build fails with "out of memory" | Add `--max-old-space-size=512` to build: `NODE_OPTIONS='--max-old-space-size=512' next build` |
| Webhook doesn't trigger | Verify webhook URL in GitHub → Webhooks → Recent Deliveries tab for error details |
| SSL not working | Wait 10 minutes after running AutoSSL; DNS propagation can take up to 48h for new domains |
| Admin login redirects loop | Make sure `ADMIN_SESSION_SECRET` env var is set in cPanel (not just in `.env.local`) |
| Supabase auth not working | Make sure your new domain is in Supabase → Authentication → URL Configuration |

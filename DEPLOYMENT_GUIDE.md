# 🚀 Live Deployment Guide: Elderly Pension Disbursement Tracker

This project is configured for **1-click live public deployment** so you can easily include a live working link in your GitHub repository and college viva submission.

---

## 📌 Step 1: Push Your Code to GitHub

If you haven't connected your GitHub repository yet, run the following commands in your terminal:

```bash
# 1. Check git status
git status

# 2. Add your GitHub remote repository (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 3. Rename branch to main
git branch -M main

# 4. Push all code to GitHub
git push -u origin main
```

---

## 🌐 Option A: Deploy on Render (Recommended for Full-Stack)
Render hosts both the **React Frontend** and **Node.js Express Backend** on a single unified URL with 24/7 uptime and free SSL (`https://...onrender.com`).

1. Go to **[Render.com](https://render.com/)** and sign in with your GitHub account.
2. Click **"New +"** -> **"Web Service"**.
3. Select your GitHub repository (`YOUR_REPO_NAME`).
4. Set the following settings (pre-configured):
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Click **"Create Web Service"**.
6. Render will automatically build the React app and start the Express server.
7. **Your Permanent Live Link will be**:
   ```text
   https://YOUR_APP_NAME.onrender.com
   ```

---

## ⚡ Option B: Deploy on Vercel
Vercel provides ultra-fast CDN hosting using our pre-configured [`vercel.json`](file:///c:/Users/shaik/assingment/vercel.json).

1. Go to **[Vercel.com](https://vercel.com/)** and log in with GitHub.
2. Click **"Add New..."** -> **"Project"**.
3. Import your GitHub repository.
4. Leave defaults and click **"Deploy"**.
5. **Your Permanent Live Link will be**:
   ```text
   https://YOUR_APP_NAME.vercel.app
   ```

---

## 🗄️ Free 24/7 Cloud MySQL Database Setup (Optional)
To have a live MySQL database accessible worldwide without running localhost:

1. Create a free account on **[Aiven.io](https://aiven.io/)** or **[TiDB Cloud](https://tidbcloud.com/)**.
2. Create a free MySQL database service named `pension_db`.
3. Copy the database connection URI or host/user/password into your Render or Vercel Environment Variables:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `DB_PORT`
4. Run `npm run init-db` once to create the schema and seed data!

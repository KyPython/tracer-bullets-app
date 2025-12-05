# Deployment Guide

This guide covers deploying the Tracer Bullets app to production.

## Architecture

- **Frontend**: Deploy to Vercel (recommended) or Netlify
- **Backend**: Deploy to Railway, Render, or Fly.io

## Prerequisites

1. GitHub repository (push your code first)
2. Accounts on:
   - Vercel (for frontend) - [vercel.com](https://vercel.com)
   - Railway (for backend) - [railway.app](https://railway.app) - or Render/Fly.io

## Step 1: Push to GitHub

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/tracer-bullets-app.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend

### Option A: Railway (Recommended)

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your `tracer-bullets-app` repository
4. Railway will auto-detect the backend folder
5. Set the root directory to `backend`:
   - Go to Settings → Source → Root Directory → Set to `backend`
6. Add environment variable:
   - `PORT` = `3001` (or let Railway assign one)
7. Deploy! Railway will provide a URL like `https://your-app.railway.app`
8. **Copy this URL** - you'll need it for the frontend

### Option B: Render

1. Go to [render.com](https://render.com) and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Name**: `tracer-bullets-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
5. Add environment variable: `PORT=3001`
6. Deploy and copy the URL

### Option C: Fly.io

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. In the `backend` directory:
   ```bash
   cd backend
   fly launch
   ```
3. Follow prompts and deploy
4. Copy the generated URL

## Step 3: Deploy Frontend

### Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your `tracer-bullets-app` repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.railway.app/api` (use your backend URL from Step 2)
6. Deploy!

### Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select your repo
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add environment variable:
   - `VITE_API_URL` = `https://your-backend-url.railway.app/api`
6. Deploy!

## Step 4: Update CORS (if needed)

If you get CORS errors, update `backend/src/index.ts`:

```typescript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

Then redeploy the backend.

## Step 5: Test

1. Visit your frontend URL
2. Create a task
3. Verify it appears in the list (full round trip!)

## Environment Variables Summary

### Backend
- `PORT` - Server port (default: 3001)

### Frontend
- `VITE_API_URL` - Backend API URL (e.g., `https://your-backend.railway.app/api`)

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` is set correctly
- Verify backend is running and accessible
- Check CORS settings in backend

### Backend won't start
- Ensure `PORT` environment variable is set
- Check build logs for TypeScript errors
- Verify `npm run build` completes successfully

### Tasks not persisting
- This is expected! The current implementation uses in-memory storage
- To persist data, replace `tasksRepo.ts` with a database implementation

## Next Steps

- Replace in-memory storage with a real database (PostgreSQL, MongoDB, etc.)
- Add authentication
- Set up CI/CD pipelines
- Add monitoring and logging

---

**Happy deploying! 🚀**


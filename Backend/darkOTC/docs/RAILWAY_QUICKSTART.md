# Railway Quick Start Guide

## Deploy in 5 Minutes

### Step 1: Connect to Railway

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose `obscura-dark-otc-be`

### Step 2: Configure Environment Variables

Click "Variables" and add these (minimum required):

```env
PORT=3000
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_NETWORK=devnet
OBSCURA_LLMS_BASE_URL=https://obscura-api.daemonprotocol.com
ARCIUM_CLUSTER_OFFSET=456
ARCIUM_PROGRAM_ID=arcaborPMqYhZbLqPKPRXpBKyCMgH8kApNoxp4cLKg
```

### Step 3: Deploy

Railway will automatically:
- Detect Dockerfile
- Build Docker image
- Deploy to production
- Assign public URL

Wait 3-5 minutes for build to complete.

### Step 4: Verify

```bash
curl https://your-app.railway.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": 1737640000000,
  "uptime": 123.456
}
```

## Get Your Railway URL

After deployment:
1. Go to your project in Railway
2. Click "Settings"
3. Find "Domains" section
4. Copy the Railway-provided URL: `https://your-app.railway.app`

## Update Frontend

Update your frontend to use the Railway URL:

```typescript
// Before (local)
const API_URL = 'http://localhost:3000';

// After (production)
const API_URL = 'https://your-app.railway.app';
```

## Common Issues

**Build fails?**
- Check all environment variables are set
- Verify Supabase credentials are correct

**Health check fails?**
- Wait 1-2 minutes for app to start
- Check logs in Railway dashboard

**CORS errors?**
- Add your frontend URL to `CORS_ORIGINS`:
  ```env
  CORS_ORIGINS=https://your-frontend.vercel.app
  ```

## Next Steps

1. Set up custom domain (optional)
2. Configure monitoring
3. Test all API endpoints
4. Update documentation with production URL

## Need Help?

- Full guide: [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)
- Railway docs: https://docs.railway.app
- GitHub issues: https://github.com/fikriaf/obscura-dark-otc-be/issues

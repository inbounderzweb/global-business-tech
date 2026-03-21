#!/bin/bash

# ============================================================
# deploy.sh — Deploy Global Business Tech to Production
# Usage: ./deploy.sh
# ============================================================

VPS_USER="gbtadmin"
VPS_HOST="68.178.175.30"
VPS_PATH="/home/gbtadmin/global-business-tech"
PM2_APP_NAME="global-business-tech"

echo ""
echo "🚀 Starting deployment to globalbusinesstech.in ..."
echo "============================================================"

# Step 1: Build
echo ""
echo "📦 Step 1/3 — Building production bundle..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed! Aborting deployment."
  exit 1
fi
echo "✅ Build successful."

# Step 2: Sync .next folder to VPS (excluding dev cache)
echo ""
echo "📡 Step 2/3 — Syncing files to VPS..."
rsync -avz --progress \
  --exclude '.next/cache' \
  --exclude 'node_modules' \
  --exclude '.git' \
  .next "$VPS_USER@$VPS_HOST:$VPS_PATH/"

if [ $? -ne 0 ]; then
  echo "❌ File sync failed! Check your VPS connection."
  exit 1
fi
echo "✅ Files synced to VPS."

# Step 3: Restart app on VPS
echo ""
echo "🔄 Step 3/3 — Restarting PM2 app on VPS..."
ssh -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" \
  "cd $VPS_PATH && pm2 restart $PM2_APP_NAME"

if [ $? -ne 0 ]; then
  echo "❌ PM2 restart failed!"
  exit 1
fi

echo ""
echo "============================================================"
echo "🎉 Deployment complete! Your site is live at:"
echo "   https://globalbusinesstech.in"
echo "============================================================"
echo ""

#!/bin/bash

# ==============================================================================
# Ozol.org - Deployment Script
# Automates Git push to trigger the GitHub Actions Hostinger deployment
# ==============================================================================

echo "🚀 Preparing deployment for ozol.org..."

# Check if there are changes to commit
if [[ -z $(git status -s) ]]; then
  echo "✅ Working tree is clean. Nothing to deploy."
  exit 0
fi

# Add all changes
git add .

# Get commit message from argument or prompt
if [ -z "$1" ]; then
    read -p "📝 Enter commit message (or press enter for 'Auto-deployment update'): " COMMIT_MSG
else
    COMMIT_MSG="$1"
fi

# Fallback message
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Auto-deployment update"
fi

# Commit and Push
git commit -m "$COMMIT_MSG"
echo "⬆️  Pushing to origin/main..."
git push origin main

echo "🎉 Push complete! The GitHub Action 'Deploy to Hostinger' should be running now."
echo "🔗 View progress at: https://github.com/coldix/ozol/actions"

# GitHub Upload Commands - Manual Guide

## 📍 IMPORTANT: Run these commands from this folder:
```
c:\pharmaproject pratk\WebsiteHostingService\WebsiteHostingService\WebsiteHostingService\pharmamgmt
```

## 🚀 Step-by-Step Commands:

### Step 1: Open Command Prompt in pharmamgmt folder
```bash
cd "c:\pharmaproject pratk\WebsiteHostingService\WebsiteHostingService\WebsiteHostingService\pharmamgmt"
```

### Step 2: Initialize Git repository
```bash
git init
```

### Step 3: Configure Git (Replace with your details)
```bash
git config user.name "Pratik Zope"
git config user.email "pratiks7559@gmail.com"
```

### Step 4: Add remote origin
```bash
git remote add origin https://github.com/Pratiks7559/smart-medicvista-erp.git
```

### Step 5: Add all files to staging
```bash
git add .
```

### Step 6: Check what files will be committed (Optional)
```bash
git status
```

### Step 7: Create initial commit
```bash
git commit -m "Initial commit: Smart MedicVista ERP - Complete Django project with 3 landing pages, inventory, sales, purchase management"
```

### Step 8: Rename branch to main
```bash
git branch -M main
```

### Step 9: Push to GitHub
```bash
git push -u origin main
```

## 🔐 Authentication:

### Option 1: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token
5. When prompted for password, paste the token

### Option 2: GitHub CLI
```bash
# Install GitHub CLI first
gh auth login
git push -u origin main
```

## ⚠️ Common Issues & Solutions:

### Issue 1: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/Pratiks7559/smart-medicvista-erp.git
```

### Issue 2: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Issue 3: Large files error
```bash
# Remove large files from tracking
git rm --cached backups/*.sqlite3
git rm --cached db.sqlite3
git commit -m "Remove large files"
git push -u origin main
```

## 📦 What Gets Uploaded:

✅ Uploaded:
- All Python source code (.py files)
- Templates (HTML files)
- Static files (CSS, JS)
- Configuration files
- README.md
- requirements.txt

❌ Not Uploaded (via .gitignore):
- Database files (db.sqlite3)
- Backup files
- Test files
- Log files
- Virtual environment
- __pycache__ folders
- Media uploads

## 🎯 Quick Upload (One Command):

If you want to upload everything in one go:
```bash
cd "c:\pharmaproject pratk\WebsiteHostingService\WebsiteHostingService\WebsiteHostingService\pharmamgmt" && git init && git config user.name "Pratik Zope" && git config user.email "pratiks7559@gmail.com" && git remote add origin https://github.com/Pratiks7559/smart-medicvista-erp.git && git add . && git commit -m "Initial commit: Smart MedicVista ERP" && git branch -M main && git push -u origin main
```

## 📝 After Upload:

1. Visit: https://github.com/Pratiks7559/smart-medicvista-erp
2. Add description and topics
3. Create releases
4. Add screenshots to README
5. Enable GitHub Pages (optional)

## 🔄 Future Updates:

```bash
# After making changes
git add .
git commit -m "Description of changes"
git push origin main
```

---

✨ Happy Coding!

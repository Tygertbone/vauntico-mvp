# ⚡ Vauntico Quick Start Guide

Get up and running in 5 minutes!

---

## 🚀 Fastest Path to Running

```powershell
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# 3. Open browser
# Visit: http://localhost:3000
```

That's it! 🎉

---

## 📋 First Time Setup

### Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Git installed

### Installation
```powershell
# Clone (if needed)
git clone <repo-url>
cd vauntico-mvp-cursur-build

# Install
pnpm install
```

---

## 🧪 Testing Before Deployment

### Option 1: Automated Test Scripts
```powershell
# Test development
.\test-dev.ps1

# Test production build
.\test-build.ps1
```

### Option 2: Manual Testing
```powershell
# Development
pnpm dev
# Visit: http://localhost:3000

# Production Build
pnpm build
pnpm preview
# Visit: http://localhost:4173
```

---

## 🌐 Available Routes

Once running, test these URLs:

- **Dashboard**: `http://localhost:3000/`
- **Creator Pass**: `http://localhost:3000/creator-pass`
- **Vaults**: `http://localhost:3000/vaults`
- **Dream Mover**: `http://localhost:3000/dream-mover`
- **Pricing**: `http://localhost:3000/pricing`

---

## 🚢 Deployment

### Option 1: Vercel (Recommended)
```bash
# Already configured! Just push:
git add .
git commit -m "Deploy Vauntico"
git push origin main

# Vercel auto-deploys!
```

### Option 2: Manual Build
```powershell
pnpm build
# Upload dist/ folder to your host
```

---

## 📁 Project Structure

```
src/
├── App.jsx              # Main app + routing
├── main.jsx             # Entry point
├── index.css            # Global styles
└── pages/
    ├── Dashboard.jsx    # Main hub
    ├── CreatorPass.jsx  # Subscription
    ├── Vaults.jsx       # Content management
    ├── DreamMover.jsx   # AI generation
    └── Pricing.jsx      # Pricing page
```

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  vault: {
    purple: '#6c5ce7',  // Change this
    blue: '#0984e3',    // And this
    cyan: '#00cec9',    // And this
  }
}
```

### Add New Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```

---

## 🐛 Troubleshooting

### Dev server won't start
```powershell
# Clear and reinstall
rm -rf node_modules
pnpm install
pnpm dev
```

### Build fails
```powershell
# Clear build cache
rm -rf dist .vite
pnpm build
```

### Styles not loading
```powershell
# Rebuild Tailwind
pnpm build
```

---

## 📚 Need More Help?

- **Setup**: See `README.md`
- **Architecture**: See `VAULT_REFORGING_ARC_COMPLETE.md`
- **Deployment**: See `DEPLOYMENT_CHECKLIST.md`
- **Overview**: See `PHASE_1_COMPLETE_SUMMARY.md`

---

## ⚡ Quick Commands

```powershell
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm lint       # Check code quality
```

---

## 🎯 Next Steps

1. ✅ Run dev server and test all routes
2. ✅ Customize colors/content as needed
3. ✅ Run production build test
4. ✅ Deploy to Vercel
5. ✅ Validate live site

---

**Happy coding! 🚀**

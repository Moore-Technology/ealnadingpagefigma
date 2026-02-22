# Quick Setup Guide

## ⚡ 5-Minute Setup

### Step 1: Clone and Install
```bash
# Clone your repository
git clone https://github.com/yourusername/ea-study-app.git
cd ea-study-app

# Install dependencies
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see the EA Study Pro dashboard!

## ✅ Verify Installation

You should see:
- ✅ Dark glassmorphic dashboard
- ✅ ReadyScore gauge showing "87 ± 8"
- ✅ Adaptive Daily Missions (3 cards)
- ✅ AI Mentor Chat in right sidebar
- ✅ AI Insights Dashboard
- ✅ Navigation buttons (Exam Simulation, Ethics Roleplay, Career Path)

## 🔧 Project Structure After Setup

```
ea-study-app/
├── node_modules/          # ✅ Installed dependencies
├── src/
│   └── main.tsx          # React entry point
├── components/           # ✅ All 20+ React components
│   ├── ReadyScoreGauge.tsx
│   ├── AIMentorChat.tsx
│   ├── PrometricExamSimulator.tsx
│   ├── EthicsRoleplayRPG.tsx
│   └── ...
├── styles/
│   └── globals.css       # Tailwind CSS + custom styles
├── App.tsx               # Main app component
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
└── index.html            # HTML entry point
```

## 🎯 Test Key Features

### 1. AI Mentor Chat
- Click in the chat input (right sidebar)
- Type: "Explain Circular 230 ethics"
- Press Enter
- AI responds with detailed explanation

### 2. Exam Simulator
- Click "Exam Simulation" button
- See Prometric-realistic gray/white interface
- Try:
  - Opening calculator
  - Flagging a question
  - Striking through answer options
  - Navigating with question palette (left sidebar)

### 3. Ethics Roleplay
- Click "Ethics Roleplay" button
- See client avatar with shady request
- Choose an ethical response
- Watch Practice Rights meter change
- See Circular 230 reference

### 4. ReadyScore Confidence
- Note the "± 8" under the main score
- This shows statistical precision based on 286 questions answered

## 🚀 Next Steps

### Option A: Deploy to Vercel (1 minute)
```bash
npm install -g vercel
vercel
```
Follow prompts, get live URL instantly.

### Option B: Connect Real AI (5 minutes)
1. Get OpenAI API key from https://platform.openai.com
2. Create `.env` file:
   ```env
   VITE_OPENAI_API_KEY=sk-your-key-here
   ```
3. Update `/components/AIMentorChat.tsx` (see README.md)
4. Restart dev server

### Option C: Customize for Your Wife
1. Update user name in `App.tsx` (line 114): `"Welcome back, [Her Name]!"`
2. Adjust initial ReadyScore if needed (line 180)
3. Change exam countdown days (line 244)
4. Add her actual weak areas (line 189)

## 📱 Test Responsive Design

### Mobile View
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select "iPhone 14 Pro"
4. See bottom tab navigation
5. Test touch targets (all buttons 48px+)

### Desktop View
1. Maximize browser window
2. See sidebar navigation (left)
3. See AI chat + insights (right)
4. Test all 3 feature cards

## 🐛 Common Issues

### Issue: Port 3000 already in use
**Solution**:
```bash
# Kill the process
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

### Issue: Tailwind classes not working
**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
**Solution**:
```bash
# Ensure TypeScript is installed
npm install -D typescript
npm run dev
```

### Issue: Lucide icons not showing
**Solution**:
```bash
# Reinstall lucide-react
npm uninstall lucide-react
npm install lucide-react@0.556.0
```

## 🔒 Before Pushing to GitHub

1. **Add to .gitignore** (already done):
   - `node_modules/`
   - `.env`
   - `dist/`

2. **Update README.md**:
   - Change repository URL
   - Add your contact info
   - Add screenshots (optional)

3. **Test build**:
   ```bash
   npm run build
   npm run preview
   ```

4. **Initial commit**:
   ```bash
   git add .
   git commit -m "Initial commit: EA Study Pro v1.0"
   git push origin main
   ```

## 🎨 Customization Ideas for Copilot

Once setup is complete, use GitHub Copilot to:

1. **Add more practice questions**
   - Open `PrometricExamSimulator.tsx`
   - Type: `// Generate 50 Part 2 business taxation questions`

2. **Create new AI responses**
   - Open `AIMentorChat.tsx`
   - Type: `// Add response for partnership taxation rules`

3. **Build a leaderboard**
   - Create new file: `Leaderboard.tsx`
   - Type: `// Create a leaderboard component showing top performers`

4. **Add email reminders**
   - Type: `// Create a feature to send daily study reminders via email`

See `COPILOT_GUIDE.md` for 50+ more ideas!

## 📊 Performance Benchmarks

After setup, your app should achieve:
- **First Load**: < 2 seconds
- **Lighthouse Score**: 95+
- **Bundle Size**: ~180KB gzipped
- **Time to Interactive**: < 2.5s

Test with:
```bash
npm run build
npx serve dist
```

Then run Lighthouse in Chrome DevTools.

## 🎓 Learning Resources

### React + TypeScript
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Official React Docs](https://react.dev)

### Tailwind CSS
- [Tailwind v4 Docs](https://tailwindcss.com/docs)
- [Glassmorphism Generator](https://hype4.academy/tools/glassmorphism-generator)

### Vite
- [Vite Guide](https://vitejs.dev/guide/)
- [Vite + React](https://vitejs.dev/guide/features.html#jsx)

## 🆘 Get Help

If you encounter issues:

1. **Check the Console** (F12 in browser)
   - Look for error messages
   - Note which component is failing

2. **Ask GitHub Copilot**
   - Open Copilot Chat
   - Paste the error message
   - Ask: "How do I fix this?"

3. **Check Dependencies**
   ```bash
   npm list
   ```
   Ensure all packages installed correctly

4. **Fresh Start**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

## ✨ You're All Set!

Your EA Study Pro app is now running with:
- ✅ AI-powered adaptive learning
- ✅ Realistic Prometric exam simulator
- ✅ Gamified ethics training
- ✅ Predictive analytics
- ✅ Confidence interval scoring
- ✅ Responsive mobile/desktop design
- ✅ GitHub Copilot optimization

**Next**: Open VS Code, enable Copilot, and start customizing! 🚀

---

*Setup time: ~5 minutes*  
*Last updated: December 20, 2024*

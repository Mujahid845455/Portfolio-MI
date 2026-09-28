# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Customize Your Content

#### Personal Information
- **Hero Section**: `components/sections/Hero.tsx` (Lines 8-12, 16)
- **About Section**: `components/sections/About.tsx` (Lines 6-30)
- **Contact Info**: `components/sections/Contact.tsx` (Lines 56-75)

#### Projects
- **Featured Project**: `components/sections/Projects.tsx` (Lines 18-60)
- **Other Projects**: Same file (Lines 62-100)

#### Skills & Experience
- **Skills**: `components/sections/Skills.tsx` (Lines 6-60)
- **Experience**: `components/sections/Experience.tsx` (Lines 6-20)

#### Achievements
- **Achievements**: `components/sections/Achievements.tsx` (Lines 7-90)

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## Key Features

✅ **Glassmorphism Design** - Modern glass effect UI  
✅ **Particle Animation** - Dynamic background  
✅ **Featured Project Showcase** - Interactive tabs  
✅ **Category Filtering** - Filter projects by type  
✅ **Smooth Animations** - Framer Motion throughout  
✅ **Fully Responsive** - Mobile, tablet, desktop  
✅ **Contact Form** - With validation  
✅ **SEO Optimized** - Meta tags and structure  

---

## Common Customizations

### Change Colors

Edit `app/globals.css`:
- Background: Change `#111827` to your color
- Accent colors: Search and replace `blue-` with your color name

### Update Social Links

Update in 3 files:
1. `components/sections/Hero.tsx` (Line 8)
2. `components/Footer.tsx` (Line 7)
3. Both have GitHub, LinkedIn, Email links

### Add Project Images

1. Place images in `public/projects/`
2. Name them: `gesturelink.jpg`, `intellicredit.jpg`, etc.
3. Images automatically load from those paths

### Setup Working Contact Form

Install EmailJS:
```bash
npm install @emailjs/browser
```

Update `components/sections/Contact.tsx`:
```typescript
import emailjs from '@emailjs/browser';

// Replace setTimeout with:
emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', e.target, 'PUBLIC_KEY')
  .then(() => setStatus('success'))
  .catch(() => setStatus('error'));
```

---

## Build for Production

```bash
npm run build
npm start
```

---

## Tech Stack

- ⚡ Next.js 14
- 🎨 Tailwind CSS
- ✨ Framer Motion
- 📝 TypeScript
- 🎯 React Icons
- 🔥 Vercel (deployment)

---

## Need Help?

📖 See [SETUP.md](./SETUP.md) for detailed instructions  
📚 See [README.md](./README.md) for full documentation  

---

**Your portfolio is ready!** 🎉

Just customize the content and deploy. Good luck with your job search!

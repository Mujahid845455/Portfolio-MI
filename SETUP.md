# Portfolio Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Customization Steps

### 1. Update Personal Information

#### Hero Section (`components/sections/Hero.tsx`)
- Update name, role, and introduction text
- Update social media links (GitHub, LinkedIn, Email)

#### About Section (`components/sections/About.tsx`)
- Update education history
- Update work experience details
- Update interests

#### Contact Section (`components/sections/Contact.tsx`)
- Update email address
- Update phone number
- Update location

### 2. Add Your Projects

#### Update Featured Project (`components/sections/Projects.tsx`)
- Replace featured project details (line 19-60)
- Update project name, description, features, tech stack
- Update GitHub and demo links

#### Update Other Projects (line 62-95)
- Add/remove projects from the array
- Update project details for each entry

### 3. Add Project Images

**Option 1: Local Images**
1. Add images to `public/projects/` folder
2. Name them: `gesturelink.jpg`, `intellicredit.jpg`, etc.
3. Images will be automatically loaded

**Option 2: Use Placeholders**
- Remove the `Image` import and use colored divs (already implemented as fallback)

### 4. Update Skills

Edit `components/sections/Skills.tsx`:
- Add/remove skills from categories (lines 5-50)
- Add new skill categories if needed

### 5. Update Experience

Edit `components/sections/Experience.tsx`:
- Add new work experiences to the array (line 6)
- Update responsibilities and technologies

### 6. Update Achievements

Edit `components/sections/Achievements.tsx`:
- Update major achievements (line 7-27)
- Update hackathon participations (line 29-43)
- Update certifications (line 45-64)
- Update coding profile links (line 66-71)

### 7. Setup Contact Form (Optional)

The form currently shows a success message. To make it functional:

#### Option 1: EmailJS (Recommended)
```bash
npm install @emailjs/browser
```

In `Contact.tsx`, replace the setTimeout with:
```typescript
import emailjs from '@emailjs/browser';

emailjs.sendForm(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  e.target as HTMLFormElement,
  'YOUR_PUBLIC_KEY'
)
  .then(() => {
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  })
  .catch(() => {
    setStatus('error');
  });
```

#### Option 2: API Route
Create `app/api/contact/route.ts` and implement your email sending logic.

### 8. Add Your Resume

1. Export your resume as PDF
2. Replace `public/resume.pdf` with your file
3. Or keep the same filename for automatic linking

### 9. Customize Colors

Edit `app/globals.css` to change:
- Color scheme (line 15-20)
- Glass effect opacity
- Glow colors
- Gradient colors

### 10. SEO & Meta Tags

Edit `app/layout.tsx` (lines 9-13):
- Update title
- Update description
- Add keywords
- Add Open Graph tags if needed

## Social Media Links

Update in multiple files:
- `components/sections/Hero.tsx` (line 8-12)
- `components/Footer.tsx` (line 6-11)
- `components/Navbar.tsx` (Resume download button)

Current placeholders:
- GitHub: https://github.com/mujahidul885
- LinkedIn: https://linkedin.com/in/mujahidul-islam
- Email: mujahidulI845455@gmail.com

## Performance Optimization

### 1. Optimize Images
```bash
npm install sharp
```
Next.js will automatically optimize images.

### 2. Add Google Analytics (Optional)
```bash
npm install @next/third-parties
```

### 3. Enable Compression
Add to `next.config.ts`:
```typescript
compress: true,
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Import your GitHub repository
   - Deploy automatically

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `.next` folder

## Environment Variables

If needed, create `.env.local`:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Troubleshooting

### Build Errors
```bash
npm run build
```
Check console for specific errors.

### Style Issues
Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

### Image Issues
Ensure images are in `public/` folder and paths start with `/`.

## Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Check Tailwind CSS docs: https://tailwindcss.com/docs
- Check Framer Motion docs: https://www.framer.com/motion/

## Next Steps

1. ✅ Customize all content
2. ✅ Add real project images
3. ✅ Replace resume PDF
4. ✅ Setup contact form
5. ✅ Test on mobile devices
6. ✅ Deploy to production
7. ✅ Share your portfolio! 🚀

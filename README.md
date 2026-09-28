# Mujahidul Islam - Portfolio

A premium portfolio website showcasing web development projects, skills, and achievements.

## 🚀 Features

- **Modern Design**: Glassmorphism effects, smooth animations, particle background
- **Featured Projects**: Interactive project showcase with tabbed navigation
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Performance Optimized**: Built with Next.js 14 and TypeScript
- **Smooth Animations**: Framer Motion for fluid transitions
- **Contact Form**: Fully functional contact form with validation

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React, React Icons
- **Deployment**: Vercel

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Development

Open [http://localhost:3000](http://localhost:3000) to view the portfolio in development mode.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Achievements.tsx
│   │   └── Contact.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ParticleBackground.tsx
├── public/
│   ├── resume.pdf
│   └── projects/
└── package.json
```

## 🎨 Customization

### Update Personal Information

Edit the content in each component section:
- `components/sections/Hero.tsx` - Name, role, introduction
- `components/sections/About.tsx` - Education, experience
- `components/sections/Projects.tsx` - Project details
- `components/sections/Contact.tsx` - Contact information

### Add Project Images

Place project screenshots in `public/projects/` folder and update image paths in `Projects.tsx`.

### Update Resume

Replace `public/resume.pdf` with your actual resume file.

## 📧 Contact Form Setup

To make the contact form functional:

1. Install EmailJS:
```bash
npm install @emailjs/browser
```

2. Create an account at [EmailJS](https://www.emailjs.com/)

3. Add your credentials in `Contact.tsx`:
```typescript
import emailjs from '@emailjs/browser';

// In handleSubmit function
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_PUBLIC_KEY')
```

## 🚀 Deployment

Deploy to Vercel:

```bash
vercel
```

Or push to GitHub and connect to Vercel for automatic deployments.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Mujahidul Islam**
- GitHub: [@mujahidul885](https://github.com/mujahidul885)
- Email: mujahidulI845455@gmail.com

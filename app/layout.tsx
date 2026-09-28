import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseSpotlight from "@/components/MouseSpotlight";
import PlexusBackground from "@/components/PlexusBackground";
import AIChatBot from "@/components/AIChatBot";
import PageWrapper from "@/components/PageWrapper";

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
});

export const metadata: Metadata = {
  title: "M. ISLAM | Portfolio",
  description: "Portfolio of Mujahidul Islam - Full Stack Web Developer specializing in MERN stack, AI/ML projects, and cybersecurity.",
  keywords: "web developer, full stack, MERN, cybersecurity, portfolio, Mujahidul Islam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className={`${outfit.variable} ${jakarta.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <PageWrapper>
          <MouseSpotlight />
          {/* 🌐 Global plexus background — visible on every page */}
          <PlexusBackground />
          <Navbar />
          {children}
          <Footer />
          <AIChatBot />
        </PageWrapper>
      </body>
    </html>
  );
}


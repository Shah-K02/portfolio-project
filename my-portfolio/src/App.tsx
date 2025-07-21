import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Introduction from "./components/Introduction";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { VisualEffects } from "./components/VisualEffects";
import { useSmoothSectionScroll } from "./hooks/useAdvancedScrollAnimation";
import EnhancedSection from "./components/EnhancedSection";

import { ScrollProgress } from "./components/Navigation/ScrollProgress";
import SmoothScrollNav from "./components/Navigation/SmoothScrollNav";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/Navigation/ThemeToggle";
import PerformanceMonitor from "./components/PerformanceMonitor";

import AIAssistant from "./components/AI/AIAssistant";
import analytics from "./utils/advancedAnalytics";
import {
  PerformanceMonitor as PerfMonitor,
  preloadResource,
} from "./utils/performanceOptimizations";
import { usePreload } from "./hooks/useLazyLoading";
import "./App.css";
import "./styles/enhancedScrolling.css";

// Lazy load heavy components (currently unused)

function AppContent() {
  const sectionCount = 5;
  const { sectionRefs, currentSection, isScrolling, scrollToSection } = useSmoothSectionScroll(sectionCount);
  const perfMonitor = useMemo(() => new PerfMonitor(), []);
  
  // Calculate scroll progress for the progress bar
  const [scrollProgress, setScrollProgress] = React.useState(0);
  
  React.useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload critical resources
  usePreload(
    [
      "/fonts/inter.woff2",
      "/fonts/jetbrains-mono.woff2",
      "/images/hero-bg.webp",
    ],
    { delay: 1000 }
  );

  useEffect(() => {
    // Preload critical resources
    preloadResource("/profilepic.jpeg", "image");
    preloadResource("/aboutpic.jpeg", "image");

    // Add resource hints for better performance
    const link1 = document.createElement("link");
    link1.rel = "dns-prefetch";
    link1.href = "//fonts.googleapis.com";
    document.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.rel = "preconnect";
    link2.href = "https://fonts.gstatic.com";
    link2.crossOrigin = "anonymous";
    document.head.appendChild(link2);

    // Start performance monitoring
    perfMonitor.markStart("app-initialization");

    // Start advanced analytics
    analytics.startTracking();
    analytics.trackPageView("home");

    return () => {
      perfMonitor.markEnd("app-initialization");
      perfMonitor.cleanup();
      analytics.stopTracking();
    };
  }, []);



  useEffect(() => {
    // Add font preloading with CDN sources
    const style = document.createElement("style");
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        src: url('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-700-normal.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'JetBrains Mono';
        src: url('https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.18/files/jetbrains-mono-latin-400-normal.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
    `;
    document.head.appendChild(style);

    // Add preload links
    const fontPreloadLinks = [
      {
        href: "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-700-normal.woff2",
        type: "font/woff2",
      },
      {
        href: "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.18/files/jetbrains-mono-latin-400-normal.woff2",
        type: "font/woff2",
      },
    ];

    fontPreloadLinks.forEach((font) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "font";
      link.href = font.href;
      link.type = font.type;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div className="app-container">
      <ThemeToggle />
      <ScrollProgress scrollProgress={scrollProgress} />
      <PerformanceMonitor />

      <AIAssistant
        portfolioData={{
          name: "Portfolio Owner",
          skills: [
            "React",
            "TypeScript",
            "Node.js",
            "Python",
            "AWS",
            "MongoDB",
          ],
          projects: [
            {
              title: "E-commerce Platform",
              description:
                "Full-stack e-commerce solution with React and Node.js",
              technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            },
            {
              title: "Task Management App",
              description:
                "Collaborative task management with real-time updates",
              technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
            },
            {
              title: "Data Visualization Dashboard",
              description: "Interactive analytics dashboard with D3.js",
              technologies: ["React", "D3.js", "Python", "FastAPI"],
            },
          ],
          experience: [
            {
              role: "Senior Frontend Developer",
              company: "Tech Company",
              duration: "2022-Present"
            }
          ]
        }}
      />

      <div className="smooth-scroll-container">
        <AnimatePresence mode="wait">
          <EnhancedSection
            ref={sectionRefs[0]}
            id="introduction"
            animationType="fade"
            direction="up"
            staggerChildren={true}
            staggerDelay={0.15}
            background="gradient"
            enableSnap={true}
            className="introduction-section"
          >
            <Introduction />
          </EnhancedSection>

          <EnhancedSection
            ref={sectionRefs[1]}
            id="about"
            animationType="slide"
            direction="left"
            staggerChildren={true}
            staggerDelay={0.12}
            parallaxIntensity={40}
            enableSnap={true}
            className="about-section"
          >
            <About />
          </EnhancedSection>

          <EnhancedSection
            ref={sectionRefs[2]}
            id="projects"
            animationType="scale"
            direction="up"
            staggerChildren={true}
            staggerDelay={0.1}
            background="blur"
            enableSnap={true}
            className="projects-section"
          >
            <Projects />
          </EnhancedSection>

          <EnhancedSection
            ref={sectionRefs[3]}
            id="skills"
            animationType="rotate"
            direction="right"
            staggerChildren={true}
            staggerDelay={0.08}
            parallaxIntensity={60}
            enableSnap={true}
            className="skills-section"
          >
            <Skills />
          </EnhancedSection>

          <EnhancedSection
            ref={sectionRefs[4]}
            id="contact"
            animationType="magnetic"
            direction="up"
            staggerChildren={true}
            staggerDelay={0.1}
            background="gradient"
            enableSnap={true}
            className="contact-section"
          >
            <Contact />
          </EnhancedSection>
        </AnimatePresence>
      </div>

      {/* <motion.div
        ref={sectionRefs[4]}
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Suspense fallback={
          <div className="loading-fallback">
            <div className="loading-spinner"></div>
            <p>Loading Resume...</p>
          </div>
        }>
          <Resume />
        </Suspense>
      </motion.div> */}

      {/* <motion.div
        ref={sectionRefs[5]}
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Suspense fallback={
          <div className="loading-fallback">
            <div className="loading-spinner"></div>
            <p>Loading Blog...</p>
          </div>
        }>
          <Blog />
        </Suspense>
      </motion.div> */}


      {/* Enhanced Navigation - SmoothScrollNav includes dot and arrow navigation */}
      <SmoothScrollNav
        sections={[
          { id: 'introduction', label: 'Introduction' },
          { id: 'about', label: 'About' },
          { id: 'projects', label: 'Projects' },
          { id: 'skills', label: 'Skills' },
          { id: 'contact', label: 'Contact' }
        ]}
        currentSection={currentSection}
        onSectionChange={scrollToSection}
        isScrolling={isScrolling}
        showLabels={true}
        position="right"
        theme="auto"
      />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress scrollProgress={scrollProgress} />
      
      {/* Scroll velocity indicator */}
      <motion.div
        className="scroll-velocity-indicator"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: '4px',
          height: '60px',
          background: 'linear-gradient(180deg, #64ffda, #7877c6)',
          borderRadius: '2px',
          transformOrigin: 'bottom',
          zIndex: 1000,
          opacity: isScrolling ? 1 : 0,
        }}
        animate={{
          scaleY: isScrolling ? 1 : 0,
          opacity: isScrolling ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

function App() {
  return (
    <div className="app-root">
      <ThemeProvider>
        <ThemeToggle />
        <VisualEffects />
        <AppContent />
      </ThemeProvider>
    </div>
  );
}

export default App;

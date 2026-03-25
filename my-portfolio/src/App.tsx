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
import LiquidMorphNavigation from "./components/Navigation/LiquidMorphNavigation";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/Navigation/ThemeToggle";
import PerformanceMonitor from "./components/PerformanceMonitor";
import AIAssistant from "./components/AI/AIAssistant";
import analytics from "./utils/advancedAnalytics";
import {
  PerformanceMonitor as PerfMonitor,
  preloadResource,
} from "./utils/performanceOptimizations";
import { PROJECTS_DATA } from "./constants/projectsData";
import "./App.css";
import "./styles/enhancedScrolling.css";



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

  // Preload critical resources (disabled to avoid warnings)
  // usePreload(
  //   [
  //     "/fonts/inter.woff2",
  //     "/fonts/jetbrains-mono.woff2",
  //     "/images/hero-bg.webp",
  //   ],
  //   { delay: 1000 }
  // );

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



  // Font preloading is handled via CSS @font-face declarations in theme.css

  return (
    <div className="app-container">
      <ScrollProgress scrollProgress={scrollProgress} />
      {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}

      <AIAssistant
        portfolioData={{
          name: "Shah Kar",
          skills: [
            "React",
            "TypeScript",
            "Node.js",
            "JavaScript",
            "Python",
            "Java",
            "C#",
            "Spring Boot",
            "Express",
            "MongoDB",
            "MySQL",
            "PostgreSQL",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Git",
            "RESTful APIs",
            "JWT",
          ],
          projects: PROJECTS_DATA.map(p => ({
            title: p.title,
            description: p.longDescription || p.description,
            technologies: p.technologies ?? [],
          })),
          experience: [
            {
              role: "Computer Science Graduate",
              company: "Aston University, Birmingham",
              duration: "2021-2024"
            }
          ]
        }}
      />

      <div className="smooth-scroll-container">
        <AnimatePresence>
          <EnhancedSection
            key="introduction-section"
            ref={sectionRefs[0]}
            id="introduction"
            animationType="fade"
            direction="up"
            staggerChildren={true}
            staggerDelay={0.15}
            background="gradient"
            enableSnap={true}
            className="introduction-section"
            currentSection={currentSection}
            sectionIndex={0}
          >
            <Introduction />
          </EnhancedSection>

          <EnhancedSection
            key="about-section"
            ref={sectionRefs[1]}
            id="about"
            animationType="slide"
            direction="left"
            staggerChildren={true}
            staggerDelay={0.12}
            parallaxIntensity={40}
            enableSnap={true}
            className="about-section"
            currentSection={currentSection}
            sectionIndex={1}
          >
            <About />
          </EnhancedSection>

          <EnhancedSection
            key="projects-section"
            ref={sectionRefs[2]}
            id="projects"
            animationType="fade"
            direction="up"
            staggerChildren={true}
            staggerDelay={0.1}
            background="transparent"
            enableSnap={true}
            className="projects-section"
            currentSection={currentSection}
            sectionIndex={2}
          >
            <Projects />
          </EnhancedSection>

          <EnhancedSection
            key="skills-section"
            ref={sectionRefs[3]}
            id="skills"
            animationType="rotate"
            direction="right"
            staggerChildren={true}
            staggerDelay={0.08}
            parallaxIntensity={60}
            enableSnap={true}
            className="skills-section"
            currentSection={currentSection}
            sectionIndex={3}
          >
            <Skills />
          </EnhancedSection>

          <EnhancedSection
            key="contact-section"
            ref={sectionRefs[4]}
            id="contact"
            animationType="magnetic"
            direction="up"
            staggerChildren={true}
            staggerDelay={0.1}
            background="gradient"
            enableSnap={true}
            className="contact-section"
            currentSection={currentSection}
            sectionIndex={4}
          >
            <Contact />
          </EnhancedSection>
        </AnimatePresence>
      </div>




      {/* Enhanced Navigation - LiquidMorphNavigation with fluid animations */}
      <LiquidMorphNavigation
        items={[
          { id: 'introduction', label: 'Home', section: 'introduction' },
          { id: 'about', label: 'About', section: 'about' },
          { id: 'projects', label: 'Projects', section: 'projects' },
          { id: 'skills', label: 'Skills', section: 'skills' },
          { id: 'contact', label: 'Contact', section: 'contact' }
        ]}
        currentSection={currentSection}
        onSectionChange={scrollToSection}
        className="main-liquid-nav"
      />
      

      
      {/* Scroll velocity indicator removed — ScrollProgress bar covers this UX need */}
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

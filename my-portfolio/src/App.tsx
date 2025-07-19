import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Introduction from './components/Introduction';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

import { useScrollNavigation } from './hooks/useScrollNavigation';
import { ScrollArrows } from './components/Navigation/ScrollArrows';
import { DotNavigation } from './components/Navigation/DotNavigation';
import { ScrollProgress } from './components/Navigation/ScrollProgress';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/Navigation/ThemeToggle';
import PerformanceMonitor from './components/PerformanceMonitor';

import AIAssistant from './components/AI/AIAssistant';
import analytics from './utils/advancedAnalytics';
import { PerformanceMonitor as PerfMonitor, preloadResource } from './utils/performanceOptimizations';
import { usePreload } from './hooks/useLazyLoading';
import './App.css';

// Lazy load heavy components (currently unused)

function AppContent() {
  const sectionCount = 5;
  const {
    sectionRefs,
    currentSection,
    hideUpArrow,
    hideDownArrow,
    scrollToSection,
    scrollProgress,
  } = useScrollNavigation(sectionCount);
  const perfMonitor = useMemo(() => new PerfMonitor(), []);

  // Preload critical resources
  usePreload([
    '/fonts/inter.woff2',
    '/fonts/jetbrains-mono.woff2',
    '/images/hero-bg.webp'
  ], { delay: 1000 });

  useEffect(() => {
    // Preload critical resources
    preloadResource('/profilepic.jpeg', 'image');
    preloadResource('/aboutpic.jpeg', 'image');
    
    // Add resource hints for better performance
    const link1 = document.createElement('link');
    link1.rel = 'dns-prefetch';
    link1.href = '//fonts.googleapis.com';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);

    // Start performance monitoring
    perfMonitor.markStart('app-initialization');
    
    // Start advanced analytics
    analytics.startTracking();
    analytics.trackPageView('home');

    return () => {
      perfMonitor.markEnd('app-initialization');
      perfMonitor.cleanup();
      analytics.stopTracking();
    };
  }, [perfMonitor]);

  const handleScrollDirection = (direction: 'up' | 'down') => {
    const newIndex = direction === 'down' 
      ? Math.min(currentSection + 1, sectionCount - 1)
      : Math.max(currentSection - 1, 0);
    scrollToSection(newIndex);
  };
  
  return (
    <div style={{ position: 'relative' }}>
      <ThemeToggle />
      <ScrollProgress scrollProgress={scrollProgress} />
      <PerformanceMonitor />
        <AIAssistant portfolioData={{
          name: 'Portfolio Owner',
          skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'MongoDB'],
          projects: [
            { title: 'E-commerce Platform', description: 'Full-stack e-commerce solution with React and Node.js', technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'] },
            { title: 'Task Management App', description: 'Collaborative task management with real-time updates', technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'] },
            { title: 'Data Visualization Dashboard', description: 'Interactive analytics dashboard with D3.js', technologies: ['React', 'D3.js', 'Python', 'FastAPI'] }
          ],
          experience: [
            { company: 'Tech Solutions Inc.', role: 'Senior Full Stack Developer', duration: '2022-Present' },
            { company: 'Digital Innovations', role: 'Frontend Developer', duration: '2020-2022' }
          ]
        }} />

      <motion.div
        ref={sectionRefs[0]}
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Introduction />
      </motion.div>

      <motion.div
        ref={sectionRefs[1]}
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <About />
      </motion.div>

      <motion.div
        ref={sectionRefs[2]}
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Projects />
      </motion.div>

      <motion.div
        ref={sectionRefs[3]}
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Skills />
      </motion.div>

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

      <motion.div
        ref={sectionRefs[6]}
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Contact />
      </motion.div>



      <DotNavigation 
        sectionCount={sectionCount}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
      />

      <ScrollArrows 
        hideUpArrow={hideUpArrow}
        hideDownArrow={hideDownArrow}
        scrollToSection={handleScrollDirection}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
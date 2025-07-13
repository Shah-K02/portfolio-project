import React, { useEffect } from 'react';
import {motion} from 'framer-motion';
import Introduction from './components/Introduction';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import WorkWithMe from './components/WorkWithMe';
import { useScrollNavigation } from './hooks/useScrollNavigation';
import { ScrollArrows } from './components/Navigation/ScrollArrows';
import { DotNavigation } from './components/Navigation/DotNavigation';
import { ScrollProgress } from './components/Navigation/ScrollProgress';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ThemeToggle } from './components/Navigation/ThemeToggle';
import './App.css';

function AppContent() {
  const sectionCount = 6;
  const { theme } = useTheme();
  const {
    sectionRefs,
    currentSection,
    hideUpArrow,
    hideDownArrow,
    scrollToSection,
    scrollProgress,
  } = useScrollNavigation(sectionCount);  

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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

      <motion.div
        ref={sectionRefs[4]}
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Contact />
      </motion.div>

      <motion.div
        ref={sectionRefs[5]}
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <WorkWithMe />
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
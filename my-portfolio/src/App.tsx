import React from 'react';
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
import './App.css';

function App() {
  const sectionCount = 6; // Adjust based on the number of sections
  const {
    sectionRefs,
    currentSection,
    hideUpArrow,
    hideDownArrow,
    scrollToSection,
    scrollProgress,
  } = useScrollNavigation(sectionCount);  

   // Convert direction to index
   const handleScrollDirection = (direction: 'up' | 'down') => {
    const newIndex = direction === 'down' 
      ? Math.min(currentSection + 1, sectionCount - 1)
      : Math.max(currentSection - 1, 0);
    scrollToSection(newIndex);
  };
  
  return (
    <div>
      {/* Scroll Progress Bar */}
      <ScrollProgress scrollProgress={scrollProgress} />

      {/* Sections with refs */}
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
      {/* Uncomment and add more sections as needed */}
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

       {/* Navigation Elements */}
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
export default App;
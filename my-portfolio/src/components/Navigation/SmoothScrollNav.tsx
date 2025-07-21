import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Circle, Navigation } from 'react-feather';

interface SmoothScrollNavProps {
  sections: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  currentSection: number;
  onSectionChange: (index: number) => void;
  isScrolling?: boolean;
  showLabels?: boolean;
  position?: 'left' | 'right';
  theme?: 'light' | 'dark' | 'auto';
}

const SmoothScrollNav: React.FC<SmoothScrollNavProps> = ({
  sections,
  currentSection,
  onSectionChange,
  isScrolling = false,
  showLabels = true,
  position = 'right',
  theme = 'auto'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  // Track scroll velocity for dynamic animations
  useEffect(() => {
    let rafId: number;
    let lastY = window.scrollY;
    let lastTime = Date.now();

    const updateVelocity = () => {
      const currentY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = Math.abs(currentY - lastY);
      const deltaTime = currentTime - lastTime;

      if (deltaTime > 0) {
        const newVelocity = deltaY / deltaTime;
        setVelocity(newVelocity);
        setLastScrollTime(currentTime);
      }

      lastY = currentY;
      lastTime = currentTime;
      rafId = requestAnimationFrame(updateVelocity);
    };

    rafId = requestAnimationFrame(updateVelocity);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleSectionClick = (index: number) => {
    if (isScrolling) return;
    onSectionChange(index);
  };

  const handleKeyNavigation = (e: KeyboardEvent) => {
    if (isScrolling) return;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (currentSection > 0) {
          onSectionChange(currentSection - 1);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (currentSection < sections.length - 1) {
          onSectionChange(currentSection + 1);
        }
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [currentSection, isScrolling]);

  const navVariants = {
    hidden: { opacity: 0, x: position === 'right' ? 50 : -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as any
      }
    }
  };

  const dotVariants = {
    inactive: {
      scale: 1,
      opacity: 0.4,
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    active: {
      scale: 1.2,
      opacity: 1,
      backgroundColor: '#64ffda'
    },
    hover: {
      scale: 1.4,
      opacity: 0.8
    }
  };

  const labelVariants = {
    hidden: { opacity: 0, x: position === 'right' ? 20 : -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' as any }
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className={`smooth-scroll-nav ${position} ${theme}`}
        variants={navVariants}
        initial="hidden"
        animate="visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          [position]: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.5rem 1rem',
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Velocity indicator */}
        <motion.div
          className="velocity-indicator"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #64ffda, #7877c6)',
            borderRadius: '1px',
            transformOrigin: 'left',
          }}
          animate={{
            scaleX: Math.min(velocity * 2, 1),
            opacity: velocity > 0.1 ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="nav-item"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
            }}
            onClick={() => handleSectionClick(index)}
            whileHover="hover"
          >
            {/* Navigation Dot */}
            <motion.div
              className="nav-dot"
              variants={dotVariants}
              animate={currentSection === index ? 'active' : 'inactive'}
              whileHover="hover"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Active indicator */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(45deg, #64ffda, #7877c6)',
                  borderRadius: '50%',
                }}
                animate={{
                  scale: currentSection === index ? 1 : 0,
                  opacity: currentSection === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' as any }}
              />
              
              {/* Ripple effect */}
              {currentSection === index && (
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: '-50%',
                    background: 'rgba(100, 255, 218, 0.3)',
                    borderRadius: '50%',
                  }}
                  animate={{
                    scale: [0, 2],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut' as any,
                  }}
                />
              )}
            </motion.div>

            {/* Section Label */}
            <AnimatePresence>
              {showLabels && (isHovered || currentSection === index) && (
                <motion.div
                  className="nav-label"
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{
                    position: 'absolute',
                    [position === 'right' ? 'right' : 'left']: '100%',
                    [position === 'right' ? 'marginRight' : 'marginLeft']: '1rem',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {section.label}
                  
                  {/* Arrow pointer */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      [position === 'right' ? 'left' : 'right']: '-6px',
                      transform: 'translateY(-50%)',
                      width: 0,
                      height: 0,
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      [position === 'right' ? 'borderLeft' : 'borderRight']: '6px solid rgba(0, 0, 0, 0.8)',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Progress indicator */}
        <motion.div
          className="progress-line"
          style={{
            position: 'absolute',
            [position === 'right' ? 'left' : 'right']: '-2px',
            top: '1.5rem',
            bottom: '1.5rem',
            width: '2px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1px',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(180deg, #64ffda, #7877c6)',
              borderRadius: '1px',
              transformOrigin: 'top',
            }}
            animate={{
              scaleY: (currentSection + 1) / sections.length,
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>
      </motion.nav>

      {/* Scroll Arrows */}
      <motion.div
        className="scroll-arrows"
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          zIndex: 1000,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {/* Up Arrow */}
        <motion.button
          className="scroll-arrow up"
          onClick={() => handleSectionClick(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0 || isScrolling}
          style={{
            background: 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
          }}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(100, 255, 218, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          animate={{
            opacity: currentSection === 0 ? 0.3 : 1,
          }}
        >
          <ChevronUp size={20} />
        </motion.button>

        {/* Down Arrow */}
        <motion.button
          className="scroll-arrow down"
          onClick={() => handleSectionClick(Math.min(sections.length - 1, currentSection + 1))}
          disabled={currentSection === sections.length - 1 || isScrolling}
          style={{
            background: 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
          }}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(100, 255, 218, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          animate={{
            opacity: currentSection === sections.length - 1 ? 0.3 : 1,
          }}
        >
          <ChevronDown size={20} />
        </motion.button>
      </motion.div>
    </>
  );
};

export default SmoothScrollNav;
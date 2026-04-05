import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useTransform, useMotionValue } from 'framer-motion';
import './LiquidMorphNavigation.css';

interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  section: string;
}

interface LiquidMorphNavigationProps {
  items: NavigationItem[];
  currentSection: number;
  onSectionChange: (index: number) => void;
  className?: string;
}

const LiquidMorphNavigation: React.FC<LiquidMorphNavigationProps> = ({
  items,
  currentSection,
  onSectionChange,
  className = ''
}) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Create liquid blob morphing animations
  const blobControls = useAnimation();
  const expandControls = useAnimation();
  
  // Mouse tracking for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Magnetic attraction effect
  const magneticX = useTransform(mouseX, [-300, 0, 300], [-8, 0, 8]);
  const magneticY = useTransform(mouseY, [-300, 0, 300], [-8, 0, 8]);

  // Liquid blob morphing based on active section
  useEffect(() => {
    const morphShapes = [
      "polygon(30% 40%, 70% 30%, 80% 70%, 20% 80%)",
      "polygon(20% 20%, 80% 30%, 90% 80%, 10% 70%)",
      "polygon(25% 30%, 75% 20%, 85% 75%, 15% 85%)",
      "polygon(35% 25%, 75% 35%, 80% 75%, 25% 80%)",
      "polygon(30% 35%, 70% 25%, 85% 70%, 20% 85%)"
    ];

    blobControls.start({
      clipPath: morphShapes[currentSection % morphShapes.length],
      transition: {
        duration: 2,
        ease: [0.4, 0.0, 0.2, 1],
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 1
      }
    });
  }, [currentSection, blobControls]);

  // Handle hover expansion
  const handleHover = (index: number | null) => {
    setHoveredItem(index);
    if (index !== null) {
      setIsExpanded(true);
      expandControls.start({
        scale: 1.2,
        rotate: index * 5,
        transition: { duration: 0.3, ease: "backOut" }
      });
    } else {
      expandControls.start({
        scale: 1,
        rotate: 0,
        transition: { duration: 0.5, ease: "backOut" }
      });
      setTimeout(() => setIsExpanded(false), 300);
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className={`liquid-nav-container ${className}`}
      style={{ x: magneticX, y: magneticY }}
      animate={expandControls}
      onHoverStart={() => handleHover(currentSection)}
      onHoverEnd={() => handleHover(null)}
    >
      {/* Liquid background blob - removed rainbow artifact */}
      


      {/* Navigation dots that morph */}
      <div className="nav-dots-container">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            className={`nav-dot ${index === currentSection ? 'active' : ''}`}
            onClick={() => onSectionChange(index)}
            onHoverStart={() => setHoveredItem(index)}
            onHoverEnd={() => setHoveredItem(null)}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: index === currentSection ? 1.3 : 1,
              opacity: index === currentSection ? 1 : 0.6,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="dot-core"
              animate={{
                background: index === currentSection 
                  ? `conic-gradient(from ${index * 72}deg, #ff6b6b, #4ecdc4, #45b7d1)`
                  : 'rgba(255, 255, 255, 0.3)'
              }}
            />
            
            {/* Liquid connection lines */}
            {index < items.length - 1 && (
              <motion.div
                className="liquid-connection"
                animate={{
                  scaleX: Math.abs(currentSection - index) <= 1 ? 1 : 0.3,
                  opacity: Math.abs(currentSection - index) <= 1 ? 1 : 0.2,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            )}
            
            {/* Expanded label */}
            <motion.span
              className="nav-label"
              animate={{
                opacity: isExpanded && hoveredItem === index ? 1 : 0,
                x: isExpanded && hoveredItem === index ? 0 : -10,
                scale: isExpanded && hoveredItem === index ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
            </motion.span>

            {/* Particle trail effect */}
            {index === currentSection && (
              <div className="particle-trail">
                {Array.from({ length: 8 }).map((_, pIndex) => (
                  <motion.div
                    key={pIndex}
                    className="trail-particle"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      x: [0, Math.sin((pIndex / 8) * Math.PI * 2) * 30],
                      y: [0, Math.cos((pIndex / 8) * Math.PI * 2) * 30],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: pIndex * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            )}
          </motion.button>
        ))}
      </div>


    </motion.div>
  );
};

export default LiquidMorphNavigation;

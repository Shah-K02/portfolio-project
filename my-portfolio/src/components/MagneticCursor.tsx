import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticCursorProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

const MagneticCursor: React.FC<MagneticCursorProps> = ({ 
  children, 
  className = '', 
  strength = 0.3 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      if (isHovered) {
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        
        x.set(deltaX);
        y.set(deltaY);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };
    
    const element = ref.current;
    if (element) {
      element.addEventListener('mouseenter', () => setIsHovered(true));
      element.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (element) {
        element.removeEventListener('mouseenter', () => setIsHovered(true));
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, strength, x, y]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticCursor;
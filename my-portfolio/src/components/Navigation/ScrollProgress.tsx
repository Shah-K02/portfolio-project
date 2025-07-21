import React from 'react';
import { motion } from 'framer-motion';

interface ScrollProgressProps {
  scrollProgress: number;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ scrollProgress }) => {
  return (
    <motion.div
      className="scroll-progress-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'rgba(255, 255, 255, 0.1)',
        zIndex: 9999,
        backdropFilter: 'blur(10px)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="scroll-progress-bar"
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #64ffda, #7877c6, #ff6b6b)',
          borderRadius: '0 2px 2px 0',
          transformOrigin: 'left',
          boxShadow: '0 0 10px rgba(100, 255, 218, 0.5)',
        }}
        animate={{
          width: `${Math.max(0, Math.min(100, scrollProgress))}%`,
        }}
        transition={{
          duration: 0.1,
          ease: 'easeOut',
        }}
      />
      
      {/* Progress indicator dot */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '8px',
          height: '8px',
          background: '#64ffda',
          borderRadius: '50%',
          boxShadow: '0 0 8px rgba(100, 255, 218, 0.8)',
        }}
        animate={{
          left: `${Math.max(0, Math.min(100, scrollProgress))}%`,
        }}
        transition={{
          duration: 0.1,
          ease: 'easeOut',
        }}
      />
    </motion.div>
  );
};
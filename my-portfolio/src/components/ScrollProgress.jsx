import React, { useEffect } from 'react';
import { createScrollProgress } from '../utils/animationUtils';

const ScrollProgress = () => {
  useEffect(() => {
    // Initialize and cleanup scroll progress
    const cleanup = createScrollProgress();
    return cleanup;
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200">
      <div className="progress-bar h-full bg-primary transform-origin-left scale-x-0 transition-transform duration-300 ease-out" />
    </div>
  );
};

export default ScrollProgress;
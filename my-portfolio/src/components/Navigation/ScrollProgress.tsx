import React, { memo } from 'react';
import './ScrollProgress.css';

interface ScrollProgressProps {
  scrollProgress: number;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = memo(({ scrollProgress }) => {
  // scrollProgress is already a percentage (0-100), no need to multiply
  const progress = Math.min(Math.max(scrollProgress, 0), 100);

  return (
    <div 
      className="scroll-progress-container" 
      role="progressbar" 
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div 
        className="progress-bar" 
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
});
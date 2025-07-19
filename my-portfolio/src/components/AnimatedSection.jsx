import React, { useEffect, useRef } from 'react';
import { createScrollObserver } from '../utils/animationUtils';

const AnimatedSection = ({
  children,
  animation = 'fade-up',
  threshold = 0.2,
  stagger = false,
  className = '',
  ...props
}) => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = createScrollObserver({ threshold });
    const currentSection = sectionRef.current;

    if (currentSection) {
      // Add initial classes
      currentSection.classList.add('section-animated', 'section-hidden', animation);
      if (stagger) currentSection.classList.add('stagger-children');

      // Start observing
      observer.observe(currentSection);

      // Cleanup
      return () => {
        if (currentSection) observer.unobserve(currentSection);
      };
    }
  }, [animation, threshold, stagger]);

  return (
    <div
      ref={sectionRef}
      className={`scroll-trigger ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const AnimatedItem = ({ children, className = '', ...props }) => {
  return (
    <div className={`stagger-item ${className}`} {...props}>
      {children}
    </div>
  );
};

export default AnimatedSection;
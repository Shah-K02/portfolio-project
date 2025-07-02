import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = (threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const elementTop = element.offsetTop;
      const elementBottom = elementTop + element.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;
      
      // Buffer zone: section becomes visible when it's `threshold` percent into viewport
      const buffer = windowHeight * threshold;
      const isInViewport = scrollTop < elementBottom + buffer && 
                          scrollTop + windowHeight > elementTop - buffer;

      setIsVisible(isInViewport);
    };

    // Check initial state
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { isVisible, elementRef };
};
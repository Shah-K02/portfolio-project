import { useRef, useLayoutEffect } from 'react';
import { animate, MotionValue, easeInOut } from 'framer-motion';
import { FLIPAnimationOptions, resetTransform, createSpringTransition } from '../types/animation';

interface FLIPElement {
  element: HTMLElement;
  initialRect: DOMRect;
}

export const useFLIPAnimation = (options: FLIPAnimationOptions = {}) => {
  const elementsRef = useRef<Map<string, FLIPElement>>(new Map());
  const { duration = 0.4, onComplete } = options;

  const recordPosition = (key: string, element: HTMLElement | null) => {
    if (!element) return;
    
    elementsRef.current.set(key, {
      element,
      initialRect: element.getBoundingClientRect()
    });
  };

  const playAnimation = () => {
    const elements = Array.from(elementsRef.current.values());
    
    elements.forEach(({ element, initialRect }) => {
      const finalRect = element.getBoundingClientRect();

      // Calculate the difference
      const deltaX = initialRect.left - finalRect.left;
      const deltaY = initialRect.top - finalRect.top;
      const deltaScale = initialRect.width / finalRect.width;

      // Apply the inverse transform
      element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaScale})`;
      element.style.transition = 'none';

      // Force reflow
      void element.offsetHeight;

      // Animate to final position using Framer Motion properties
      animate(element.style, {
        transform: [
          `translate(${deltaX}px, ${deltaY}px) scale(${deltaScale})`,
          'translate(0px, 0px) scale(1)'
        ]
      }, {
        type: 'spring',
        stiffness: 150,
        damping: 15,
        duration,
        ease: easeInOut,
        onComplete: () => {
          element.style.transform = '';
          element.style.transition = '';
          if (onComplete) onComplete();
        }
      });
    });

    // Clear the recorded positions
    elementsRef.current.clear();
  };

  useLayoutEffect(() => {
    return () => {
      elementsRef.current.clear();
    };
  }, []);

  return {
    recordPosition,
    playAnimation
  };
};
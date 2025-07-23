import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface ScrollAnimationConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
  parallaxIntensity?: number;
  scaleRange?: [number, number];
  rotationRange?: [number, number];
  enableVelocityTracking?: boolean;
  snapToSection?: boolean;
}

interface ScrollAnimationResult {
  ref: RefObject<HTMLElement>;
  isInView: boolean;
  scrollProgress: MotionValue<number>;
  parallaxY: MotionValue<string>;
  scale: MotionValue<number>;
  rotation: MotionValue<number>;
  opacity: MotionValue<number>;
  velocity: number;
  direction: 'up' | 'down' | 'idle';
  hasTriggered: boolean;
}

export const useAdvancedScrollAnimation = ({
  threshold = 0.05,
  rootMargin = '-30% 0px -30% 0px',
  triggerOnce = false,
  staggerChildren = false,
  staggerDelay = 0.1,
  parallaxIntensity = 50,
  scaleRange = [0.8, 1],
  rotationRange = [-2, 2],
  enableVelocityTracking = true,
  snapToSection = false
}: ScrollAnimationConfig = {}): ScrollAnimationResult => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | 'idle'>('idle');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'] as any
  });

  // Smooth spring animations
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Advanced transform values
  const parallaxY = useTransform(
    smoothScrollProgress,
    [0, 1],
    [`-${parallaxIntensity}px`, `${parallaxIntensity}px`]
  );

  const scale = useTransform(
    smoothScrollProgress,
    [0, 0.5, 1],
    [scaleRange[0], 1, scaleRange[1]]
  );

  const rotation = useTransform(
    smoothScrollProgress,
    [0, 0.5, 1],
    [rotationRange[0], 0, rotationRange[1]]
  );

  const opacity = useTransform(
    smoothScrollProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  // Intersection Observer for precise in-view detection
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && !hasTriggered) {
          setHasTriggered(true);
        }
        
        if (!triggerOnce && !inView) {
          setHasTriggered(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  // Velocity and direction tracking
  useEffect(() => {
    if (!enableVelocityTracking) return;

    let rafId: number;
    let lastTime = Date.now();

    const updateVelocity = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const deltaTime = currentTime - lastTime;
      const deltaY = currentScrollY - lastScrollY;

      if (deltaTime > 0) {
        const newVelocity = Math.abs(deltaY / deltaTime);
        setVelocity(newVelocity);
        
        if (Math.abs(deltaY) > 1) {
          setDirection(deltaY > 0 ? 'down' : 'up');
        } else {
          setDirection('idle');
        }
      }

      setLastScrollY(currentScrollY);
      lastTime = currentTime;
      rafId = requestAnimationFrame(updateVelocity);
    };

    rafId = requestAnimationFrame(updateVelocity);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [enableVelocityTracking, lastScrollY]);

  // Snap to section functionality
  useEffect(() => {
    if (!snapToSection || !isInView) return;

    let timeoutId: NodeJS.Timeout;
    
    const handleScrollEnd = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (velocity < 0.1 && isInView && ref.current) {
          const element = ref.current;
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // If element is partially visible, snap to it
          if (rect.top < viewportHeight * 0.5 && rect.bottom > viewportHeight * 0.5) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScrollEnd, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollEnd);
      clearTimeout(timeoutId);
    };
  }, [snapToSection, isInView, velocity]);

  return {
    ref: ref as React.RefObject<HTMLElement>,
    isInView: triggerOnce ? hasTriggered : isInView,
    scrollProgress: smoothScrollProgress,
    parallaxY,
    scale,
    rotation,
    opacity,
    velocity,
    direction,
    hasTriggered
  };
};

// Hook for section-based smooth scrolling with snap behavior
export const useSmoothSectionScroll = (sectionCount: number) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRefs = useRef<Array<RefObject<HTMLElement | null>>>([]);

  // Initialize refs - only create new refs if count changes
  useEffect(() => {
    if (sectionRefs.current.length !== sectionCount) {
      sectionRefs.current = Array(sectionCount)
        .fill(null)
        .map((_, index) => {
          // Preserve existing refs if they exist
          return sectionRefs.current[index] || React.createRef<HTMLElement | null>();
        });
    }
  }, [sectionCount]);

  // Initialize refs immediately if empty
  if (sectionRefs.current.length === 0) {
    sectionRefs.current = Array(sectionCount)
      .fill(null)
      .map(() => React.createRef<HTMLElement | null>());
  }

  const scrollToSection = useCallback((index: number, behavior: 'smooth' | 'instant' = 'smooth') => {
    // Define section IDs that match the ones in App.tsx
    const sectionIds = ['introduction', 'about', 'projects', 'skills', 'contact'];
    const targetId = sectionIds[index];
    
    if (!targetId) {
      return;
    }

    // Try to find element by ID first
    let targetElement = document.getElementById(targetId);
    
    // If not found by ID, try using the ref
    if (!targetElement) {
      const targetRef = sectionRefs.current[index];
      targetElement = targetRef?.current;
    }
    
    if (!targetElement) {
      return;
    }

    setIsScrolling(true);
    setCurrentSection(index);
    
    // Use modern scroll API with better control
    targetElement.scrollIntoView({
      behavior: behavior as ScrollBehavior,
      block: 'start',
      inline: 'nearest'
    });

    // Reset scrolling state after animation
    setTimeout(() => setIsScrolling(false), behavior === 'smooth' ? 1000 : 100);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentSection < sectionCount - 1) {
            scrollToSection(currentSection + 1);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(sectionCount - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, sectionCount, isScrolling, scrollToSection]);

  // Track current section based on scroll position
  useEffect(() => {
    if (isScrolling) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sectionRefs.current.forEach((ref, index) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index);
          }
        }
      });
    };

    const throttledScroll = throttle(handleScroll, 16); // ~60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isScrolling]);



  return {
    sectionRefs: sectionRefs.current,
    currentSection,
    isScrolling,
    scrollToSection
  };
};

// Utility function for throttling
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
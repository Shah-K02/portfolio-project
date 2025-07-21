import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface ScrollTriggeredAnimationProps {
  children: ReactNode;
  className?: string;
  animationType?: 'parallax' | 'reveal' | 'counter' | 'morphing' | 'magnetic' | 'depth';
  intensity?: number;
  delay?: number;
  duration?: number;
  triggerOffset?: [string, string];
  once?: boolean;
}

const ScrollTriggeredAnimation: React.FC<ScrollTriggeredAnimationProps> = ({
  children,
  className = '',
  animationType = 'reveal',
  intensity = 1,
  delay = 0,
  duration = 0.8,
  triggerOffset = ['start end', 'end start'],
  once = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: triggerOffset as any
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Intersection Observer for precise triggering
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
      },
      {
        threshold: 0.1,
        rootMargin: '-10% 0px'
      }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [hasTriggered]);

  // Move all useTransform hooks outside the function to comply with React Hook rules
  const parallaxY = useTransform(smoothProgress, [0, 1], [0, -100 * intensity]);
  const counterScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.1, 1]);
  const counterRotate = useTransform(smoothProgress, [0, 1], [0, 360 * intensity]);
  const morphingBorderRadius = useTransform(smoothProgress, [0, 0.5, 1], ['0%', '50%', '0%']);
  const morphingSkewY = useTransform(smoothProgress, [0, 0.5, 1], [0, 5 * intensity, 0]);
  const depthZ = useTransform(smoothProgress, [0, 1], [0, 100 * intensity]);
  const depthRotateX = useTransform(smoothProgress, [0, 0.5, 1], [15, 0, -15]);

  // Move magnetic animation hooks to component level
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (animationType !== 'magnetic') return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.1 * intensity;
      const deltaY = (e.clientY - centerY) * 0.1 * intensity;
      
      setMousePosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
    };

    if (ref.current) {
      ref.current.addEventListener('mousemove', handleMouseMove);
      ref.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousemove', handleMouseMove);
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [animationType, intensity]);

  const getAnimationProps = () => {
    const shouldAnimate = once ? hasTriggered : isInView;
    
    switch (animationType) {
      case 'parallax':
        return {
          style: { y: parallaxY },
          initial: { opacity: 0 },
          animate: { opacity: shouldAnimate ? 1 : 0 },
          transition: { duration, delay }
        };

      case 'reveal':
        return {
          initial: { 
            opacity: 0, 
            y: 50 * intensity,
            scale: 0.95
          },
          animate: { 
            opacity: shouldAnimate ? 1 : 0, 
            y: shouldAnimate ? 0 : 50 * intensity,
            scale: shouldAnimate ? 1 : 0.95
          },
          transition: { 
            duration, 
            delay,
            ease: [0.25, 0.1, 0.25, 1] as any
          }
        };

      case 'counter':
        return {
          style: { scale: counterScale, rotate: counterRotate },
          initial: { opacity: 0 },
          animate: { opacity: shouldAnimate ? 1 : 0 },
          transition: { duration, delay }
        };

      case 'morphing':
        return {
          style: { borderRadius: morphingBorderRadius, skewY: morphingSkewY },
          initial: { opacity: 0, scale: 0.8 },
          animate: { 
            opacity: shouldAnimate ? 1 : 0,
            scale: shouldAnimate ? 1 : 0.8
          },
          transition: { duration, delay }
        };

      case 'magnetic':
        return {
          style: {
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          },
          initial: { opacity: 0 },
          animate: { opacity: shouldAnimate ? 1 : 0 },
          transition: { duration, delay }
        };

      case 'depth':
        return {
          style: { 
            z: depthZ,
            rotateX: depthRotateX,
            transformStyle: 'preserve-3d' as const
          },
          initial: { opacity: 0 },
          animate: { opacity: shouldAnimate ? 1 : 0 },
          transition: { duration, delay }
        };

      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: shouldAnimate ? 1 : 0 },
          transition: { duration, delay }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`scroll-triggered-animation ${animationType} ${className}`}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
};

export default ScrollTriggeredAnimation;

// Specialized components for common use cases
export const ParallaxText: React.FC<{
  children: ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.5, className = '' }) => (
  <ScrollTriggeredAnimation
    animationType="parallax"
    intensity={speed}
    className={`parallax-text ${className}`}
  >
    {children}
  </ScrollTriggeredAnimation>
);

export const RevealOnScroll: React.FC<{
  children: ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => (
  <ScrollTriggeredAnimation
    animationType="reveal"
    delay={delay}
    className={`reveal-on-scroll ${className}`}
  >
    {children}
  </ScrollTriggeredAnimation>
);

export const MagneticElement: React.FC<{
  children: ReactNode;
  intensity?: number;
  className?: string;
}> = ({ children, intensity = 1, className = '' }) => (
  <ScrollTriggeredAnimation
    animationType="magnetic"
    intensity={intensity}
    className={`magnetic-element ${className}`}
  >
    {children}
  </ScrollTriggeredAnimation>
);

export const DepthElement: React.FC<{
  children: ReactNode;
  depth?: number;
  className?: string;
}> = ({ children, depth = 1, className = '' }) => (
  <ScrollTriggeredAnimation
    animationType="depth"
    intensity={depth}
    className={`depth-element ${className}`}
  >
    {children}
  </ScrollTriggeredAnimation>
);
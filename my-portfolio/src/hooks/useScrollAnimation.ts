import { useRef } from 'react';
import { useInView, useTransform, useScroll, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface ScrollAnimationConfig {
  amount?: number;
  once?: boolean;
  parallaxIntensity?: number;
  margin?: string;
};

interface ScrollAnimationResult {
  ref: RefObject<HTMLElement>;
  inView: boolean;
  parallaxY: MotionValue<string>;
};

export const useScrollAnimation = ({
  amount = 0.3,
  once = true,
  parallaxIntensity = 50,
  margin = '-10% 0px'
}: ScrollAnimationConfig = {}): ScrollAnimationResult => {
  const ref = useRef<HTMLElement>(null);
  
  const inViewOptions = {
    amount,
    once,
    margin: margin as any
  };
  
  const inView = useInView(ref, inViewOptions);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${parallaxIntensity}px`, `${parallaxIntensity}px`]
  );
  
  const typedRef = ref as RefObject<HTMLElement>;
  
  return {
    ref: typedRef,
    inView,
    parallaxY
  };
};
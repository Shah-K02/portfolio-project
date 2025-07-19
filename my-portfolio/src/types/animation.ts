import { Target, TargetAndTransition } from 'framer-motion';

// Extend Window interface
declare global {
  interface Window {
    mouseX: number;
    mouseY: number;
  }
}

// Animation variants type
export interface AnimationVariants {
  hidden: TargetAndTransition;
  visible: TargetAndTransition | ((custom: any) => TargetAndTransition);
}

// FLIP animation types
export interface FLIPPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface FLIPAnimationOptions {
  duration?: number;
  ease?: string;
  onComplete?: () => void;
}

// Spring configuration type
export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

// Transform utilities
export const resetTransform = {
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0
};

export const createSpringTransition = (config: Partial<SpringConfig> = {}) => ({
  type: 'spring',
  stiffness: config.stiffness ?? 150,
  damping: config.damping ?? 15,
  mass: config.mass ?? 0.1
});
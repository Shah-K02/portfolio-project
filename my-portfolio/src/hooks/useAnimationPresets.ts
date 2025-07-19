import { Variants, Easing, easeOut } from 'framer-motion';

type AnimationPreset = 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleUp' | 'scaleDown' | 'rotateIn' | 'bounce';

interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: Easing | Easing[];
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function useAnimationPresets(preset: AnimationPreset, config: AnimationConfig = {}): Variants {
  const {
    duration = 0.5,
    delay = 0,
    ease = easeOut,
    stiffness = 100,
    damping = 10,
    mass = 1
  } = config;

  const presets: Record<AnimationPreset, Variants> = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration, delay, ease }
      }
    },
    slideUp: {
      hidden: { y: 50, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          y: { type: 'spring', stiffness, damping, mass },
          opacity: { duration, ease }
        }
      }
    },
    slideDown: {
      hidden: { y: -50, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          y: { type: 'spring', stiffness, damping, mass },
          opacity: { duration, ease }
        }
      }
    },
    scaleUp: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          scale: { type: 'spring', stiffness, damping, mass },
          opacity: { duration, ease }
        }
      }
    },
    scaleDown: {
      hidden: { scale: 1.2, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          scale: { type: 'spring', stiffness, damping, mass },
          opacity: { duration, ease }
        }
      }
    },
    rotateIn: {
      hidden: { rotate: -180, opacity: 0, scale: 0.8 },
      visible: {
        rotate: 0,
        opacity: 1,
        scale: 1,
        transition: {
          rotate: { type: 'spring', stiffness, damping, mass },
          opacity: { duration, ease },
          scale: { type: 'spring', stiffness, damping, mass }
        }
      }
    },
    bounce: {
      hidden: { y: -20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          y: {
            type: 'spring',
            stiffness: 300,
            damping: 10,
            mass: 0.5
          },
          opacity: { duration: 0.3, ease }
        }
      }
    }
  };

  return presets[preset];
}

// Helper function to create staggered animations for lists
export function createStaggeredAnimation(
  childVariants: Variants,
  staggerConfig: { staggerChildren?: number; delayChildren?: number } = {}
): Variants {
  const { staggerChildren = 0.1, delayChildren = 0 } = staggerConfig;
  
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
        when: 'beforeChildren'
      }
    },
    ...childVariants
  };
}
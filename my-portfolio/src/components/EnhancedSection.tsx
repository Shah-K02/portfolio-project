import React, { ReactNode, forwardRef } from "react";
import { motion, Variants } from "framer-motion";
import { useAdvancedScrollAnimation } from "../hooks/useAdvancedScrollAnimation";

interface EnhancedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?:
    | "fade"
    | "slide"
    | "scale"
    | "rotate"
    | "parallax"
    | "magnetic";
  direction?: "up" | "down" | "left" | "right";
  staggerChildren?: boolean;
  staggerDelay?: number;
  parallaxIntensity?: number;
  enableSnap?: boolean;
  background?: "transparent" | "gradient" | "blur";
  id?: string;
  currentSection?: number;
  sectionIndex?: number;
}

const EnhancedSection = forwardRef<HTMLElement, EnhancedSectionProps>(
  (
    {
      children,
      className = "",
      animationType = "fade",
      direction = "up",
      staggerChildren = false,
      staggerDelay = 0.1,
      parallaxIntensity = 30,
      enableSnap = false,
      background = "transparent",
      id,
      currentSection,
      sectionIndex,
    },
    forwardedRef
  ) => {
    const {
      ref,
      isInView,
      scrollProgress,
      parallaxY,
      scale,
      rotation,
      opacity,
      velocity,
      direction: scrollDirection,
    } = useAdvancedScrollAnimation({
      threshold: 0.05,
      rootMargin: "-30% 0px -30% 0px",
      triggerOnce: false,
      parallaxIntensity,
      enableVelocityTracking: true,
      snapToSection: enableSnap,
    });

    // Animation variants based on type
    const getAnimationVariants = (): Variants => {
      const baseTransition = {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as any
    };

      switch (animationType) {
        case "slide":
          return {
            hidden: {
              opacity: 0,
              x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
              y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                ...baseTransition,
                staggerChildren: staggerChildren ? staggerDelay : 0,
              },
            },
          };

        case "scale":
          return {
            hidden: {
              opacity: 0,
              scale: 0.8,
              rotateX: direction === "up" ? 15 : direction === "down" ? -15 : 0,
            },
            visible: {
              opacity: 1,
              scale: 1,
              rotateX: 0,
              transition: {
                ...baseTransition,
                staggerChildren: staggerChildren ? staggerDelay : 0,
              },
            },
          };

        case "rotate":
          return {
            hidden: {
              opacity: 0,
              rotateY:
                direction === "left" ? -45 : direction === "right" ? 45 : 0,
              rotateX: direction === "up" ? 45 : direction === "down" ? -45 : 0,
            },
            visible: {
              opacity: 1,
              rotateY: 0,
              rotateX: 0,
              transition: {
                ...baseTransition,
                staggerChildren: staggerChildren ? staggerDelay : 0,
              },
            },
          };

        case "magnetic":
          return {
            hidden: {
              opacity: 0,
              scale: 0.9,
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                ...baseTransition,
                staggerChildren: staggerChildren ? staggerDelay : 0,
              },
            },
          };

        default: // fade
          return {
            hidden: {
              opacity: 0,
              y: 30,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                ...baseTransition,
                staggerChildren: staggerChildren ? staggerDelay : 0,
              },
            },
          };
      }
    };

    const childVariants: Variants = {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    };

    // Background styles based on type
    const getBackgroundStyle = () => {
      switch (background) {
        case "gradient":
          return {
            background:
              "linear-gradient(135deg, var(--color-accent-1-light) 0%, var(--color-accent-2-light) 100%)",
            backdropFilter: "blur(10px)",
          };
        case "blur":
          return {
            backdropFilter: "blur(20px)",
            background: "var(--color-surface-overlay)",
          };
        default:
          return {};
      }
    };

    // Dynamic styles based on scroll behavior
    const getDynamicStyles = () => {
      const baseStyles = {
        minHeight: "100vh",
        position: "relative" as const,
        overflow: "hidden" as const,
        ...getBackgroundStyle(),
      };

      if (animationType === "parallax") {
        return {
          ...baseStyles,
          transform: `translateY(${parallaxY})`,
        };
      }

      if (animationType === "magnetic" && velocity > 0.5) {
        const magneticOffset = scrollDirection === "down" ? -5 : 5;
        return {
          ...baseStyles,
          transform: `translateY(${magneticOffset}px) scale(${
            1 + velocity * 0.01
          })`,
          transition: "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
        };
      }

      return baseStyles;
    };

    return (
      <motion.section
        ref={(node) => {
          // Handle both refs
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
          if (node) {
            ref.current = node;
          }
        }}
        id={id}
        className={`enhanced-section ${className}`}
        style={getDynamicStyles()}
        variants={getAnimationVariants()}
        initial="hidden"
        animate={(currentSection !== undefined && sectionIndex !== undefined && currentSection === sectionIndex) ? "visible" : "hidden"}
        viewport={{ once: false, amount: 0.1 }}
      >
        {/* Scroll progress indicator */}
        <motion.div
          className="scroll-progress-line"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "2px",
            background: "var(--gradient-primary)",
            transformOrigin: "left",
            zIndex: 10,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Content wrapper with stagger animation */}
        <motion.div
          className="section-content"
          variants={staggerChildren ? childVariants : undefined}
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          {children}
        </motion.div>

        {/* Velocity-based particle effect */}
        {velocity > 1 && (
          <motion.div
            className="velocity-particles"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
              background: `radial-gradient(circle at 50% 50%, rgba(var(--color-accent-1-rgb), ${
                velocity * 0.02
              }) 0%, transparent 70%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* 3D depth effect for modern look */}
        <motion.div
          className="depth-layer"
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            right: "10%",
            bottom: "10%",
            background:
              "linear-gradient(135deg, var(--color-accent-1-light) 0%, var(--color-accent-2-light) 100%)",
            borderRadius: "20px",
            transform: "translateZ(-10px)",
            filter: "blur(1px)",
            pointerEvents: "none",
          }}
          animate={{
            scale: isInView ? 1 : 0.95,
            opacity: isInView ? 1 : 0,
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.section>
    );
  }
);

EnhancedSection.displayName = "EnhancedSection";

export default EnhancedSection;

// Child component for staggered animations
export const EnhancedSectionChild: React.FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => {
  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className={`enhanced-section-child ${className}`}
      variants={childVariants}
    >
      {children}
    </motion.div>
  );
};

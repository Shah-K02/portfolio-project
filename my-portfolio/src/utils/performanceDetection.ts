// Performance detection utility to adapt animations based on device capabilities

interface PerformanceMetrics {
  isLowEnd: boolean;
  deviceMemory: number;
  hardwareConcurrency: number;
  connectionType: string;
  reducedMotion: boolean;
}

export const detectPerformance = (): PerformanceMetrics => {
  // Check for reduced motion preference
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Get device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory || 4; // Default to 4GB
  
  // Get hardware concurrency (number of CPU cores)
  const hardwareConcurrency = navigator.hardwareConcurrency || 4; // Default to 4 cores
  
  // Get connection type (if available)
  const connection = (navigator as any).connection || { effectiveType: 'unknown' };
  const connectionType = connection.effectiveType || 'unknown';
  
  // Determine if device is low-end based on multiple factors
  const isLowEnd = (
    deviceMemory <= 2 || 
    hardwareConcurrency <= 2 || 
    connectionType === 'slow-2g' || 
    connectionType === '2g' ||
    reducedMotion
  );
  
  return {
    isLowEnd,
    deviceMemory,
    hardwareConcurrency,
    connectionType,
    reducedMotion
  };
};

// Performance-aware animation configurations
export const getAnimationConfig = (isLowEnd: boolean = false) => ({
  // Particle counts
  particles: {
    interactive: isLowEnd ? 3 : 10,
    background: isLowEnd ? 20 : 50,
  },
  
  // Animation durations (faster on low-end devices)
  durations: {
    fast: isLowEnd ? 0.2 : 0.4,
    medium: isLowEnd ? 0.3 : 0.6,
    slow: isLowEnd ? 0.5 : 0.8,
  },
  
  // Update frequencies
  fps: {
    scroll: isLowEnd ? 20 : 30, // ms between updates
    velocity: isLowEnd ? 50 : 33, // ms between velocity updates
  },
  
  // Feature toggles
  features: {
    particles: !isLowEnd,
    complexAnimations: !isLowEnd,
    parallex: !isLowEnd,
    magneticCursor: !isLowEnd,
    infiniteRotations: !isLowEnd,
  }
});

// React hook for performance detection
export const usePerformanceDetection = () => {
  const metrics = detectPerformance();
  const config = getAnimationConfig(metrics.isLowEnd);
  
  return {
    metrics,
    config,
    isLowEnd: metrics.isLowEnd,
  };
};

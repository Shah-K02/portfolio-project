// Performance optimization utilities for the portfolio

// Lazy loading utility for images
export const lazyLoadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = (e) => reject(e); // Add error parameter
    img.src = src;
  });
};

// Debounce utility for search and scroll events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>; // Fix NodeJS.Timeout type
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false; // Initialize boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Intersection Observer for lazy loading components
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Preload critical resources
export const preloadResource = (href: string, as: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Critical CSS inlining utility
export const inlineCriticalCSS = (css: string): void => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Resource hints for better loading
export const addResourceHints = (): void => {
  // DNS prefetch for external resources
  const dnsPrefetchDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'via.placeholder.com'
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });

  // Preconnect to critical third-party origins
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Memory management for large datasets
export class MemoryManager<T = any> { // Add generic type
  private cache = new Map<string, T>();
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  set(key: string, value: T): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  get(key: string): T | undefined {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Virtual scrolling for large lists
export const calculateVisibleItems = (
  scrollTop: number,
  containerHeight: number,
  itemHeight: number,
  totalItems: number,
  overscan: number = 5
): { startIndex: number; endIndex: number; visibleItems: number } => {
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleItems = Math.ceil(containerHeight / itemHeight);
  const endIndex = Math.min(totalItems - 1, startIndex + visibleItems + overscan * 2);

  return { startIndex, endIndex, visibleItems };
};

// Bundle splitting utility
export const loadChunk = async <T = any>(chunkName: string): Promise<T> => {
  try {
    switch (chunkName) {
      case 'projects':
        return (await import('../components/Projects')).default as T;
      case 'skills':
        return (await import('../components/Skills')).default as T;
      case 'contact':
        return (await import('../components/Contact')).default as T;
      default:
        throw new Error(`Unknown chunk: ${chunkName}`);
    }
  } catch (error) {
        throw error;
      }
};

// Performance monitoring
export class PerformanceMonitor {
  private metrics = new Map<string, number>();
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') { // Check if window exists
      this.initializeObservers();
    }
  }

  private initializeObservers(): void {
    if ('PerformanceObserver' in window) {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.metrics.set('domContentLoaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart);
            this.metrics.set('loadComplete', navEntry.loadEventEnd - navEntry.loadEventStart);
          }
        }
      });

      try {
        navObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navObserver);

        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.metrics.set(entry.name, entry.startTime);
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(paintObserver);

        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1];
            this.metrics.set('largestContentfulPaint', lastEntry.startTime);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (error) {
        // Performance observers initialization failed
      }
    }
  }

  markStart(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`);
    }
  }

  markEnd(name: string): void {
    if (typeof performance !== 'undefined') {
      try {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
        
        const measure = performance.getEntriesByName(name, 'measure')[0];
        if (measure) {
          this.metrics.set(name, measure.duration);
        }
      } catch (error) {
        // Performance measurement failed
      }
    }
  }

  getMetric(name: string): number | undefined {
    return this.metrics.get(name);
  }

  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  logMetrics(): void {
    // Metrics logging removed for production
    // Use browser dev tools for performance monitoring
  }

  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Web Vitals tracking
export const trackWebVitals = (): void => {
  if (typeof window === 'undefined') return;

  try {
    let clsValue = 0;
    const clsEntries: PerformanceEntry[] = [];

    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          clsEntries.push(entry);
        }
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as any;
        if (fidEntry.processingStart) {
          const fid = fidEntry.processingStart - entry.startTime;
          // FID tracking for internal metrics only
        }
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    window.addEventListener('beforeunload', () => {
      // CLS tracking for internal metrics only
    });
  } catch (error) {
    // Web vitals tracking failed
  }
};

// Image optimization utilities
export const optimizeImage = (src: string, width?: number, height?: number, quality: number = 80): string => {
  try {
    const url = new URL(src, window.location.origin);
    
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    url.searchParams.set('q', quality.toString());
    
    return url.toString();
  } catch (error) {
    return src;
  }
};

// Service Worker registration for caching
export const registerServiceWorker = async (): Promise<void> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    // Service Worker registered successfully
  } catch (error) {
    // Service Worker registration failed
  }
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = (): PerformanceMonitor | null => {
  if (typeof window === 'undefined') return null;

  try {
    addResourceHints();
    trackWebVitals();
    registerServiceWorker();
    return new PerformanceMonitor();
  } catch (error) {
    return null;
  }
};

const performanceUtils = {
  lazyLoadImage,
  debounce,
  throttle,
  createIntersectionObserver,
  preloadResource,
  inlineCriticalCSS,
  addResourceHints,
  MemoryManager,
  calculateVisibleItems,
  loadChunk,
  PerformanceMonitor,
  trackWebVitals,
  optimizeImage,
  registerServiceWorker,
  initializePerformanceOptimizations
};

export default performanceUtils;
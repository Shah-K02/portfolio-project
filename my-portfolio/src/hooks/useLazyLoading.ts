import { useState, useEffect, useRef, useCallback } from 'react';
import { createIntersectionObserver } from '../utils/performanceOptimizations';

interface UseLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseLazyLoadingReturn {
  ref: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  hasBeenVisible: boolean;
}

// Hook for lazy loading components when they enter the viewport
export const useLazyLoading = ({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true
}: UseLazyLoadingOptions = {}): UseLazyLoadingReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const isIntersecting = entry.isIntersecting;

      setIsVisible(isIntersecting);

      if (isIntersecting && !hasBeenVisible) {
        setHasBeenVisible(true);
        
        if (triggerOnce && observerRef.current && ref.current) {
          observerRef.current.unobserve(ref.current);
        }
      }
    },
    [hasBeenVisible, triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    observerRef.current = createIntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  return { ref, isVisible, hasBeenVisible };
};

// Hook for lazy loading images
interface UseLazyImageOptions {
  placeholder?: string;
  threshold?: number;
  rootMargin?: string;
}

interface UseLazyImageReturn {
  ref: React.RefObject<HTMLImageElement | null>;
  src: string;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useLazyImage = (
  imageSrc: string,
  {
    placeholder = '',
    threshold = 0.1,
    rootMargin = '50px'
  }: UseLazyImageOptions = {}
): UseLazyImageReturn => {
  const [src, setSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadImage = useCallback(async () => {
    if (isLoading || isLoaded) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const img = new Image();
      img.onload = () => {
        setSrc(imageSrc);
        setIsLoaded(true);
        setIsLoading(false);
      };
      img.onerror = () => {
        setError('Failed to load image');
        setIsLoading(false);
      };
      img.src = imageSrc;
    } catch (err) {
      setError('Failed to load image');
      setIsLoading(false);
    }
  }, [imageSrc, isLoading, isLoaded]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        loadImage();
        if (observerRef.current && ref.current) {
          observerRef.current.unobserve(ref.current);
        }
      }
    },
    [loadImage]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || isLoaded) return;

    observerRef.current = createIntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [handleIntersection, threshold, rootMargin, isLoaded]);

  return { ref, src, isLoaded, isLoading, error };
};

// Hook for lazy loading components with dynamic imports
interface UseLazyComponentOptions {
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ComponentType;
}

interface UseLazyComponentReturn<T> {
  ref: React.RefObject<HTMLElement | null>;
  Component: T | null;
  isLoading: boolean;
  error: string | null;
}

export const useLazyComponent = <T extends React.ComponentType<any>>(
  importFunction: () => Promise<{ default: T }>,
  {
    threshold = 0.1,
    rootMargin = '50px',
    fallback
  }: UseLazyComponentOptions = {}
): UseLazyComponentReturn<T> => {
  const [Component, setComponent] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasTriggered = useRef(false);

  const loadComponent = useCallback(async () => {
    if (isLoading || Component || hasTriggered.current) return;
    
    hasTriggered.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const module = await importFunction();
      setComponent(module.default);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load component');
      setIsLoading(false);
      console.error('Lazy component loading error:', err);
    }
  }, [importFunction, isLoading, Component]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        loadComponent();
        if (observerRef.current && ref.current) {
          observerRef.current.unobserve(ref.current);
        }
      }
    },
    [loadComponent]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || Component) return;

    observerRef.current = createIntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [handleIntersection, threshold, rootMargin, Component]);

  return { ref, Component, isLoading, error };
};

// Hook for preloading resources
interface UsePreloadOptions {
  delay?: number;
  condition?: boolean;
}

export const usePreload = (
  resources: string[],
  { delay = 0, condition = true }: UsePreloadOptions = {}
): void => {
  useEffect(() => {
    if (!condition) return;

    const preloadResources = () => {
      resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        
        // Determine resource type based on file extension
        const extension = resource.split('.').pop()?.toLowerCase();
        switch (extension) {
          case 'css':
            link.as = 'style';
            break;
          case 'js':
            link.as = 'script';
            break;
          case 'woff':
          case 'woff2':
          case 'ttf':
          case 'otf':
            link.as = 'font';
            link.crossOrigin = 'anonymous';
            break;
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'webp':
          case 'svg':
            link.as = 'image';
            break;
          default:
            link.as = 'fetch';
            link.crossOrigin = 'anonymous';
        }
        
        document.head.appendChild(link);
      });
    };

    if (delay > 0) {
      const timer = setTimeout(preloadResources, delay);
      return () => clearTimeout(timer);
    } else {
      preloadResources();
    }
  }, [resources, delay, condition]);
};

// Hook for virtual scrolling
interface UseVirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

interface UseVirtualScrollReturn {
  scrollElementRef: React.RefObject<HTMLElement | null>;
  startIndex: number;
  endIndex: number;
  totalHeight: number;
  offsetY: number;
}

export const useVirtualScroll = (
  itemCount: number,
  { itemHeight, containerHeight, overscan = 5 }: UseVirtualScrollOptions
): UseVirtualScrollReturn => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLElement>(null);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    itemCount - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );
  const totalHeight = itemCount * itemHeight;
  const offsetY = startIndex * itemHeight;

  useEffect(() => {
    const element = scrollElementRef.current;
    if (!element) return;

    const handleScroll = () => {
      setScrollTop(element.scrollTop);
    };

    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => element.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    scrollElementRef,
    startIndex,
    endIndex,
    totalHeight,
    offsetY
  };
};

const lazyLoadingHooks = {
  useLazyLoading,
  useLazyImage,
  useLazyComponent,
  usePreload,
  useVirtualScroll
};

export default lazyLoadingHooks;
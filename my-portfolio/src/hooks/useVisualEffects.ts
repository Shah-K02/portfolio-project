import { useEffect, useRef } from 'react';

export const useVisualEffects = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  
  const handleElementEnter = () => {
    if (cursorRef.current) {
      cursorRef.current.classList.add('hover');
    }
  };

  const handleElementLeave = () => {
    if (cursorRef.current) {
      cursorRef.current.classList.remove('hover');
    }
  };

  const attachEventListeners = (element: Element) => {
    if (element instanceof HTMLElement && 
        (element.matches('button') || element.matches('a') || element.matches('.interactive'))) {
      element.addEventListener('mouseenter', handleElementEnter);
      element.addEventListener('mouseleave', handleElementLeave);
    }
  };

  const removeEventListeners = (element: Element) => {
    if (element instanceof HTMLElement && 
        (element.matches('button') || element.matches('a') || element.matches('.interactive'))) {
      element.removeEventListener('mouseenter', handleElementEnter);
      element.removeEventListener('mouseleave', handleElementLeave);
    }
  };

  useEffect(() => {
    const cursor = cursorRef.current;
    const gradient = gradientRef.current;
    if (!cursor || !gradient) return;

    const updateCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursor.style.transform = `translate(${clientX - 10}px, ${clientY - 10}px)`;
    };

    const updateGradient = () => {
      if (!gradient) return;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / maxScroll;
      gradient.style.transform = `rotate(${45 + progress * 30}deg)`;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof Element && target.matches('button, a, .interactive')) {
        cursor.classList.add('hover');
      }
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('hover');
    };

    const handleMouseDown = () => {
      cursor.classList.add('active');
    };

    const handleMouseUp = () => {
      cursor.classList.remove('active');
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('scroll', updateGradient);
    
    // Attach to existing elements
    document.querySelectorAll('button, a, .interactive').forEach(attachEventListeners);

    // Watch for new elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            attachEventListeners(node);
            node.querySelectorAll('button, a, .interactive').forEach(attachEventListeners);
          }
        });
        mutation.removedNodes.forEach((node) => {
          if (node instanceof Element) {
            removeEventListeners(node);
            node.querySelectorAll('button, a, .interactive').forEach(removeEventListeners);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('scroll', updateGradient);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      document.querySelectorAll('button, a, .interactive').forEach(removeEventListeners);
      observer.disconnect();
    };
  }, []);

  return { cursorRef, gradientRef };
};
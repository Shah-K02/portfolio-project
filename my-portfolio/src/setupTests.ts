// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// framer-motion (via useReducedMotion, used by whileHover/whileTap transitions)
// expects window.matchMedia, which jsdom does not implement.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

// whileInView (Contact, About, Skills, etc.) relies on IntersectionObserver,
// which jsdom does not implement either.
if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    disconnect() {}
    observe() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
    unobserve() {}
  }
  (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
    MockIntersectionObserver;
  (global as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
    MockIntersectionObserver;
}

// Intersection Observer for scroll-triggered animations
const createScrollObserver = (options = {}) => {
  const defaultOptions = {
    threshold: 0.05,
    rootMargin: '-30% 0px -30% 0px',
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      } else {
        // Optional: remove class when out of view for re-animation
        entry.target.classList.remove('in-view');
      }
    });
  }, defaultOptions);

  return observer;
};

// Progress indicator for scroll position
const createScrollProgress = () => {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;

  const updateProgress = () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.transform = `scaleX(${progress / 100})`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress(); // Initial call

  return () => window.removeEventListener('scroll', updateProgress);
};

// Staggered animation helper
const createStaggeredAnimation = (container, itemSelector, options = {}) => {
  const items = container.querySelectorAll(itemSelector);
  const defaultOptions = {
    duration: 600,
    delay: 100,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    ...options
  };

  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * defaultOptions.delay}ms`;
  });
};

// Page transition handler
const handlePageTransition = (element, direction = 'enter') => {
  element.classList.add(`page-transition-${direction}`);
  requestAnimationFrame(() => {
    element.classList.add(`page-transition-${direction}-active`);
  });

  const cleanup = () => {
    element.classList.remove(`page-transition-${direction}`);
    element.classList.remove(`page-transition-${direction}-active`);
    element.removeEventListener('transitionend', cleanup);
  };

  element.addEventListener('transitionend', cleanup);
};

export {
  createScrollObserver,
  createScrollProgress,
  createStaggeredAnimation,
  handlePageTransition
};
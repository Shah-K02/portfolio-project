import { useRef, useState, useEffect } from "react";

export const useScrollNavigation = (sectionCount: number) => {
  // Initialize as an empty array that will hold our refs
  const sectionRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  // Create refs in a way that satisfies TypeScript
  if (sectionRefs.current.length === 0) {
    sectionRefs.current = new Array(sectionCount)
      .fill(null)
      .map(() => {
        const ref: { current: HTMLDivElement | null } = { current: null };
        return ref as React.RefObject<HTMLDivElement>;
      });
  }

  const [currentSection, setCurrentSection] = useState(0);
  const [hideUpArrow, setHideUpArrow] = useState(true);
  const [hideDownArrow, setHideDownArrow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToSection = (index: number) => {
    const ref = sectionRefs.current[index];
    if (ref?.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth"
      });
      setCurrentSection(index);
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + (window.innerHeight / 2);
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    sectionRefs.current.forEach((ref, index) => {
      if (ref.current) {
        const { offsetTop, offsetHeight } = ref.current;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setCurrentSection(index);
        }
      }
    });

    setHideUpArrow(window.scrollY < 50);
    setHideDownArrow(window.scrollY + windowHeight >= documentHeight - 50);
    setScrollProgress((window.scrollY / (documentHeight - windowHeight)) * 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    sectionRefs: sectionRefs.current,
    currentSection,
    hideUpArrow,
    hideDownArrow,
    scrollProgress,
    scrollToSection,
  };
};
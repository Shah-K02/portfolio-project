import { useRef, useState, useEffect, createRef} from "react";

export const useScrollNavigation = (sectionCount: number) => {
  // Initialize refs using a single useRef call with an array
  const sectionRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>([]);
  
  // Ensure we have enough refs in the array
  sectionRefs.current = Array.from({ length: sectionCount }, () => createRef<HTMLDivElement>());

  const [currentSection, setCurrentSection] = useState(0);
  const [hideUpArrow, setHideUpArrow] = useState(true);
  const [hideDownArrow, setHideDownArrow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToSection = (direction: 'up' | 'down') => {
    if (direction === "down" && currentSection < sectionCount - 1) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);
      window.scrollTo({
        top: sectionRefs.current[nextSection]?.current?.offsetTop,
        behavior: "smooth",
      });
    } else if (direction === "up" && currentSection > 0) {
      const prevSection = currentSection - 1;
      setCurrentSection(prevSection);
      window.scrollTo({
        top: sectionRefs.current[prevSection]?.current?.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;
    setScrollProgress(scrollPercentage);

    // Update current section based on scroll position
    sectionRefs.current.forEach((ref, index) => {
      if (ref.current) {
        const { offsetTop, offsetHeight } = ref.current;
        if (
          scrollPosition >= offsetTop - windowHeight / 2 &&
          scrollPosition < offsetTop + offsetHeight - windowHeight / 2
        ) {
          setCurrentSection(index);
        }
      }
    });

    // Check if at the top/bottom of the page
    setHideUpArrow(scrollPosition === 0);
    setHideDownArrow(scrollPosition + windowHeight >= documentHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
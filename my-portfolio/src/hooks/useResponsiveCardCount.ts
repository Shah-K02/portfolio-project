import { useState, useEffect, useCallback } from 'react';

const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1200,
} as const;

const CARDS_PER_VIEWPORT = {
  MOBILE: 2,
  TABLET: 3,
  DESKTOP: 6,
} as const;

export const useResponsiveCardCount = () => {
  const [visibleCards, setVisibleCards] = useState<2 | 3 | 6>(CARDS_PER_VIEWPORT.DESKTOP);

  const updateVisibleCards = useCallback(() => {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= BREAKPOINTS.MOBILE) {
      setVisibleCards(CARDS_PER_VIEWPORT.MOBILE);
    } else if (screenWidth <= BREAKPOINTS.TABLET) {
      setVisibleCards(CARDS_PER_VIEWPORT.TABLET);
    } else {
      setVisibleCards(CARDS_PER_VIEWPORT.DESKTOP);
    }
  }, []);

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, [updateVisibleCards]);

  return visibleCards;
};
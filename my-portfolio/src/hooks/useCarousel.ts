// hooks/useCarousel.ts
import { useState, useCallback, useMemo, useEffect } from 'react';

interface UseCarouselProps<T> {
  items: T[];
  itemsPerPage: number;
}

interface UseCarouselReturn<T> {
  currentPage: number;
  totalPages: number;
  visibleItems: T[];
  goToNext: () => void;
  goToPrevious: () => void;
  goToPage: (page: number) => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const useCarousel = <T>({ 
  items, 
  itemsPerPage 
}: UseCarouselProps<T>): UseCarouselReturn<T> => {
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate total pages
  const totalPages = useMemo(() => 
    Math.ceil(items.length / itemsPerPage), 
    [items.length, itemsPerPage]
  );

  // Get visible items for current page
  const visibleItems = useMemo(() => {
    const startIdx = currentPage * itemsPerPage;
    return items.slice(startIdx, startIdx + itemsPerPage);
  }, [currentPage, itemsPerPage, items]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentPage(prev => prev === totalPages - 1 ? 0 : prev + 1);
  }, [totalPages]);

  const goToPrevious = useCallback(() => {
    setCurrentPage(prev => prev === 0 ? totalPages - 1 : prev - 1);
  }, [totalPages]);

  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  // Navigation state
  const canGoNext = totalPages > 1;
  const canGoPrevious = totalPages > 1;

  // Reset to first page if current page becomes invalid
  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(0);
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    visibleItems,
    goToNext,
    goToPrevious,
    goToPage,
    canGoNext,
    canGoPrevious,
  };
};
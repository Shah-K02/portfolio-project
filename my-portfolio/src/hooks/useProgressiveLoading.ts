import { useState, useEffect, useCallback } from 'react';

interface ProgressiveLoadingOptions {
  initialBatchSize?: number;
  batchSize?: number;
  delay?: number;
  onLoadComplete?: () => void;
}

export function useProgressiveLoading<T>(
  items: T[],
  {
    initialBatchSize = 6,
    batchSize = 3,
    delay = 100,
    onLoadComplete
  }: ProgressiveLoadingOptions = {}
) {
  const [visibleItems, setVisibleItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initialize with initial batch
  useEffect(() => {
    setVisibleItems(items.slice(0, initialBatchSize));
    setHasMore(items.length > initialBatchSize);
  }, [items, initialBatchSize]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const currentLength = visibleItems.length;
      const nextBatch = items.slice(currentLength, currentLength + batchSize);

      setVisibleItems(prev => [...prev, ...nextBatch]);
      setHasMore(currentLength + batchSize < items.length);
      setIsLoading(false);

      if (currentLength + batchSize >= items.length) {
        onLoadComplete?.();
      }
    }, delay);
  }, [items, visibleItems, batchSize, delay, isLoading, hasMore, onLoadComplete]);

  return {
    visibleItems,
    isLoading,
    hasMore,
    loadMore
  };
}
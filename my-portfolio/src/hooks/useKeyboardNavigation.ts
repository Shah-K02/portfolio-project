// hooks/useKeyboardNavigation.ts
import { useCallback } from 'react';

interface UseKeyboardNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  enabled?: boolean;
}

export const useKeyboardNavigation = ({
  onPrevious,
  onNext,
  enabled = true,
}: UseKeyboardNavigationProps) => {
  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (!enabled) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        onPrevious();
        break;
      case 'ArrowRight':
        event.preventDefault();
        onNext();
        break;
      default:
        break;
    }
  }, [onPrevious, onNext, enabled]);

  return { handleKeyPress };
};
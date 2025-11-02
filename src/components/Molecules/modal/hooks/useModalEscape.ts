'use client';

import { useCallback, useEffect } from 'react';
interface UseModalEscape {
  isOpen: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
}
export const useModalEscape = ({
  isOpen,
  onClose,
  closeOnEscape = true,
}: UseModalEscape) => {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [onClose, closeOnEscape],
  );

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape, closeOnEscape]);
};

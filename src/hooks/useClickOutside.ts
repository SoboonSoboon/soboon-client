import { useEffect, useRef } from 'react';

export const useClickOutside = (
  onClose: () => void,
  excludeRef?: React.RefObject<HTMLElement>,
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (ref.current && ref.current.contains(target)) {
        return;
      }

      if (excludeRef?.current && excludeRef.current.contains(target)) {
        return;
      }

      onClose();
    };

    if (onClose !== undefined) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [onClose, excludeRef]);

  return ref as React.RefObject<HTMLDivElement>;
};

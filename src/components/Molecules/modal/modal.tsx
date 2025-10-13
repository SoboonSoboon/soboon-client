import { useCallback } from 'react';
import { cn } from '../../../utils/cn';
import type { ModalProps } from './utils/Modal.types';
import { getPositionClass, getSizeClass } from './utils/Modal.utils';
import { useModalEscape } from './hooks/useModalEscape';
import { useModalScrollLock } from './hooks/useModalScrollLock';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  showBackdrop = true,
  closeOnBackdropClick = true,
  position = 'center',
  contentClassName,
}) => {
  useModalEscape(isOpen, onClose);
  useModalScrollLock(isOpen);
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (!closeOnBackdropClick) return;
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose],
  );
  if (!isOpen) return null;
  return (
    <div
      className={cn(
        'fixed inset-0 flex',
        getPositionClass(position),
        showBackdrop ? 'bg-black/50' : 'bg-transparent',
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          'rounded-lg border border-gray-200 bg-white p-6 shadow-lg',
          getSizeClass(size),
          contentClassName,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

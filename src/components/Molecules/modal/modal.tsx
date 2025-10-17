import { useCallback } from 'react';
import { cn } from '../../../utils/cn';
import { useModalEscape } from './hooks/useModalEscape';
import { useModalScrollLock } from './hooks/useModalScrollLock';
import { ModalProps } from './utils/modalTypes';
import { getPositionClass, getSizeClass } from './utils/modalUtils';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  showBackdrop = true,
  closeOnBackdropClick = true,
  position = 'center',
  className,
  contentClassName,
  showCloseButton = false,
  closeButtonText = '닫기',
  closeButtonClassName,
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
        className,
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
        {showCloseButton && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className={cn(
                'hover:bg-gray-80 rounded bg-gray-50 px-4 py-2 text-white',
                closeButtonClassName,
              )}
            >
              {closeButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 모달 구조를 footer header content로 구분해야될필요가 있어보임 @영록

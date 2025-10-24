import { useCallback } from 'react';
import { cn } from '../../../utils/cn';
import { useModalEscape } from './hooks/useModalEscape';
import { useModalScrollLock } from './hooks/useModalScrollLock';
import { ModalProps } from './utils/modalTypes';
import { getPositionClass, getSizeClass } from './utils/modalUtils';
/**
 * 재사용 가능한 모달 컴포넌트
 *
 * @param size - 모달의 크기 (sm, md, lg 중 선택, 기본값: md)
 * @param showBackdrop - 모달 배경 오버레이 표시 여부 (기본값: true)
 * @param closeOnBackdropClick - 배경 클릭 시 모달 닫기 여부 (기본값: true)
 * @param closeOnEscape - ESC 키 누르면 모달 닫기 여부 (기본값: true)
 * @param position - 모달의 위치 (center, top, bottom, left, right 중 선택, 기본값: center)
 * @param className - 모달 컨테이너에 적용할 추가 CSS 클래스
 * @param contentClassName - 모달 콘텐츠 영역에 적용할 추가 CSS 클래스
 * @param showCloseButton - 닫기 버튼 표시 여부 (기본값: false)
 * @param closeButtonText - 닫기 버튼에 표시될 텍스트 (기본값: '닫기')
 * @param closeButtonClassName - 닫기 버튼에 적용할 추가 CSS 클래스
 * @param lockScroll - 모달 열릴 때 배경 스크롤 락 여부 (기본값: true)
 * @param scrollable - 모달 내부 스크롤 허용 여부 (기본값: false)
 * @param maxHeight - 모달 최대 높이 (기본값: '80vh')
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  showBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  position = 'center',
  className,
  contentClassName,
  showCloseButton = false,
  closeButtonText = '닫기',
  closeButtonClassName,
  lockScroll = true,
  scrollable = false,
  maxHeight = '80vh',
}) => {
  useModalEscape({ isOpen, onClose, closeOnEscape });
  useModalScrollLock(isOpen && lockScroll);
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
          'rounded-lg border border-gray-200 bg-white shadow-lg',
          getSizeClass(size),
          scrollable && 'overflow-y-auto',
          contentClassName,
        )}
        style={scrollable ? { maxHeight } : {}}
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

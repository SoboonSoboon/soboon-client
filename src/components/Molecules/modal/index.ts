// Modal 컴포넌트
export { Modal } from './modal';

// Modal 타입들
export type { ModalProps, ModalPosition, ModalSize } from './utils/Modal.types';

// Modal 유틸리티 함수들
export { getPositionClass, getSizeClass } from './utils/Modal.utils';

// Modal 훅들
export { useModalEscape } from './hooks/useModalEscape';
export { useModalScrollLock } from './hooks/useModalScrollLock';
export { useModal } from './hooks/useModal';
export type { UseModalOptions, UseModalReturn } from './hooks/useModal';

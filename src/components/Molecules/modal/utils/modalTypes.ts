export type ModalPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';
export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  showBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  position?: ModalPosition;
  className?: string;
  contentClassName?: string;
  showCloseButton?: boolean;        
  closeButtonText?: string;         
  closeButtonClassName?: string;
}

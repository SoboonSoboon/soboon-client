'use client';

import { cn } from '@/utils/cn';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Modal, useModal } from '@/components/Molecules/modal';

export interface ActionMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClose?: () => void;
  buttonRef?: React.RefObject<HTMLElement>;
  onDelete?: () => void;
}

export const ActionMenu = ({
  className,
  onClose,
  buttonRef,
  onDelete,
  ...props
}: ActionMenuProps) => {
  const deleteModal = useModal();

  const handleOutsideClose = () => {
    if (!deleteModal.isOpen) {
      onClose?.();
    }
  };

  const menuRef = useClickOutside(handleOutsideClose, buttonRef);

  const handleConfirmDeleteClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    deleteModal.open();
  };

  const handleConfirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log('게시글 삭제 버튼 클릭');
    onDelete?.();
    deleteModal.close();
    onClose?.();
  };

  return (
    <>
      <div
        ref={menuRef}
        className={cn(
          'border-gray-10 mt-2.5 flex w-35 flex-col rounded-xl border-1 bg-white shadow-[0_0_6px_rgba(0,0,0,0.15)]',
          className,
        )}
        {...props}
      >
        <ul className="text-gray-90 flex flex-col">
          <li className="text-text-main flex cursor-pointer items-center justify-center border-b border-[var(--GrayScale-Gray10)] px-4 py-2.5 transition-all duration-200 hover:rounded-t-xl">
            <span>수정</span>
          </li>
          <li
            className="text-warning flex cursor-pointer items-center justify-center px-4 py-2.5 transition-all duration-200 hover:rounded-b-xl"
            onClick={handleConfirmDeleteClick}
          >
            <span>삭제</span>
          </li>
        </ul>
      </div>

      <Modal isOpen={deleteModal.isOpen} onClose={deleteModal.close} size="sm">
        <div
          className="flex flex-col items-center gap-4"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold">게시글 삭제</h2>
          <p className="text-center text-gray-600">
            정말로 이 게시글을 삭제하시겠습니까?
            <br />
            삭제된 게시글은 복구가 어려워요.
          </p>
          <div className="mt-2 flex w-full gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteModal.close();
              }}
              className="flex-1 cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="bg-primary flex-1 cursor-pointer rounded-lg px-4 py-2 text-white transition-colors"
            >
              삭제
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

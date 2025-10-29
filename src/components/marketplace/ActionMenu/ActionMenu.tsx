'use client';

import { cn } from '@/utils/cn';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Modal, useModal } from '@/components/Molecules/modal';
import { deleteMeetingsApi } from '@/apis/meetings/deleteMeetingsApi';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { MODAL_CONTENT, MODAL_TITLE } from '@/constants';
import { Button } from '@/components/Atoms';

export interface ActionMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClose?: () => void;
  buttonRef?: React.RefObject<HTMLElement>;
  meetingId: number;
}

export const ActionMenu = ({
  className,
  onClose,
  buttonRef,
  meetingId,
  ...props
}: ActionMenuProps) => {
  const deleteModal = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleUpdateMeetingClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    onClose?.();

    if (pathname.includes('/sharing')) {
      router.push(`/sharing/${meetingId}/update`);
    } else if (pathname.includes('/shopping')) {
      router.push(`/shopping/${meetingId}/update`);
    }
  };

  const handleConfirmDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await deleteMeetingsApi(meetingId);

      deleteModal.close();
      onClose?.();

      router.push(`/${pathname.includes('/sharing') ? 'sharing' : 'shopping'}`);
      router.refresh();
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다. 다시 시도해주세요.');
      setIsDeleting(false);
    }
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
          <li
            className="text-text-main flex cursor-pointer items-center justify-center border-b border-[var(--GrayScale-Gray10)] px-4 py-2.5 transition-all duration-200 hover:rounded-t-xl"
            onClick={handleUpdateMeetingClick}
          >
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
          className="flex flex-col items-center p-7 pb-5"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <h2 className="mb-2 text-[22px] font-semibold">
            {MODAL_TITLE.DELETE_MEETING}
          </h2>
          <p className="text-text-main mb-8 text-center">
            {MODAL_CONTENT.DELETE_MEETING}
          </p>
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteModal.close();
              }}
              className="w-full"
              label="취소"
            />
            <Button
              type="button"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              label={isDeleting ? '삭제 중...' : '삭제'}
              className="w-full"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

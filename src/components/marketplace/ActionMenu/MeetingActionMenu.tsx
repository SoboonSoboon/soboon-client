'use client';

import { ActionMenu, ActionMenuItem, Button } from '@/components/Atoms';
import { Modal, useModal } from '@/components/Molecules/modal';
import { deleteMeetingsApi } from '@/apis/meetings/deleteMeetingsApi';
import { MODAL_CONTENT, MODAL_TITLE } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export interface MeetingActionMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClose?: () => void;
  buttonRef?: React.RefObject<HTMLElement>;
  meetingId: number;
}

export const MeetingActionMenu = ({
  className,
  onClose,
  buttonRef,
  meetingId,
  ...props
}: MeetingActionMenuProps) => {
  const deleteModal = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOutsideClose = () => {
    if (!deleteModal.isOpen) {
      onClose?.();
    }
  };

  const handleUpdateMenuClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    onClose?.();

    if (pathname.includes('/sharing')) {
      router.push(`/sharing/${meetingId}/update`);
    } else if (pathname.includes('/shopping')) {
      router.push(`/shopping/${meetingId}/update`);
    }
  };

  const handleDeleteMenuClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    deleteModal.open();
  };

  const handleDeleteButtonClick = async (
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

  const menuItems: ActionMenuItem[] = [
    {
      id: 'update',
      label: '수정',
      onClick: handleUpdateMenuClick,
      variant: 'default',
    },
    {
      id: 'delete',
      label: '삭제',
      onClick: handleDeleteMenuClick,
      variant: 'danger',
    },
  ];

  return (
    <>
      <ActionMenu
        items={menuItems}
        onClose={handleOutsideClose}
        buttonRef={buttonRef}
        className={className}
        {...props}
      />

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
              onClick={handleDeleteButtonClick}
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

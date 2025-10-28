'use client';

import { ActionMenu, Button, useToast } from '@/components/Atoms';
import { Modal, useModal } from '@/components/Molecules/modal';
import { deleteMeetingsApi } from '@/apis/meetings/deleteMeetingsApi';
import { TOAST_MESSAGES } from '@/constants/toastMessages';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { MODAL_MESSAGES } from '@/constants/modal';

export interface PostActionMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClose?: () => void;
  buttonRef?: React.RefObject<HTMLElement>;
  meetingId: number;
}

export const PostActionMenu = ({
  className,
  onClose,
  meetingId,
}: PostActionMenuProps) => {
  const deleteModal = useModal();
  const { success, error } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleShareMenuClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(
      `${window.location.origin}/${pathname.includes('/sharing') ? 'sharing' : 'shopping'}/${meetingId}`,
    );
    onClose?.();
    success(TOAST_MESSAGES.POST.SHARE.SUCCESS);
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

  const handleDeleteConfirmClick = async () => {
    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteMeetingsApi(meetingId);

      deleteModal.close();
      onClose?.();

      router.push(`/${pathname.includes('/sharing') ? 'sharing' : 'shopping'}`);
      router.refresh();
    } catch {
      error(TOAST_MESSAGES.POST.DELETE.ERROR);
      setIsDeleting(false);
    }
  };

  const POST_ACTION_MENU_OPTIONS: {
    id: string;
    label: string;
    onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
    variant?: 'default' | 'danger';
  }[] = [
    {
      id: 'share',
      label: '링크 복사',
      onClick: handleShareMenuClick,
      variant: 'default',
    },
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
      <div>
        <ActionMenu
          className={className}
          onClose={onClose}
          menuOptions={POST_ACTION_MENU_OPTIONS}
        />
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        size="sm"
        className="!z-[100000]"
      >
        <div
          className="flex flex-col items-center gap-8 p-7"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-[22px] font-semibold">
              {MODAL_MESSAGES.DELETE_POST.TITLE}
            </h2>
            <p className="text-center text-gray-600">
              {MODAL_MESSAGES.DELETE_POST.CONTENT}
            </p>
          </div>
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                deleteModal.close();
              }}
              label={MODAL_MESSAGES.DELETE_POST.BUTTONS.CANCEL}
              className="w-28"
            />
            <Button
              variant="filled"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteConfirmClick();
              }}
              disabled={isDeleting}
              label={
                isDeleting
                  ? '삭제 중...'
                  : MODAL_MESSAGES.DELETE_POST.BUTTONS.CONFIRM
              }
              className="w-28"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

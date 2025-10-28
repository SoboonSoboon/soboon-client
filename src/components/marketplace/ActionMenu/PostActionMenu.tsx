'use client';

import { cn } from '@/utils/cn';
// import { useClickOutside } from '@/hooks/useClickOutside';
import { Modal, useModal } from '@/components/Molecules/modal';
import { deleteMeetingsApi } from '@/apis/meetings/deleteMeetingsApi';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ActionMenu, ActionMenuVariant } from './ActionMenu';
import { useToast } from '@/components/Atoms';

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
  // buttonRef,
  meetingId,
}: PostActionMenuProps) => {
  const deleteModal = useModal();
  const { success } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [isDeleting, setIsDeleting] = useState(false);

  // const actionMenuRef = useClickOutside(
  //   deleteModal.isOpen ? () => {} : () => onClose?.(),
  //   buttonRef,
  // );

  const handleShareMenuClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(
      `${window.location.origin}/${pathname.includes('/sharing') ? 'sharing' : 'shopping'}/${meetingId}`,
    );
    onClose?.();
    success('링크 복사에 성공했어요.');
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
    } catch (error) {
      error('게시글 삭제에 실패했습니다. 다시 시도해 주세요.');
      setIsDeleting(false);
    }
  };

  const POST_ACTION_MENU_OPTIONS: {
    id: string;
    label: string;
    onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
    variant?: ActionMenuVariant;
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
        {/* <div ref={actionMenuRef}> */}
        <ActionMenu
          className={className}
          onClose={onClose}
          menuOptions={POST_ACTION_MENU_OPTIONS}
        />
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteConfirmClick();
              }}
              disabled={isDeleting}
              className="bg-primary flex-1 cursor-pointer rounded-lg px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

import { deleteComment } from '@/action/commentAction';
import {
  ActionMenu,
  ActionMenuItem,
  Button,
  useToast,
} from '@/components/Atoms';
import { Modal, useModal } from '@/components/Molecules/modal';
import {
  MODAL_CONTENT,
  MODAL_TITLE,
  TOAST_FAILURE_MESSAGE,
  TOAST_SUCCESS_MESSAGE,
} from '@/constants';
import { useParams } from 'next/navigation';

export const CommentActionMenu = ({
  className,
  onEditClick,
  commentId,
  onClose,
  buttonRef,
  ...props
}: {
  className?: string;
  onEditClick?: () => void;
  commentId: string;
  onClose?: () => void;
  buttonRef?: React.RefObject<HTMLElement>;
}) => {
  const deleteModal = useModal();
  const { success, error } = useToast();

  const handleOutsideClose = () => {
    if (!deleteModal.isOpen) {
      onClose?.();
    }
  };

  const meetingId = useParams<{ id: string }>().id;

  const handleDeleteMenuClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    deleteModal.open();
  };

  const handleDeleteButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    const formData = new FormData();
    formData.append('meetingId', meetingId);
    formData.append('commentId', commentId);
    try {
      await deleteComment(null, formData);
      deleteModal.close();
      onClose?.();
      success(TOAST_SUCCESS_MESSAGE.DELETE_COMMENT);
    } catch {
      error(TOAST_FAILURE_MESSAGE.DELETE_COMMENT);
      deleteModal.close();
    }
  };

  const menuItems: ActionMenuItem[] = [
    {
      id: 'edit',
      label: '수정',
      onClick: onEditClick,
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
            {MODAL_TITLE.DELETE}
          </h2>
          <p className="text-text-main mb-8 text-center">
            {MODAL_CONTENT.DELETE_COMMENT}
          </p>
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              onClick={() => {
                deleteModal.close();
              }}
              className="w-full"
              label="취소"
            />
            <Button
              variant="filled"
              label="삭제"
              onClick={handleDeleteButtonClick}
              className="w-full"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

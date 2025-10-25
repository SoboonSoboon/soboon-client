import { deleteComment } from '@/action/commentAction';
import { useToast } from '@/components/Atoms';
import { Modal, useModal } from '@/components/Molecules/modal';
import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/utils/cn';
import { useParams } from 'next/navigation';
export const CommentActionMenu = ({
  className,
  onClose,
  onEditClick,
  commentId,
  ...props
}: {
  className?: string;
  onClose?: () => void;
  onEditClick?: () => void;
  commentId: string;
}) => {
  const menuRef = useClickOutside(onClose as () => void);
  const deleteModal = useModal();
  const { success, error } = useToast();

  const meetingId = useParams<{ id: string }>().id;

  const handleConfirmDeleteClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    deleteModal.open();
  };

  const handleConfirmDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    const formData = new FormData();
    formData.append('meetingId', meetingId);
    formData.append('commentId', commentId);
    const response = await deleteComment(null, formData);
    if (response) {
      success('댓글 삭제 성공');
    } else {
      error('댓글 삭제 실패');
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
          <li className="text-text-main flex cursor-pointer items-center justify-center border-b border-[var(--GrayScale-Gray10)] px-4 py-2.5 transition-all duration-200 hover:rounded-t-xl">
            <span onClick={onEditClick}>수정</span>
          </li>
          <li
            className="text-warning flex cursor-pointer items-center justify-center px-4 py-2.5 transition-all duration-200 hover:rounded-b-xl"
            onClick={handleConfirmDeleteClick}
          >
            <span>삭제</span>
          </li>
        </ul>
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        size="sm"
        className="!z-100000"
      >
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
              className="bg-primary flex-1 cursor-pointer rounded-lg px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              삭제
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

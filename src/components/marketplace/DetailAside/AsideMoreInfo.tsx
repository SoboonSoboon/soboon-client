import { StatusTag } from '@/components';
import { Bookmark, EllipsisVertical } from 'lucide-react';
import { useRef, useState } from 'react';
import { PostActionMenu } from '@/components/marketplace/ActionMenu/PostActionMenu';
import { StatusType } from '@/types/common';

export const AsideMoreInfo = ({
  status,
  isBookmarked,
  handleBookmarkClick,
  meetingId,
  isAuthor,
}: {
  status: StatusType;
  isBookmarked: boolean;
  handleBookmarkClick: () => void;
  meetingId: string;
  isAuthor: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full justify-between">
      {/* 상태 바 */}
      <div>
        <StatusTag status={status} />
      </div>

      {/* 아이콘 버튼 */}
      <div className="relative flex cursor-pointer justify-center gap-2">
        <div className="flex justify-center p-1.5">
          <Bookmark
            className={`${isBookmarked ? 'text-primary fill-primary' : 'text-gray-40 fill-gray-40'} size-6`}
            onClick={handleBookmarkClick}
          />
        </div>
        <div
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="flex cursor-pointer rounded-lg p-1.5 hover:bg-[var(--GrayScale-Gray5)]"
        >
          <EllipsisVertical className="text-gray-30 size-6" />
        </div>
        {open && isAuthor && (
          <div className="absolute top-8 right-0 z-50">
            <PostActionMenu
              onClose={() => setOpen(false)}
              buttonRef={buttonRef}
              meetingId={+meetingId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

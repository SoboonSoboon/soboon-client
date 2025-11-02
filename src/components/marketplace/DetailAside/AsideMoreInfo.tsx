import { StatusTag } from '@/components/Atoms';
import { MeetingActionMenu } from '@/components/marketplace';
import { Bookmark, EllipsisVertical } from 'lucide-react';
import { useRef, useState } from 'react';
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
      <div className="py-1.5">
        <StatusTag status={status} />
      </div>

      {/* 아이콘 버튼 */}
      <div className="relative flex cursor-pointer justify-center gap-1">
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
          className="hover:bg-gray-5 flex cursor-pointer rounded-lg p-1.5"
        >
          <EllipsisVertical className="text-gray-40 size-6" />
        </div>
        {open && (
          <div className="absolute top-8 right-0 z-50">
            <MeetingActionMenu
              onClose={() => setOpen(false)}
              buttonRef={buttonRef as React.RefObject<HTMLElement>}
              meetingId={+meetingId}
              isAuthor={isAuthor}
            />
          </div>
        )}
      </div>
    </div>
  );
};

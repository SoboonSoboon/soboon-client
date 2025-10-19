import { EllipsisVertical } from 'lucide-react';
import { timeFormatter } from '@/utils/timeFormetter';
import { CommentType, ReplyType } from '@/types/commentType';
import { ProfileImg } from '@/components';

export const CommentItem = ({
  comment,
}: {
  comment: CommentType | ReplyType;
}) => {
  console.log(comment);
  return (
    <div>
      <div className="flex gap-3">
        {/* S3 이미지 추가 필요 */}
        <ProfileImg profileImageUrl={comment.authorProfileImageUrl} size={24} />
        <div className="flex-1 gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-text-sub2">{comment.authorNickname}</span>
              <span className="text-sm text-gray-50">
                {timeFormatter(comment.createdAt)}
              </span>
            </div>
            <div className="cursor-pointer">
              <EllipsisVertical className="size-4 text-gray-50" />
            </div>
          </div>
          <p className="text-gray-95">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

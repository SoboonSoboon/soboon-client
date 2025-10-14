import Image from 'next/image';
import { CommentInterface, replyInterface } from '../CommentSection';
import { EllipsisVertical } from 'lucide-react';

export const CommentItem = ({
  comment,
}: {
  comment: CommentInterface | replyInterface;
}) => {
  return (
    <div>
      <div className="flex gap-3">
        <Image
          src={comment.authorProfileImageUrl}
          alt={comment.authorNickname}
          className="size-6 rounded-full"
          width={24}
          height={24}
        />
        <div className="flex-1 gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-text-sub2">{comment.authorNickname}</span>
              <span className="text-sm text-gray-50">
                {new Date(comment.createdAt).toLocaleDateString()}
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

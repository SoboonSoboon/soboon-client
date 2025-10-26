'use client';

import { EllipsisVertical } from 'lucide-react';
import { timeFormatter } from '@/utils';
import { CommentType, ReplyType } from '@/types/commentType';
import { Button, ProfileImg, ProfilePopover, TextInput } from '@/components';
import { CommentActionMenu } from '../ActionMenu/CommentActionMenu';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { updateComment } from '@/action/commentAction';
import { useToast } from '@/components/Atoms';

export const CommentItem = ({
  comment,
}: {
  comment: CommentType | ReplyType;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const meetingId = useParams<{ id: string }>().id;
  const { success, error } = useToast();
  const [currentComment, setCurrentComment] = useState(comment.content);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
    setIsOpen(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const commentId =
      (comment as CommentType)?.commentId?.toString() ||
      (comment as ReplyType)?.replyId?.toString() ||
      '';
    const response = await updateComment(null, formData, commentId, meetingId);
    if (response) {
      success('댓글 수정 성공');
      handleCancelClick();
    } else {
      error('댓글 수정 실패');
    }

    setIsOpen(false);
    setIsEditing(false);
  };
  return (
    <div>
      <div className="relative">
        <div className="flex justify-between">
          <div className="mb-2 flex items-center gap-2">
            <ProfileImg
              profileImageUrl={comment.authorProfileImageUrl}
              size={32}
            />
            <ProfilePopover
              nickname={comment.authorNickname}
              profileImage={comment.authorProfileImageUrl}
              keywords={[]}
              contentClassName="top-full left-44 z-50"
            >
              <span className="text-text-main cursor-pointer font-bold hover:underline">
                {comment.authorNickname}
              </span>
            </ProfilePopover>

            <span className="text-sm text-gray-50">
              {timeFormatter(comment.createdAt)}
            </span>
          </div>
          <div className="cursor-pointer">
            <EllipsisVertical
              className="size-6 text-gray-50"
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <CommentActionMenu
                className="absolute top-5 right-0 z-50"
                commentId={
                  (comment as CommentType)?.commentId?.toString() ||
                  (comment as ReplyType)?.replyId?.toString() ||
                  ''
                }
                onEditClick={() => handleEditClick()}
              />
            )}
          </div>
        </div>
        <div>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <TextInput
                className="!border-text-line1 !border-1 bg-white"
                placeholder="댓글을 수정해주세요."
                value={currentComment}
                onChange={(e) => setCurrentComment(e.target.value)}
                name="comment"
              />
              <Button label="수정" className="text-primary" type="submit" />
              <Button
                label="취소"
                className="bg-gray-200 text-gray-700"
                type="button"
                onClick={() => handleCancelClick()}
              />
            </form>
          ) : (
            <p className="text-gray-95">{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

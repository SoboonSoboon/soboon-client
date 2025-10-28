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
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { usePopoverReview } from '@/hooks/usePopoverReview';

export const CommentItem = ({
  isAuthor,
  comment,
}: {
  comment: CommentType | ReplyType;
  isAuthor: boolean;
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

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsOpen(false);
  };

  const userId = useAuthStore((state) => state.userId);

  // 댓글 작성자의 인기 리뷰 키워드 가져오기
  const { data: popKeywords } = usePopoverReview(comment.authorId);

  // 키워드 데이터 변환
  const keywords = Array.isArray(popKeywords?.data?.keywords)
    ? popKeywords.data.keywords.map((item) => ({
        keyword: item.keyword,
        count: item.count,
      }))
    : [];

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
              keywords={keywords}
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
            {isOpen && userId === comment.authorId && (
              <CommentActionMenu
                className="absolute top-5 right-0 z-50"
                commentId={
                  (comment as CommentType)?.commentId?.toString() ||
                  (comment as ReplyType)?.replyId?.toString() ||
                  ''
                }
                onEditClick={() => handleEditClick()}
                onClose={handleCloseMenu}
              />
            )}
          </div>
        </div>
        <div>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <TextInput
                className="!border-text-line1 !border-1 bg-white"
                value={currentComment}
                onChange={(e) => setCurrentComment(e.target.value)}
                name="comment"
              />
              <Button label="수정" className="text-primary" type="submit" />
              <Button
                label="취소"
                className="!bg-gray-200 !text-gray-700"
                type="button"
                onClick={() => handleCancelClick()}
              />
            </form>
          ) : comment.secret ? (
            userId === comment.authorId || isAuthor ? (
              <p className="text-gray-95">{comment.content}</p>
            ) : (
              <p className="text-gray-60">
                비밀 댓글입니다. 작성자만 확인할 수 있습니다.
              </p>
            )
          ) : (
            <p className="text-gray-95">{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

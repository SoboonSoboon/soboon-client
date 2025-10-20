'use client';

import { CommentsType } from '@/types/commentType';
import { CommentItem } from './CommentItem';
import { useActionState, useEffect, useState } from 'react';
import { Button, TextInput } from '@/components';
import { createReply } from '@/action/createComment';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/Atoms';

export const CommentListContainer = ({
  commentList,
}: {
  commentList: CommentsType['content'];
}) => {
  const [openReply, setOpenReply] = useState<number | null>(null);
  const meetingId = useParams<{ id: string }>().id;
  const { success } = useToast();
  const handleToggleReply = (commentId: number) => {
    setOpenReply(commentId);
  };
  const handleCloseReply = () => {
    setOpenReply(null);
  };

  const [state, formAction] = useActionState(createReply, null);

  useEffect(() => {
    if (state) {
      handleCloseReply();
      success(state);
    }
  }, [state]);

  return (
    <div className="space-y-4">
      {commentList.map((comment) => (
        <div key={comment.commentId} className="border-b border-gray-200 pb-4">
          {/* 메인 댓글 */}
          <div>
            <div
              className="cursor-pointer"
              onClick={() => handleToggleReply(comment.commentId)}
            >
              <CommentItem comment={comment} />
            </div>
            {openReply === comment.commentId && (
              <div className="mt-3">
                <form action={formAction} className="flex items-center gap-2">
                  <input name="meetingId" hidden readOnly value={meetingId} />
                  <input
                    name="commentId"
                    hidden
                    readOnly
                    value={comment.commentId}
                  />
                  <TextInput
                    placeholder="대댓글을 입력해주세요."
                    name="reply"
                  />
                  <div className="flex gap-2">
                    <Button
                      label="작성"
                      type="submit"
                      className="text-primary border-primary"
                      size="small"
                    />
                    <Button
                      label="취소"
                      className="text-text-line2 border-text-line2"
                      size="small"
                      onClick={handleCloseReply}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* 대댓글 */}
          {comment.replies.length > 0 && (
            <div className="mt-3 ml-11 flex flex-col gap-2">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.replyId} comment={reply} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

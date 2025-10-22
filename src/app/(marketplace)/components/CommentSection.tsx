'use client';

import { CommentsListType } from '@/types/commentType';
import { CommentCountContainer } from './comment/CommentCountContainer';
import { CommentInputContainer } from './comment/CommentInputContainer';
import { CommentListContainer } from './comment/CommentListContainer';
import { useEffect, useState } from 'react';

export const CommentSection = ({
  commentsList,
  status,
}: {
  commentsList: CommentsListType | null;
  status: 'RECRUITING' | 'COMPLETED' | 'CLOSED';
}) => {
  const [comments, setComments] = useState<CommentsListType['content']>(
    commentsList?.content || [],
  );

  useEffect(() => {
    setComments(commentsList?.content || []);
  }, [commentsList]);

  return (
    <div className="mt-8 w-full">
      {/* 댓글 헤더 */}
      <CommentCountContainer commentCount={commentsList!.totalElements} />

      {/* 댓글 입력 영역 */}
      <CommentInputContainer status={status} />

      {/* 댓글 리스트 영역 */}
      <CommentListContainer commentList={comments} />
    </div>
  );
};

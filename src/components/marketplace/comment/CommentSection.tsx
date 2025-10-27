'use client';

import { CommentsListType } from '@/types/commentType';
import { CommentCountContainer } from './CommentCountContainer';
import { CommentInputContainer } from './CommentInputContainer';
import { CommentListContainer } from './CommentListContainer';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

export const CommentSection = ({
  commentsList,
  status,
  isAuthor,
}: {
  commentsList: CommentsListType | null;
  status: 'RECRUITING' | 'COMPLETED' | 'CLOSED';
  isAuthor: boolean;
}) => {
  const router = useRouter();
  const [comments, setComments] = useState<CommentsListType['content']>(
    commentsList?.content || [],
  );

  const handleSortTypeChange = (value: 'RECENT' | 'OLDEST') => {
    router.push(`?sortType=${value}`, { scroll: false });
  };

  useEffect(() => {
    setComments(commentsList?.content || []);
  }, [commentsList]);

  return (
    <div className="mt-8 w-full">
      {/* 댓글 헤더 */}
      <CommentCountContainer
        commentCount={commentsList!.totalElements}
        handleSortTypeChange={handleSortTypeChange}
      />

      {/* 댓글 입력 영역 */}
      <CommentInputContainer status={status} />

      {/* 댓글 리스트 영역 */}
      <CommentListContainer commentList={comments} isAuthor={isAuthor} />
    </div>
  );
};

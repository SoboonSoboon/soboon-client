import { CommentsListType } from '@/types/commentType';
import { CommentCountContainer } from './CommentCountContainer';
import { CommentInputContainer } from './CommentInputContainer';
import { CommentListContainer } from './CommentListContainer';

export const CommentSection = ({
  commentsList,
  status,
  isAuthor,
}: {
  commentsList: CommentsListType | null;
  status: 'RECRUITING' | 'COMPLETED' | 'CLOSED';
  isAuthor: boolean;
}) => {
  return (
    <div className="mt-8 w-full">
      {/* 댓글 헤더 */}
      <CommentCountContainer commentCount={commentsList!.totalElements} />

      {/* 댓글 입력 영역 */}
      <CommentInputContainer status={status} />

      {/* 댓글 리스트 영역 */}
      <CommentListContainer
        commentList={commentsList?.content || []}
        isAuthor={isAuthor}
      />
    </div>
  );
};

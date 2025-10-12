import { CommentItem } from './CommentItem';
import { CommentInterface } from '../ShoppingComment';

export const CommentListContainer = ({
  commentList,
}: {
  commentList: CommentInterface[];
}) => {
  return (
    <div className="space-y-4">
      {commentList.map((comment) => (
        <div key={comment.commentId} className="border-b border-gray-200 pb-4">
          {/* 메인 댓글 */}
          <CommentItem comment={comment} />

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

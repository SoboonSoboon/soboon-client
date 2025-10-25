export const CommentCountContainer = ({
  commentCount,
}: {
  commentCount: number;
}) => {
  return (
    <div className="mb-6">
      <p className="font-memomentKkukkkuk">
        댓글 <span className="text-primary">{commentCount}</span>개
      </p>
    </div>
  );
};

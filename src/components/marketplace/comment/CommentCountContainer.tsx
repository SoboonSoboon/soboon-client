import { DateFilter } from '@/components/Atoms';

export const CommentCountContainer = ({
  commentCount,
  handleSortTypeChange,
}: {
  commentCount: number;
  handleSortTypeChange: (value: 'RECENT' | 'OLDEST') => void;
}) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="font-memomentKkukkkuk">
        댓글 <span className="text-primary">{commentCount}</span>개
      </p>
      <DateFilter onChange={(value) => handleSortTypeChange(value)} />
    </div>
  );
};

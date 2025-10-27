'use client';

import { DateFilter } from '@/components/Atoms';
import { useRouter } from 'next/navigation';

export const CommentCountContainer = ({
  commentCount,
}: {
  commentCount: number;
}) => {
  const router = useRouter();

  const handleSortTypeChange = (value: 'RECENT' | 'OLDEST') => {
    const formattedValue = value === 'OLDEST' ? 'RECENT' : 'OLDEST';
    router.push(`?sortType=${formattedValue}`, { scroll: false });
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="font-memomentKkukkkuk">
        댓글 <span className="text-primary">{commentCount}</span>개
      </p>
      <DateFilter onChange={(value) => handleSortTypeChange(value)} />
    </div>
  );
};

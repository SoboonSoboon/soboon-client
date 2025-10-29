'use client';

import { getCommentCountApi } from '@/apis/comment/getCommentCount';
import { DateFilter } from '@/components/Atoms';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';

export const CommentCountContainer = ({
  initialCommentCount,
}: {
  initialCommentCount: number;
}) => {
  const router = useRouter();
  const meetingId = useParams<{ id: string }>().id;

  const { data: commentCount } = useQuery({
    queryKey: ['commentCount', meetingId],
    queryFn: () => getCommentCountApi(meetingId),
    initialData: initialCommentCount,
    retry: 1,
    retryDelay: 1000,
  });
  const handleSortTypeChange = (value: 'RECENT' | 'OLDEST') => {
    const formattedValue = value === 'OLDEST' ? 'RECENT' : 'OLDEST';
    router.push(`?sortType=${formattedValue}`, { scroll: false });
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="font-memomentKkukkkuk">
        댓글 <span className="text-primary">{commentCount ?? 0}</span>개
      </p>
      <DateFilter onChange={(value) => handleSortTypeChange(value)} />
    </div>
  );
};

'use client';

import { getCommentCountApi } from '@/apis/comment/getCommentCount';
import { DateFilter } from '@/components/Atoms';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams, usePathname } from 'next/navigation';

export const CommentCountContainer = ({
  initialCommentCount,
}: {
  initialCommentCount: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const meetingId = useParams<{ id: string }>().id;

  const { data: commentCount } = useQuery({
    queryKey: ['commentCount', meetingId],
    queryFn: () => getCommentCountApi(meetingId),
    initialData: initialCommentCount,
  });
  const handleSortTypeChange = (value: 'RECENT' | 'OLDEST') => {
    const formattedValue = value === 'OLDEST' ? 'RECENT' : 'OLDEST';

    const params = new URLSearchParams(searchParams.toString());

    params.set('sortType', formattedValue);

    const newUrl = `${pathname}?${params.toString()}`;

    window.history.replaceState({}, '', newUrl);
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

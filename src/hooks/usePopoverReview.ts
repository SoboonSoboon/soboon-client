import { useQuery } from '@tanstack/react-query';
import { getPopoverReview } from '@/apis/meetings/getPopoverReview';
import { ReviewResponse } from '@/app/(main)/mypage/utils/review';

export const usePopoverReview = (userId: number) => {
  return useQuery<ReviewResponse>({
    queryKey: ['popReview', userId],
    queryFn: () => getPopoverReview(userId),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};

import { useQuery } from '@tanstack/react-query';
import { getPopoverReview } from '@/apis/meetings/getPopoverReview';
import { ReviewResponse } from '@/app/(main)/mypage/utils/review';
import { useAuthStore } from '@/apis/auth/hooks/authStore';

export const usePopoverReview = (userId: number) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return useQuery<ReviewResponse>({
    queryKey: ['popReview', userId],
    queryFn: () => getPopoverReview(userId),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    enabled: !!isLoggedIn,
  });
};

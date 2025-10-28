import { useQuery } from '@tanstack/react-query';
import { getReceivedReview } from '@/apis/mypage/getReview';
import { ReviewResponse } from '../../utils/review';

export const useReceivedReview = () => {
  return useQuery<ReviewResponse>({
    queryKey: ['reviews'],
    queryFn: getReceivedReview,
    retry: false, // 실패 시 재시도하지 않음
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};

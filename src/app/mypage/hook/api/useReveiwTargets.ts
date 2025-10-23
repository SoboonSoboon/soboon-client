import { getReviewTargets } from '@/apis/mypage/getReview';
import { useQuery } from '@tanstack/react-query';
import { ReviewerListData, ReviewTargetsResponse } from '../../utils/review';

export const useReviewTargets = (meetingId: number) => {
  return useQuery<ReviewTargetsResponse, Error, ReviewerListData[]>({
    queryKey: ['reviewTargets', meetingId],
    queryFn: () => getReviewTargets(meetingId),
    select: (data) => data.data.attendees,
    staleTime: 5 * 60 * 1000,
  });
};

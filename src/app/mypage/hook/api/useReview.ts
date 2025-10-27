import { useMutation, useQuery } from '@tanstack/react-query';
import {
  HostReviewRequest,
  ParticipantReviewRequest,
  ReviewerListData,
  ReviewTargetsResponse,
} from '../../utils/review';
import {
  postHostReview,
  postParticipantReview,
} from '@/apis/mypage/postReview';
import { getReviewTargets } from '@/apis/mypage/getReview';

export const useReviewTargets = (
  meetingId: number,
  enabled: boolean = true,
) => {
  return useQuery<
    ReviewTargetsResponse,
    Error,
    { attendees: ReviewerListData[]; eventId: number }
  >({
    queryKey: ['reviewTargets', meetingId],
    queryFn: () => getReviewTargets(meetingId),
    select: (data) => ({
      attendees: data.data.attendees,
      eventId: data.data.eventId,
    }),
    staleTime: 5 * 60 * 1000,
    enabled, // enabled 옵션 추가
  });
};

export const usePostHostReview = () => {
  return useMutation<
    { success: boolean; error?: string },
    Error,
    HostReviewRequest
  >({
    mutationFn: (data) => postHostReview(data),
  });
};

export const usePostParticipantReview = () => {
  return useMutation<
    { success: boolean; error?: string },
    Error,
    ParticipantReviewRequest
  >({
    mutationFn: (data) => postParticipantReview(data),
  });
};

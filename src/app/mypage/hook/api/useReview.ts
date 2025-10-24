import { getReviewTargets } from '@/apis/mypage/getReview';
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

export const useReviewTargets = (meetingId: number) => {
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
  });
};

export const usePostHostReview = () => {
  return useMutation<void, Error, HostReviewRequest>({
    mutationFn: (data) => postHostReview(data),
  });
};

export const usePostParticipantReview = () => {
  return useMutation<void, Error, ParticipantReviewRequest>({
    mutationFn: (data) => postParticipantReview(data),
  });
};

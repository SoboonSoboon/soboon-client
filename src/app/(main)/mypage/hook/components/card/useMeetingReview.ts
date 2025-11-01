import { useQueryClient } from '@tanstack/react-query';
import { mypageKeys } from '@/constants/queryKey';
import { ReviewKeyword } from '@/types/common';
import { useToast } from '@/components/Atoms/Toast/useToast';
import { useModal } from '@/components/Molecules/modal';
import {
  postHostReview,
  postParticipantReview,
} from '@/apis/mypage/postReview';
import { useReviewTargets } from '../../api/useReview';
import { MeetingItem } from '@/app/(main)/mypage/utils/mypageType';

/**
 * 미팅 카드의 리뷰 관련 로직을 담당하는 훅
 * - 리뷰 대상 데이터 가져오기
 * - 리뷰 모달 관리
 * - 리뷰 제출 처리
 */
export function useMeetingReview(
  meeting: MeetingItem,
  activeMainTab: 'host' | 'participate' | 'bookmark',
) {
  const queryClient = useQueryClient();
  const toast = useToast();

  // 리뷰 데이터 가져오기
  const {
    data: reviewTargetData,
    isLoading,
    error,
  } = useReviewTargets(meeting.groupId, meeting.status === 'COMPLETED');
  const reviewTargetList = reviewTargetData?.attendees || [];

  // 리뷰 모달 관리
  const reviewModal = useModal();

  // 리뷰 모달 열기
  const handleReviewModalOpen = () => {
    if (meeting.status === 'RECRUITING') return;
    reviewModal.open();
  };

  // 리뷰 제출 핸들러
  const handleReviewSubmit = async (
    targetUserId: number,
    selectedKeywords: ReviewKeyword[],
  ) => {
    const eventId = reviewTargetData?.eventId;
    if (!eventId) return;

    try {
      let result;

      if (activeMainTab === 'host') {
        result = await postHostReview({
          eventId,
          userId: targetUserId,
          selectedReviews: selectedKeywords,
        });
      } else {
        result = await postParticipantReview({
          eventId,
          userId: targetUserId,
          selectedReviews: selectedKeywords,
        });
      }

      if (result.success) {
        // 리뷰 제출 성공 후 캐시 무효화
        queryClient.invalidateQueries({
          queryKey: ['reviewTargets', meeting.groupId],
        });

        // 모든 대상 리뷰 완료 시에만 MyPage 리스트 무효화 (라벨 변경 목적)
        const isAllReviewedOptimistic = reviewTargetList.every(
          (step) => step.alreadyReviewed || step.attendeeId === targetUserId,
        );
        if (isAllReviewedOptimistic) {
          queryClient.invalidateQueries({ queryKey: mypageKeys.meetings() });
        }

        toast.success('리뷰해주셔서 감사합니다');

        // 참여자가 리뷰 제출 시 모달 닫기
        if (activeMainTab === 'participate') {
          reviewModal.close();
        }
      } else {
        toast.error(result.error || '리뷰 제출에 실패했습니다');
      }
    } catch (error) {
      console.error('Review submission error:', error);
      toast.error('리뷰 제출 중 오류가 발생했습니다');
    }
  };

  return {
    reviewModal,
    reviewTargetData,
    reviewTargetList,
    isLoading,
    error,
    handleReviewModalOpen,
    handleReviewSubmit,
  };
}

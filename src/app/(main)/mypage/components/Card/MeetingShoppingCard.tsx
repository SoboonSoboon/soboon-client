'use client';

import { MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/Molecules/Card/Card';

import { Button, StatusTag } from '@/components';
import { timeFormatter } from '@/utils';
import { useRouter } from 'next/navigation';

import {
  postHostReview,
  postParticipantReview,
} from '@/apis/mypage/postReview';
import { useQueryClient } from '@tanstack/react-query';
import { useModal } from '@/components/Molecules/modal';
import { ReviewKeyword } from '@/types/common';
import { useToast } from '@/components/Atoms/Toast/useToast';
import { useReviewTargets } from '../../hook/api/useReview';
import { ReviewModal } from '../ReviewModal';
import { MeetingItem } from '@/app/(main)/mypage/utils/mypageType';

// 모임 카드 컴포넌트
export const MeetingShoppingCard = ({
  meeting,
  activeMainTab,
}: {
  meeting: MeetingItem;
  activeMainTab: 'host' | 'participate' | 'bookmark';
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();

  // 완료된 모임에 대해서만 리뷰 대상 데이터를 가져옴
  const {
    data: reviewTargetData,
    isLoading,
    error,
  } = useReviewTargets(meeting.groupId, meeting.status === 'COMPLETED');
  const reviewTargetList = reviewTargetData?.attendees || [];

  // 지역표기
  const location = meeting.location.district;

  // 리뷰 모달 관리
  const reviewModal = useModal();

  // 리뷰 모달 열기 핸들러
  const handleReviewModalOpen = () => {
    if (meeting.status !== 'COMPLETED') return;
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
        // 리뷰 제출 성공 Toast 메시지
        toast.success('리뷰해주셔서 감사합니다');

        // 참여자가 리뷰 제출 시 모달 닫기
        if (activeMainTab === 'participate') {
          reviewModal.close();
        }
      } else {
        // 에러 처리
        toast.error(result.error || '리뷰 제출에 실패했습니다');
      }
    } catch (error) {
      console.error('Review submission error:', error);
      toast.error('리뷰 제출 중 오류가 발생했습니다');
    }
  };

  // 카드 클릭 핸들러
  const handleCardClick = () => {
    const category =
      meeting.category.toLowerCase() === 'dividing'
        ? 'sharing'
        : meeting.category.toLowerCase();
    router.push(`/${category}/${meeting.groupId}`);
  };

  return (
    <div className="flex-shrink-0">
      <Card
        className="border-gray-10 flex cursor-pointer break-inside-avoid flex-col gap-3 rounded-xl border p-6"
        onClick={handleCardClick}
      >
        <StatusTag status={meeting.status} />
        <CardContent className="flex flex-col gap-3">
          <CardTitle
            className="font-memomentKkukkkuk line-clamp-2"
            status={meeting.status as 'RECRUITING'}
          >
            {meeting.title}
          </CardTitle>
          <div className="text-text-sub2 flex items-center gap-1 text-sm">
            <span>작성자</span>
            <span>・</span>
            <span>{timeFormatter(meeting.createdAt)}</span>
          </div>
        </CardContent>
        <hr className="text-gray-10" />
        <CardFooter className="flex flex-col gap-3">
          <div className="text-text-sub2 flex items-center gap-1 text-sm">
            <MapPin className="size-4" />
            <p>{location}</p>
          </div>
          <Button
            variant={
              meeting.status === 'RECRUITING' ||
              meeting.status !== 'COMPLETED' ||
              (activeMainTab === 'participate' &&
                reviewTargetList[0]?.alreadyReviewed) ||
              (activeMainTab === 'host' &&
                reviewTargetList.every((step) => step.alreadyReviewed))
                ? 'filled'
                : 'outline'
            }
            label={
              meeting.status === 'RECRUITING'
                ? '모집중'
                : (activeMainTab === 'participate' &&
                      reviewTargetList[0]?.alreadyReviewed) ||
                    (activeMainTab === 'host' &&
                      reviewTargetList.every((step) => step.alreadyReviewed))
                  ? '리뷰완료'
                  : '리뷰하기'
            }
            className="flex !py-[9px]"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleReviewModalOpen();
            }}
            disabled={
              meeting.status === 'RECRUITING' ||
              meeting.status !== 'COMPLETED' ||
              (activeMainTab === 'participate' &&
                reviewTargetList[0]?.alreadyReviewed) ||
              (activeMainTab === 'host' &&
                reviewTargetList.every((step) => step.alreadyReviewed))
            }
          />
        </CardFooter>
      </Card>

      <ReviewModal
        modal={reviewModal}
        reviewTargetList={reviewTargetList}
        activeMainTab={activeMainTab}
        handleReviewSubmit={handleReviewSubmit}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

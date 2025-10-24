'use client';

import { Bookmark, MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
} from '@/components/Molecules/Card/Card';
import { MeetingItem } from '../utils/mypageType';
import { Button, StatusTag } from '@/components';
import { cn } from '@/utils/cn';
import { timeFormatter } from '@/utils/timeFormetter';
import { useRouter } from 'next/navigation';

import { ReviewModal } from './ReviewModal';
import {
  useReviewTargets,
  usePostHostReview,
  usePostParticipantReview,
} from '../hook/api/useReview';
import { useQueryClient } from '@tanstack/react-query';
import { useModal } from '@/components/Molecules/modal';
import { ReviewKeyword } from '@/types/common';
import { useToast } from '@/components/Atoms/Toast/useToast';

// 모임 카드 컴포넌트
export const MeetingCard = ({
  meeting,
  activeMainTab,
}: {
  meeting: MeetingItem;
  activeMainTab: 'host' | 'participate';
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    data: reviewTargetData,
    isLoading,
    error,
  } = useReviewTargets(meeting.groupId);
  const reviewTargetList = reviewTargetData?.attendees || [];

  // 지역표기
  const location = meeting.location.district;

  // 리뷰 모달 관리
  const reviewModal = useModal();

  // 리뷰 제출 훅들
  const postHostReview = usePostHostReview();
  const postParticipantReview = usePostParticipantReview();

  // 리뷰 제출 핸들러
  const handleReviewSubmit = (
    targetUserId: number,
    selectedKeywords: ReviewKeyword[],
  ) => {
    const eventId = reviewTargetData?.eventId;
    if (!eventId) return;

    if (activeMainTab === 'host') {
      postHostReview.mutate(
        {
          eventId,
          userId: targetUserId,
          selectedReviews: selectedKeywords,
        },
        {
          onSuccess: () => {
            // 리뷰 제출 성공 후 캐시 무효화
            queryClient.invalidateQueries({
              queryKey: ['reviewTargets', meeting.groupId],
            });
            // 리뷰 제출 성공 Toast 메시지
            toast.success('리뷰해주셔서 감사합니다');
          },
        },
      );
    } else {
      postParticipantReview.mutate(
        {
          eventId,
          userId: targetUserId,
          selectedReviews: selectedKeywords,
        },
        {
          onSuccess: () => {
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
          },
        },
      );
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
    <div className="w-[calc(33.333%-21.33px)] flex-shrink-0">
      <Card
        width="100%"
        height="384px"
        className="cursor-pointer overflow-hidden bg-white"
        onClick={handleCardClick}
      >
        <CardContent>
          <div className="pb-5">
            <div className="absolute top-4 left-0 z-10 w-full px-3">
              <div className="flex items-center justify-between">
                <StatusTag
                  status={meeting.status}
                  className="!mx-0 h-8 whitespace-nowrap"
                />
                <Bookmark className="fill-gray-40 text-gray-40 size-5 border-none" />
              </div>
            </div>
            {/* 이미지 영역 */}
            {meeting.thumbnailUrl ? (
              <div className="relative h-[199px] w-full rounded-lg">
                <CardImage
                  src={meeting.thumbnailUrl}
                  alt={meeting.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-gray-5 border-gray-10 relative h-[199px] w-full rounded-lg border" />
            )}
          </div>
          {/* 컨텐츠 영역 */}
          <div className="flex flex-col gap-3">
            {/* 제목 */}
            <div className="flex flex-col">
              <CardTitle className={cn('line-clamp-1 !text-xl')}>
                {meeting.title}
              </CardTitle>
              {/* 사용자 정보와 시간 */}
              <div className="flex items-center gap-1">
                <span className="text-text-sub2 text-sm">작성자</span>
                <span className="text-text-sub2 w-4 text-center text-sm">
                  •
                </span>
                <span className="text-text-sub2 text-sm">
                  {timeFormatter(meeting.createdAt)}
                </span>
              </div>
            </div>
            <hr className="text-gray-10" />
            <CardFooter className="flex h-6 flex-col gap-3">
              <div className="flex items-center">
                <MapPin className="ring-gray-40 tex size-5" />
                <span className="text-sm">{location}</span>
              </div>
              <Button
                variant={
                  meeting.status === 'RECRUITING' ||
                  reviewTargetList.length === 0 ||
                  (activeMainTab === 'participate' &&
                    reviewTargetList[0]?.alreadyReviewed) ||
                  (activeMainTab === 'host' &&
                    reviewTargetList.every((step) => step.alreadyReviewed))
                    ? 'filled'
                    : 'outline'
                }
                label={
                  meeting.status === 'RECRUITING' ||
                  reviewTargetList.length === 0
                    ? '모집중'
                    : (activeMainTab === 'participate' &&
                          reviewTargetList[0]?.alreadyReviewed) ||
                        (activeMainTab === 'host' &&
                          reviewTargetList.every(
                            (step) => step.alreadyReviewed,
                          ))
                      ? '리뷰완료'
                      : '리뷰하기'
                }
                className="flex !py-[9px]"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  reviewModal.open();
                }}
                disabled={
                  meeting.status === 'RECRUITING' ||
                  reviewTargetList.length === 0 ||
                  (activeMainTab === 'participate' &&
                    reviewTargetList[0]?.alreadyReviewed) ||
                  (activeMainTab === 'host' &&
                    reviewTargetList.every((step) => step.alreadyReviewed))
                }
              />
            </CardFooter>
          </div>
        </CardContent>
      </Card>

      <ReviewModal
        modal={reviewModal}
        reviewTargetList={reviewTargetList}
        activeMainTab={activeMainTab}
        isLoading={isLoading}
        error={error}
        handleReviewSubmit={handleReviewSubmit}
      />
    </div>
  );
};

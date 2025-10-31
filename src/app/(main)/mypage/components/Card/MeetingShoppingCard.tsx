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
import { MeetingItem } from '../../utils/mypageType';
import { useMeetingCardActions } from '../../hook/components/card/useMeetingCardActions';
import { ReviewModal } from '../ReviewModal';

// 모임 카드 컴포넌트
export const MeetingShoppingCard = ({
  meeting,
  activeMainTab,
}: {
  meeting: MeetingItem;
  activeMainTab: 'host' | 'participate' | 'bookmark';
}) => {
  // 카드의 모든 액션 (리뷰 + 네비게이션)
  const {
    reviewModal,
    reviewTargetList,
    isLoading,
    error,
    handleReviewModalOpen,
    handleReviewSubmit,
    handleCardClick,
  } = useMeetingCardActions(meeting, activeMainTab);

  // 지역표기
  const location = meeting.location.district;

  return (
    <div className="flex-shrink-0">
      <Card
        className="border-gray-10 flex cursor-pointer break-inside-avoid flex-col gap-3 rounded-xl border p-6"
        onClick={handleCardClick}
      >
        <StatusTag status={meeting.status} />
        <CardContent className="flex flex-col gap-3">
          <header className="flex flex-col gap-1">
            <CardTitle
              className="font-memomentKkukkkuk line-clamp-2"
              status={meeting.status as 'RECRUITING'}
            >
              {meeting.title}
            </CardTitle>
            <div className="flex w-full items-center justify-between text-sm">
              <p className="text-text-sub2 flex items-center gap-1">
                <span>작성자</span>
                <span>・</span>
                <time dateTime={meeting.createdAt}>
                  {timeFormatter(meeting.createdAt)}
                </time>
              </p>
              <span id="참여자인원수" className="text-text-sub2">
                참여자 {reviewTargetList.length + 1}명
              </span>
            </div>
          </header>
        </CardContent>
        <hr className="text-gray-10" />
        <CardFooter className="flex flex-col gap-3">
          <div className="text-text-sub2 flex items-center gap-1 text-sm">
            <MapPin className="size-4" />
            <p>{location}</p>
          </div>
          {(() => {
            const isRecruiting = meeting.status === 'RECRUITING';
            const reviewedCount = meeting.reviewStatus?.reviewedCount ?? 0;
            const totalCount = meeting.reviewStatus?.totalCount ?? 0;
            const isAllReviewed = totalCount > 0 && reviewedCount >= totalCount;

            const variant = isAllReviewed ? 'outline' : ('filled' as const);
            const label = isRecruiting
              ? '모집중'
              : isAllReviewed
                ? '완료한 리뷰 보기'
                : activeMainTab === 'participate'
                  ? '주최자 리뷰하기'
                  : '리뷰하기';

            return (
              <Button
                variant={variant}
                label={label}
                className="flex !py-[9px]"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReviewModalOpen();
                }}
                disabled={isRecruiting}
              />
            );
          })()}
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

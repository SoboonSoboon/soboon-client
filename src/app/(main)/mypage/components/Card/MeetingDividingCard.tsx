'use client';

import { MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
} from '@/components/Molecules/Card/Card';
import { Button, StatusTag } from '@/components';
import { cn, timeFormatter } from '@/utils';
import { MeetingItem } from '../../utils/mypageType';
import { useMeetingCardActions } from '../../hook/components/card/useMeetingCardActions';
import { ReviewModal } from '../ReviewModal';

// 모임 카드 컴포넌트
export const MeetingDividingCard = ({
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
        className="w-full cursor-pointer overflow-hidden bg-white"
        onClick={handleCardClick}
      >
        <CardContent>
          <div className="pb-5">
            <div className="absolute top-4 left-0 z-10 w-full px-3">
              <div className="flex items-center justify-start">
                <StatusTag status={meeting.status} />
              </div>
            </div>
            {/* 이미지 영역 */}
            <div className="border-gray-10 relative aspect-[3/2] w-full overflow-hidden rounded-lg border">
              <CardImage
                src={meeting.thumbnailUrl}
                alt={meeting.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
          {/* 컨텐츠 영역 */}
          <div className="flex flex-col gap-3">
            {/* 제목 + 메타 정보 */}
            <header className="flex flex-col gap-1">
              <CardTitle className={cn('line-clamp-1 !text-xl')}>
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
            <hr className="text-gray-10" />
            <CardFooter className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <MapPin className="text-gray-40 size-5" />
                <span className="text-sm">{location}</span>
              </div>
              {(() => {
                const isRecruiting = meeting.status === 'RECRUITING';
                const reviewedCount = meeting.reviewStatus?.reviewedCount ?? 0;
                const totalCount = meeting.reviewStatus?.totalCount ?? 0;
                const isAllReviewed =
                  totalCount > 0 && reviewedCount >= totalCount;

                const variant = isAllReviewed ? 'outline' : ('filled' as const);
                const label = isRecruiting
                  ? '모집중'
                  : isAllReviewed
                    ? '완료한 리뷰 보기'
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
          </div>
        </CardContent>
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

'use client';

import { MapPin } from '@/components/Atoms/icons';
import { StatusTag } from '@/components/Atoms';
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
} from '@/components/Molecules';
import { cn } from '@/utils';
import { MeetingItem } from '../../utils/mypageType';

import { ReviewModal } from '../ReviewModal';
import { MeetingCardInfo } from './shared/MeetingCardInfo';
import { MeetingCardReviewButton } from './shared/MeetingCardReviewButton';
import { useMeetingCardActions } from '../../hook/components/card/useMeetingCardActions';

// 모임 카드 컴포넌트
export const MeetingDividingCard = ({
  meeting,
  activeMainTab,
}: {
  meeting: MeetingItem;
  activeMainTab: 'host' | 'participate' | 'bookmark';
}) => {
  const {
    reviewModal,
    reviewTargetList,
    isLoading,
    error,
    handleReviewModalOpen,
    handleReviewSubmit,
    handleCardClick,
  } = useMeetingCardActions(meeting, activeMainTab);

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
            {/* 제목 + 정보 */}
            <header className="flex flex-col gap-1">
              <CardTitle className={cn('line-clamp-1 !text-xl')}>
                {meeting.title}
              </CardTitle>
              <MeetingCardInfo
                meeting={meeting}
                participantCount={reviewTargetList.length + 1}
              />
            </header>
            <hr className="text-gray-10" />
            <CardFooter className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <MapPin className="text-gray-40 size-5" />
                <span className="text-sm">{location}</span>
              </div>
              <MeetingCardReviewButton
                meeting={meeting}
                activeMainTab={activeMainTab}
                onReviewModalOpen={handleReviewModalOpen}
              />
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

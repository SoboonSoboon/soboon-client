'use client';

import { MapPin } from '@/components/Atoms/icons';
import { StatusTag } from '@/components/Atoms';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/Molecules';
import { MeetingItem } from '../../utils/mypageType';
import { useMeetingCardActions } from '../../hook/components/card/useMeetingCardActions';
import { ReviewModal } from '../ReviewModal';
import { MeetingCardInfo } from './shared/MeetingCardInfo';
import { MeetingCardReviewButton } from './shared/MeetingCardReviewButton';

export const MeetingShoppingCard = ({
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
            <MeetingCardInfo
              meeting={meeting}
              participantCount={reviewTargetList.length + 1}
            />
          </header>
        </CardContent>
        <hr className="text-gray-10" />
        <CardFooter className="flex flex-col gap-3">
          <div className="text-text-sub2 flex items-center gap-1 text-sm">
            <MapPin className="size-4" />
            <p>{location}</p>
          </div>
          <MeetingCardReviewButton
            meeting={meeting}
            activeMainTab={activeMainTab}
            onReviewModalOpen={handleReviewModalOpen}
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

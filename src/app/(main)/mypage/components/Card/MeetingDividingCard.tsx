'use client';

import Image from 'next/image';
import { MapPin } from '@/components/Atoms/icons';
import { StatusTag } from '@/components/Atoms';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/Molecules';
import { cn } from '@/utils';
import { MeetingItem } from '../../utils/mypageType';
import { useMeetingCardActions } from '../../hook/components/card/useMeetingCardActions';
import { ReviewModal } from '../ReviewModal';
import { MeetingCardInfo } from './shared/MeetingCardInfo';
import { MeetingCardReviewButton } from './shared/MeetingCardReviewButton';

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
            <div
              className="border-gray-10 bg-gray-10 relative w-full overflow-hidden rounded-lg border"
              style={{
                contain: 'layout',
                aspectRatio: '3/2',
                minHeight: 0,
              }}
            >
              <Image
                src={meeting.thumbnailUrl || '/images/notFound_image.png'}
                alt={meeting.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-0 transition-opacity duration-300"
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                }}
                onLoadingComplete={(img) => {
                  img.style.opacity = '1';
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                loading="lazy"
                quality={75}
                placeholder="empty"
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

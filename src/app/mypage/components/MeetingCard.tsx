'use client';

import { Bookmark, MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
} from '@/components/Molecules/Card/Card';
import { MeetingItem, reviewData } from '../utils/mypageType';
import { Button, StatusTag } from '@/components';
import { cn } from '@/utils/cn';
import { useModal } from '@/components/Molecules/modal';
import { ReviewModal } from './reviewModal/ReviewModal';
import { timeFormatter } from '@/utils/timeFormetter';
import { useRouter } from 'next/navigation';

// 모임 카드 컴포넌트
export const MeetingCard = ({
  meeting,
  activeMainTab,
}: {
  meeting: MeetingItem;
  activeMainTab: string;
}) => {
  const router = useRouter();
  // 지역표기
  const location = meeting.location.district;

  // 날짜 표기

  // const reviewListModal = useModal();
  const reviewModal = useModal({
    onOpen: () => console.log('참여자 리뷰 모달 열림'),
    onClose: () => console.log('참여자 리뷰 모달 닫힘'),
  });

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
            {/* 북마크 아이콘 - host 탭일 때 숨김 */}
            {activeMainTab !== 'host' && (
              <div className="absolute top-4 right-4 z-10">
                <Bookmark className="fill-gray-40 text-gray-40 size-5 border-none" />
              </div>
            )}
            <div className="absolute top-4 left-4 z-10">
              <StatusTag
                status={meeting.status}
                className="h-8 w-[61px] whitespace-nowrap"
              />
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
                  meeting.status === 'RECRUITING'
                    ? 'filled'
                    : reviewData.reviewer
                      ? 'outline'
                      : 'filled'
                }
                label={
                  meeting.status === 'RECRUITING'
                    ? '모집중'
                    : reviewData.reviewer
                      ? '리뷰하기'
                      : '리뷰완료'
                }
                className="flex !py-[9px]"
                size="small"
                onClick={() => {
                  if (meeting.status !== 'RECRUITING') {
                    reviewModal.open();
                  }
                }}
                disabled={meeting.status === 'RECRUITING'}
              />
            </CardFooter>
          </div>
        </CardContent>
      </Card>

      {/* ✅ 참여자 리뷰 모달 */}
      {reviewModal.isOpen && (
        <ReviewModal
          modal={reviewModal}
          meetingId={reviewData.meetingId}
          targetUser={reviewData.targets}
          category={reviewData.category}
        />
      )}
    </div>
  );
};

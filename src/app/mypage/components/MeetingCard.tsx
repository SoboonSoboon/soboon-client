'use client';
import { Bookmark, MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
} from '@/components/Molecules/Card/Card';
import { MeetingData, reviewData } from './mock';
import { Button, StatusTag } from '@/components';
import { cn } from '@/utils/cn';
import { useModal } from '@/components/Molecules/modal';
import { ReviewModal } from './reviewModal/ReviewModal';

// 모임 카드 컴포넌트
export const MeetingCard = ({ meeting }: { meeting: MeetingData }) => {
  // 지역표기
  const location = meeting.location.district;

  // 날짜 표기
  const getRelativeTime = (dateString: string): string => {
    const now = new Date();
    const targetDate = new Date(dateString);
    const diffInMs = now.getTime() - targetDate.getTime();

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInMinutes < 60) {
      return diffInMinutes < 1 ? '방금 전' : `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else if (diffInWeeks <= 4) {
      // 4주 이하까지는 상대적 시간
      return `${diffInWeeks}주 전`;
    } else {
      // 4주 초과부터는 날짜로 표시
      return targetDate.toLocaleDateString('ko-KR');
    }
  };
  // const reviewListModal = useModal();
  const reviewModal = useModal({
    onOpen: () => console.log('참여자 리뷰 모달 열림'),
    onClose: () => console.log('참여자 리뷰 모달 닫힘'),
  });

  return (
    <>
      <div className="w-[calc(33.333%-21.33px)] flex-shrink-0">
        <Card width="100%" height="326px" className="overflow-hidden bg-white">
          <CardContent>
            <div className="pb-5">
              {/* 북마크 아이콘 */}
              <div className="absolute top-4 right-4 z-10">
                <Bookmark className="fill-gray-40 text-gray-40 size-5 border-none" />
              </div>
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
                    {getRelativeTime(meeting.createdAt)}
                  </span>
                </div>
              </div>
              <hr className="text-gray-10" />
              <CardFooter className="flex h-6 justify-between">
                <div className="flex items-center">
                  <MapPin className="ring-gray-40 tex size-5" />
                  <span className="text-sm">{location}</span>
                </div>
                <Button
                  primary={true}
                  label="리뷰확정"
                  className="flex !py-0"
                  onClick={() => reviewModal.open()}
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
            userRole={reviewData.userRole}
            targetUser={reviewData.targets}
            category={reviewData.category}
          />
        )}
      </div>
    </>
  );
};

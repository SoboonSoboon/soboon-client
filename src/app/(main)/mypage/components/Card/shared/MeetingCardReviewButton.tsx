import { Button } from '@/components';
import { MeetingItem } from '../../../utils/mypageType';

interface MeetingCardReviewButtonProps {
  meeting: MeetingItem;
  activeMainTab: 'host' | 'participate' | 'bookmark';
  onReviewModalOpen: () => void;
}

// 리뷰 버튼 (로직 포함)
export const MeetingCardReviewButton = ({
  meeting,
  activeMainTab,
  onReviewModalOpen,
}: MeetingCardReviewButtonProps) => {
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
      aria-label={label}
      className="flex !py-[9px]"
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        onReviewModalOpen();
      }}
      disabled={isRecruiting}
    />
  );
};

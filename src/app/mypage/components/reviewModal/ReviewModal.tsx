import { Modal } from '@/components/Molecules/modal';
import { ReviewKeyword } from '@/types/common';
import { useState } from 'react';
import { ReviewerListData } from '../../utils/review';
import { ReviewModalHeader } from './ReviewModalHeader';
import { ReviewModalContent } from './ReviewModalContent';
import { ReviewModalFooter } from './ReviewModalFooter';

interface ReviewModal {
  modal: {
    isOpen: boolean;
    close: () => void;
  };
  meetingId: number;
  targetUser: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
  };
  category: 'DIVIDING' | 'SHOPPING';
  reviewSteps: ReviewerListData[];
  currentStepIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  activeMainTab: string;
}
export const ReviewModal = ({
  modal,
  meetingId,
  targetUser,
  category,
  reviewSteps,
  currentStepIndex,
  onNext,
  onPrevious,
  activeMainTab,
}: ReviewModal) => {
  const [selectedKeywords, setSelectedKeywords] = useState<ReviewKeyword[]>([]);
  const getAvailableKeywords = (): ReviewKeyword[] => {
    const baseKeywords: ReviewKeyword[] = [
      'TIME_PROMISE',
      'KIND_AND_CARING',
      'FAST_RESPONSE',
    ];

    if (category === 'DIVIDING') {
      return [...baseKeywords, 'SAME_AS_PHOTO'];
    } else {
      return [...baseKeywords, 'GOOD_DISTRIBUTION'];
    }
  };
  const availableKeywords = getAvailableKeywords();

  const handleKeywordToggle = (keyword: ReviewKeyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((data) => data !== keyword)
        : [...prev, keyword],
    );
  };
  const handleSubmit = () => {
    console.log('submit', {
      eventId: meetingId,
      userId: targetUser.userId,
      selectedReviews: selectedKeywords,
    });
    modal.close();
  };

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={modal.close}
      className="z-50"
      contentClassName="!h-[436px] !w-[699px] rounded-3xl p-[52px]"
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-8">
          <ReviewModalHeader
            activeMainTab={activeMainTab}
            currentStepIndex={currentStepIndex}
            reviewStepsLength={reviewSteps.length}
          />

          <ReviewModalContent
            targetUser={targetUser}
            availableKeywords={availableKeywords}
            selectedKeywords={selectedKeywords}
            onKeywordToggle={handleKeywordToggle}
          />
        </div>

        <ReviewModalFooter
          currentStepIndex={currentStepIndex}
          reviewSteps={reviewSteps}
          onNext={onNext}
          onPrevious={onPrevious}
          onSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

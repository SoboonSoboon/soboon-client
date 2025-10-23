import { ReviewerListData } from '../../utils/review';
import { ReviewButtonSection } from './Button/ReviewButtonSection';

interface ReviewModalFooterProps {
  currentStepIndex: number;
  reviewSteps: ReviewerListData[];
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export const ReviewModalFooter = ({
  currentStepIndex,
  reviewSteps,
  onNext,
  onPrevious,
  onSubmit,
}: ReviewModalFooterProps) => {
  return (
    <div className="flex flex-col gap-10">
      <ReviewButtonSection
        currentStepIndex={currentStepIndex}
        reviewSteps={reviewSteps}
        onNext={onNext}
        onPrevious={onPrevious}
        onSubmit={onSubmit}
      />
    </div>
  );
};

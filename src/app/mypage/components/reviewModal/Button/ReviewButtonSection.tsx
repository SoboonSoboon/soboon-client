import { ReviewerListData } from '@/app/mypage/utils/review';
import { getReviewButtonConfig } from '@/app/mypage/utils/reviewButtons';
import { Button } from '@/components';

interface ReviewButtonSectionProps {
  currentStepIndex: number;
  reviewSteps: ReviewerListData[];
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export const ReviewButtonSection = ({
  currentStepIndex,
  reviewSteps,
  onNext,
  onPrevious,
  onSubmit,
}: ReviewButtonSectionProps) => {
  const config = getReviewButtonConfig(currentStepIndex, reviewSteps);

  switch (config.type) {
    case 'submit-only':
      return (
        <Button
          label={config.label}
          className="w-full py-3"
          onClick={onSubmit}
          variant="filled"
        />
      );
    case 'next-only':
      return (
        <Button
          variant="outline"
          label={config.label}
          className="w-full py-3"
          onClick={onNext}
        />
      );
    case 'prev-next':
      return (
        <div className="flex gap-3">
          <Button
            label={config.prevLabel}
            variant="outline"
            className="flex-1 py-3"
            onClick={onPrevious}
          />
          <Button
            label={config.nextLabel}
            className="flex-1 py-3"
            onClick={onNext}
          />
        </div>
      );
    case 'prev-submit':
      return (
        <div className="flex gap-3">
          <Button
            label={config.prevLabel}
            variant="outline"
            className="flex-1 !py-3"
            onClick={onPrevious}
          />
          <Button
            label={config.label}
            className="flex-1 !py-3"
            onClick={onSubmit}
          />
        </div>
      );
    default:
      return null;
  }
};

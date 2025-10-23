import { ReviewerListData } from '../utils/review';

interface ButtonConfig {
  type: 'submit-only' | 'next-only' | 'prev-next' | 'prev-submit';
  label?: string;
  prevLabel?: string;
  nextLabel?: string;
}

export const getReviewButtonConfig = (
  currentStepIndex: number,
  reviewSteps: ReviewerListData[],
): ButtonConfig => {
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === reviewSteps.length - 1;
  const hasMultipleSteps = reviewSteps.length > 1;

  // 단일 단계인 경우 제출 버튼만 표시
  if (!hasMultipleSteps) {
    return { type: 'submit-only', label: '제출' };
  }

  // 첫 번째 단계인 경우 다음 버튼만 표시
  if (isFirstStep) {
    return { type: 'next-only', label: '다음' };
  }

  // 마지막 단계인 경우 이전과 제출 버튼을 반반으로
  if (isLastStep) {
    return { type: 'prev-submit', prevLabel: '이전', label: '제출' };
  }

  // 중간 단계인 경우 이전과 다음 버튼을 반반으로
  return { type: 'prev-next', prevLabel: '이전', nextLabel: '다음' };
};

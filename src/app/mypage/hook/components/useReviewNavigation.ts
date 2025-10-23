'use client';
import { useState } from 'react';
import { ReviewerListData } from '../../utils/review';

export const useReviewNavigation = (reviewSteps: ReviewerListData[] = []) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // 다음 단계로 이동
  const handleNext = () => {
    if (currentStepIndex < reviewSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // 이전 단계로 이동
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return {
    currentStepIndex,
    setCurrentStepIndex,
    handleNext,
    handlePrevious,
  };
};

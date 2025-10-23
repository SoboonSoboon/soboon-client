'use client';
import { useState } from 'react';
import { ReviewerListData } from '../utils/review';

export const useReviewNavigation = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const reviewSteps: ReviewerListData[] = [
    {
      attendeeId: 1,
      nickname: '홍길동',
      profileImageUrl: '',
      alreadyReviewed: false,
      host: false,
    },
    {
      attendeeId: 2,
      nickname: '김철수',
      profileImageUrl: '',
      alreadyReviewed: false,
      host: false,
    },
    {
      attendeeId: 3,
      nickname: '이영희',
      profileImageUrl: '',
      alreadyReviewed: false,
      host: false,
    },
  ];

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
    reviewSteps,
  };
};

import { Button, ProfileImg, StatusTag } from '@/components/Atoms';
import { ChevronDown, ChevronUp } from '@/components/Atoms/icons';
import { useState } from 'react';
import {
  ReviewerListData,
  getAvailableKeywords,
  getKeywordLabel,
  getKeywordClassName,
  getButtonClassName,
} from '../utils/review';
import { ReviewKeyword } from '@/types/common';

interface ReviewModalContentProps {
  reviewTargetList: ReviewerListData[];
  handleReviewSubmit?: (
    targetUserId: number,
    selectedKeywords: ReviewKeyword[],
  ) => void;
  activeMainTab: 'host' | 'participate' | 'bookmark';
}

export const ReviewModalContent = ({
  reviewTargetList,
  handleReviewSubmit,
  activeMainTab,
}: ReviewModalContentProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<
    Record<number, ReviewKeyword[]>
  >({});
  const [submittedByIndex, setSubmittedByIndex] = useState<
    Record<number, boolean>
  >({});

  const handleItemClick = (index: number) => {
    if (activeMainTab !== 'host') return;
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleKeywordToggle = (index: number, keyword: ReviewKeyword) => {
    setSelectedKeywords((prev) => ({
      ...prev,
      [index]: prev[index]?.includes(keyword)
        ? prev[index].filter((k) => k !== keyword)
        : [...(prev[index] || []), keyword],
    }));
  };

  const handleSubmit = (index: number, attendeeId: number) => {
    const keywords = selectedKeywords[index] || [];
    if (keywords.length === 0) {
      alert('최소 하나의 리뷰 키워드를 선택해주세요.');
      return;
    }
    handleReviewSubmit?.(attendeeId, keywords);
    setSelectedKeywords((prev) => ({ ...prev, [index]: [] }));
    setSubmittedByIndex((prev) => ({ ...prev, [index]: true }));
  };

  const isKeywordSelected = (
    step: ReviewerListData,
    index: number,
    keyword: ReviewKeyword,
  ) =>
    step.alreadyReviewed
      ? (step.selectedKeywords?.includes(keyword) ?? false)
      : (selectedKeywords[index]?.includes(keyword) ?? false);

  const availableKeywords = getAvailableKeywords(activeMainTab);

  return (
    <div className="border-gray-10 flex flex-col overflow-y-auto border-y">
      {reviewTargetList.map((step, index) => (
        <div
          key={index}
          className="border-gray-10 flex flex-col border-b last:border-b-0"
        >
          <div
            className="flex cursor-pointer justify-between py-5"
            onClick={() => activeMainTab === 'host' && handleItemClick(index)}
          >
            <div className="flex items-center gap-3">
              <ProfileImg
                profileImageUrl={step.profileImageUrl}
                size={40}
                className="rounded-full"
              />
              <span className="font-memomentKkukkkuk font-regular">
                {step.nickname}
              </span>
              <StatusTag
                className="!mx-0"
                status={step.alreadyReviewed ? 'ReviewClosed' : 'ReviewOpen'}
              />
            </div>
            {activeMainTab === 'host' && (
              <button
                className="flex cursor-pointer items-center"
                aria-label="리뷰 확장 버튼"
              >
                {expandedIndex === index ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </button>
            )}
          </div>

          {((activeMainTab === 'host' && expandedIndex === index) ||
            activeMainTab !== 'host') && (
            <div className="flex flex-col gap-5 pb-5">
              <div className="flex flex-wrap gap-3">
                {availableKeywords.map((keyword) => {
                  const isSelected = isKeywordSelected(step, index, keyword);

                  return step.alreadyReviewed ? (
                    <div
                      key={keyword}
                      className={getKeywordClassName(isSelected)}
                    >
                      {getKeywordLabel(keyword)}
                    </div>
                  ) : (
                    <button
                      key={keyword}
                      aria-label={keyword}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleKeywordToggle(index, keyword);
                      }}
                      className={getButtonClassName(isSelected)}
                    >
                      {getKeywordLabel(keyword)}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end">
                <Button
                  variant="filled"
                  aria-label="리뷰 제출 버튼"
                  disabled={step.alreadyReviewed || submittedByIndex[index]}
                  className="rounded-8px w-[133px] !py-2.5"
                  onClick={() => handleSubmit(index, step.attendeeId)}
                >
                  {step.alreadyReviewed || submittedByIndex[index]
                    ? '리뷰 완료'
                    : '제출'}
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

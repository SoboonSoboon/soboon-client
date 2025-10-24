import { Button, ProfileImg, StatusTag } from '@/components';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { ReviewKeyword } from '@/types/common';
import { ReviewerListData } from '../../utils/review';

interface TargetUserModalContentProps {
  reviewTargetList: ReviewerListData[];
  handleReviewSubmit?: (
    targetUserId: number,
    selectedKeywords: ReviewKeyword[],
  ) => void;
  activeMainTab: 'host' | 'participate';
}

export const TargetUserModalContent = ({
  reviewTargetList,
  handleReviewSubmit,
  activeMainTab,
}: TargetUserModalContentProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<
    Record<number, ReviewKeyword[]>
  >({});

  const availableKeywords: ReviewKeyword[] = [
    'TIME_PROMISE',
    'KIND_AND_CARING',
    'FAST_RESPONSE',
    activeMainTab === 'host' ? 'SAME_AS_PHOTO' : 'GOOD_DISTRIBUTION',
  ];

  const keywordLabels = {
    TIME_PROMISE: '시간 약속을 잘 지켜요',
    KIND_AND_CARING: '친절하고 배려가 넘쳐요',
    FAST_RESPONSE: '응답이 빨라요',
    SAME_AS_PHOTO: '소분이 사진, 설명과 동일해요',
    GOOD_DISTRIBUTION: '적절하게 잘 분배했어요',
  };

  const handleItemClick = (index: number) => {
    if (activeMainTab !== 'host') return;
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleKeywordToggle = (index: number, keyword: ReviewKeyword) => {
    setSelectedKeywords((prev) => ({
      ...prev,
      [index]: prev[index]?.includes(keyword)
        ? prev[index].filter((k) => k !== keyword)
        : [...(prev[index] || []), keyword],
    }));
  };

  function handleSubmit(index: number, attendeeId: number): void {
    const keywords = selectedKeywords[index] || [];
    if (keywords.length === 0) {
      alert('최소 하나의 리뷰 키워드를 선택해주세요.');
      return;
    }
    handleReviewSubmit?.(attendeeId, keywords);
    setExpandedIndex(null);
    setSelectedKeywords((prev) => ({
      ...prev,
      [index]: [],
    }));
  }

  return (
    <div className="border-gray-10 flex flex-col overflow-y-auto border-y">
      {reviewTargetList.map((step, index) => (
        <div
          key={index}
          className="border-gray-10 flex flex-col gap-5 border-b py-5 last:border-b-0"
        >
          <div
            className="flex cursor-pointer justify-between"
            onClick={() => {
              if (activeMainTab === 'host' && !step.alreadyReviewed) {
                handleItemClick(index);
              }
            }}
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
            <div className="flex items-center">
              {activeMainTab === 'host' && (
                <button className="flex">
                  {expandedIndex === index ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* 드롭다운 내용 */}
          {((activeMainTab === 'host' && expandedIndex === index) ||
            activeMainTab !== 'host') && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-3">
                {availableKeywords.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => handleKeywordToggle(index, keyword)}
                    className={`cursor-pointer rounded-lg px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                      selectedKeywords[index]?.includes(keyword)
                        ? 'bg-Green-5'
                        : 'bg-gray-5'
                    }`}
                  >
                    {keywordLabels[keyword]}
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  variant="filled"
                  disabled={step.alreadyReviewed}
                  className="rounded-8px w-[133px] !py-2.5"
                  onClick={() => handleSubmit(index, step.attendeeId)}
                >
                  {step.alreadyReviewed ? '리뷰 완료' : '제출'}
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

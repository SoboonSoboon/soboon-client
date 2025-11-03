'use client';

import { useState, useMemo } from 'react';
import { ReviewItemBar } from '@/components/Atoms';
import { ChevronDown, ChevronUp } from '@/components/Atoms/icons';
import { REVIEW_KEYWORD_LABELS } from '@/constants';
import { ReviewKeyword } from '../../utils/review';

interface ReviewSectionProps {
  keywords: ReviewKeyword[];
}

export const ReviewSection = ({ keywords }: ReviewSectionProps) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const allKeywords = Object.keys(REVIEW_KEYWORD_LABELS) as Array<
    keyof typeof REVIEW_KEYWORD_LABELS
  >;

  // 키워드별 개수 가져오기
  const getCountForKeyword = (keyword: keyof typeof REVIEW_KEYWORD_LABELS) => {
    return keywords.find((k) => k.keyword === keyword)?.count ?? 0;
  };

  // 최대 개수 계산 - 실제 최고값보다 20% 높게
  const maxCount = useMemo(() => {
    const realMax = Math.max(...keywords.map((k) => k.count ?? 0), 0);
    return realMax * 1.25;
  }, [keywords]);

  // 전체 리뷰 개수 계산
  const totalReviewCount = useMemo(() => {
    return keywords.reduce((sum, keyword) => sum + (keyword.count ?? 0), 0);
  }, [keywords]);

  return (
    <>
      {/* md 미만: 드롭다운 형식 */}
      <div className="md:hidden">
        <button
          onClick={() => setIsReviewOpen(!isReviewOpen)}
          className="flex w-full items-center justify-between rounded-lg text-left transition-colors"
          aria-expanded={isReviewOpen}
          aria-label={isReviewOpen ? '받은 리뷰 접기' : '받은 리뷰 보기'}
          type="button"
        >
          <span className="flex gap-1">
            내가 받은 리뷰 <p className="text-primary">{totalReviewCount}</p>
          </span>
          {isReviewOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>

        {isReviewOpen && (
          <div className="mt-5 flex flex-col gap-4 rounded-lg">
            {allKeywords.map((keyword) => (
              <ReviewItemBar
                key={keyword}
                count={getCountForKeyword(keyword)}
                maxCount={maxCount}
                label={REVIEW_KEYWORD_LABELS[keyword]}
              />
            ))}
          </div>
        )}
      </div>

      {/* md 이상: 전체 리뷰 목록 표시 */}
      <div className="hidden flex-col gap-3 md:flex">
        {allKeywords.map((keyword) => (
          <ReviewItemBar
            key={keyword}
            count={getCountForKeyword(keyword)}
            maxCount={maxCount}
            label={REVIEW_KEYWORD_LABELS[keyword]}
          />
        ))}
      </div>
    </>
  );
};

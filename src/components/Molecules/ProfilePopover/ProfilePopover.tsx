'use client';

import { useState, useRef, useEffect } from 'react';
import { ProfileImg, ReviewItemBar } from '@/components';
import { cn } from '@/utils/cn';
import { useReviewStats } from '@/hooks';
import { REVIEW_KEYWORD_LABELS } from '@/constants';
import { ReviewKeywordString } from '@/app/(main)/mypage/utils/review';

interface ProfilePopoverProps {
  nickname: string;
  profileImage: string;
  keywords: Array<{ keyword: string; count?: number }>;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const ProfilePopover = ({
  nickname,
  profileImage,
  keywords,
  children,
  className,
  contentClassName,
}: ProfilePopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);

  const { maxCount, getCountForKeyword } = useReviewStats({
    reviewKeywords: keywords,
  });

  // 공용으로 사용되는 3개 키워드만 표시
  const displayKeywords: ReviewKeywordString[] = [
    'KIND_AND_CARING',
    'TIME_PROMISE',
    'SAME_AS_PHOTO',
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // 외부 클릭 시 팝오버 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={cn('relative', className)}
      onClick={handleClick}
      ref={popoverRef}
    >
      {children}
      {isOpen && (
        <div
          className={cn(
            'animate-fade-in animate-slide-down absolute left-1/2 z-[50] -translate-x-1/2 duration-200',
            'top-full mt-2',
            contentClassName,
          )}
          ref={popoverContentRef}
        >
          <div className="border-gray-10 h-[417px] w-[340px] rounded-lg border bg-white">
            <div className="flex flex-col gap-5 p-8">
              {/* 프로필 영역 */}
              <div className="flex flex-col items-center justify-center gap-2.5">
                <ProfileImg profileImageUrl={profileImage} size={120} />
                <span className="text-memomentKkukkkuk text-gray-95 text-2xl">
                  {nickname}
                </span>
              </div>

              {/* 평가 항목 */}
              <div className="flex flex-col gap-4">
                {displayKeywords.map((keyword) => (
                  <ReviewItemBar
                    key={keyword}
                    count={getCountForKeyword(keyword)}
                    maxCount={maxCount}
                    label={REVIEW_KEYWORD_LABELS[keyword]}
                    animated={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

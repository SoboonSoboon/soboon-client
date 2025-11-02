'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { isAxiosError } from 'axios';
import { MypageHeader, CardList } from '@/app/(main)/mypage/components';

import {
  MyPageEmptyState,
  ErrorPage,
  ServerErrorPage,
} from '@/components/Molecules';
import {
  DividingCardSkeleton,
  ShoppingCardSkeleton,
} from './components/card/CardSkeleton';

import { useMyPageData } from './hook/components/page/useMypageData';

function MyPageContent() {
  // 리뷰 완료 숨기기 상태
  const [hideCompletedReviews, setHideCompletedReviews] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const fetchLockRef = useRef(false);

  const {
    activeMainTab,
    activeSubTab,
    currentData,
    processedMeetingList,
    handleMainTabChange,
    handleSubTabChange,
  } = useMyPageData(hideCompletedReviews);

  const handleToggleHideCompletedReviews = (checked: boolean) => {
    setHideCompletedReviews(checked);
  };

  const hasNextPage = currentData.hasNextPage;
  const isFetchingNextPage = currentData.isFetchingNextPage;
  const pagesLength = currentData.data?.pages?.length ?? 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !fetchLockRef.current
        ) {
          fetchLockRef.current = true;
          currentData.fetchNextPage().finally(() => {
            fetchLockRef.current = false;
          });
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, pagesLength, currentData]);

  // 페이지 로드 완료 시점 부수효과 (콘솔 제거, 의존성은 유지)
  useEffect(() => {
    const pages = currentData.data?.pages;
    if (!pages || pages.length === 0) return;
  }, [pagesLength, hasNextPage, currentData]);

  return (
    <div className="w-full">
      <div className="flex flex-1 flex-col bg-white">
        <MypageHeader
          activeMainTab={activeMainTab}
          activeSubTab={activeSubTab}
          onMainTabChange={handleMainTabChange}
          onSubTabChange={handleSubTabChange}
          hideCompletedReviews={hideCompletedReviews}
          onToggleHideCompletedReviews={handleToggleHideCompletedReviews}
        />

        <div className="flex-1 pt-4 sm:pt-6">
          {currentData.loading ? (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
              {Array.from({ length: 6 }).map((_, index) =>
                activeSubTab === 'SHOPPING' ? (
                  <ShoppingCardSkeleton key={index} />
                ) : (
                  <DividingCardSkeleton key={index} />
                ),
              )}
            </div>
          ) : currentData.error ? (
            isAxiosError(currentData.error) &&
            (currentData.error.response?.status ?? 0) >= 500 ? (
              <ServerErrorPage />
            ) : (
              <ErrorPage />
            )
          ) : processedMeetingList.length === 0 ? (
            <MyPageEmptyState
              mainTab={activeMainTab}
              subTab={activeSubTab === 'SHOPPING' ? 'shopping' : 'dividing'}
            />
          ) : (
            <>
              <CardList
                data={processedMeetingList}
                activeMainTab={activeMainTab}
              />
              {/* 무한스크롤 트리거 - hasNextPage일 때만 렌더링 */}
              {currentData.hasNextPage && (
                <div ref={observerTarget} className="h-10" />
              )}
              {/* 로딩 인디케이터 */}
              {currentData.isFetchingNextPage && (
                <div className="flex items-center justify-center py-8">
                  <div className="border-gray-90 h-6 w-6 animate-spin rounded-full border-b-2"></div>
                  <p className="text-gray-60 ml-2">더 불러오는 중...</p>
                </div>
              )}
              {/* 완료 메시지 */}
              {!currentData.hasNextPage && !currentData.isFetchingNextPage && (
                <div className="flex items-center justify-center py-8">
                  <p className="text-gray-60 text-sm">
                    모든 모임을 불러왔어요 👋
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyPage() {
  return (
    <Suspense fallback={null}>
      <MyPageContent />
    </Suspense>
  );
}

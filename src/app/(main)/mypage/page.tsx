'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { MypageHeader, CardList } from '@/app/(main)/mypage/components';

import { EmptyState, ErrorPage } from '@/components/Molecules';

import { useMyPageData } from './hook/components/useMypageData';

function MyPageContent() {
  // 리뷰 완료 숨기기 상태
  const [hideCompletedReviews, setHideCompletedReviews] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const fetchLockRef = useRef(false);

  const {
    activeMainTab,
    activeSubTab,
    currentData,
    filteredData,
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
            <div className="flex items-center justify-center py-12 sm:py-20">
              <div className="text-center">
                <div className="border-gray-90 mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                <p className="text-gray-60">로딩 중...</p>
              </div>
            </div>
          ) : currentData.error ? (
            <ErrorPage />
          ) : filteredData.length === 0 ? (
            <EmptyState
              type="mypage"
              mainTab={activeMainTab}
              subTab={activeSubTab === 'SHOPPING' ? 'shopping' : 'dividing'}
            />
          ) : (
            <>
              <CardList data={filteredData} activeMainTab={activeMainTab} />
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
    <Suspense fallback={<div className="min-h-screen w-full bg-white" />}>
      <MyPageContent />
    </Suspense>
  );
}

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

  // 무한스크롤 감지 + 콘솔 로깅
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('[마이페이지/무한스크롤] Observer 트리거:', {
          isIntersecting: entries[0].isIntersecting,
          hasNextPage: currentData.hasNextPage,
          isFetchingNextPage: currentData.isFetchingNextPage,
          fetchLock: fetchLockRef.current,
        });

        if (
          entries[0].isIntersecting &&
          currentData.hasNextPage &&
          !currentData.isFetchingNextPage &&
          !fetchLockRef.current
        ) {
          const loadedPages = currentData.data?.pages?.length ?? 0;
          console.log('[마이페이지/무한스크롤] 다음 페이지 요청:', loadedPages);
          fetchLockRef.current = true;
          currentData.fetchNextPage().finally(() => {
            fetchLockRef.current = false;
          });
        } else if (
          entries[0].isIntersecting &&
          !currentData.hasNextPage &&
          !currentData.isFetchingNextPage
        ) {
          console.log('[마이페이지/무한스크롤] 모든 데이터 로드 완료');
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
  }, [currentData]);

  // 페이지 로드 완료 시점 로깅
  useEffect(() => {
    const pages = currentData.data?.pages;
    if (!pages || pages.length === 0) return;
    const last = pages[pages.length - 1];
    const sliceInfo = last.data.sliceInfo;
    console.log(
      '[마이페이지/무한스크롤] 페이지 로드 완료:',
      `현재까지 ${pages.length}페이지, 마지막 currentPage=${sliceInfo.currentPage}, hasNext=${sliceInfo.hasNext}`,
    );
    console.log(
      '[마이페이지/무한스크롤] React Query hasNextPage:',
      currentData.hasNextPage,
    );
    if (!sliceInfo.hasNext) {
      console.log('[마이페이지/무한스크롤] 더 이상 로드할 페이지가 없습니다.');
    }
  }, [currentData.data?.pages?.length, currentData.hasNextPage]);

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

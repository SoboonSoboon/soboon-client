'use client';

import { Suspense, useState } from 'react';
import { MypageHeader, CardList } from '@/app/(main)/mypage/components';
import { EmptyState, ErrorPage } from '@/components/Molecules';

import { useMyPageData } from './hook/components/useMypageData';

function MyPageContent() {
  // 리뷰 완료 숨기기 상태
  const [hideCompletedReviews, setHideCompletedReviews] = useState(false);

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
            <CardList data={filteredData} activeMainTab={activeMainTab} />
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

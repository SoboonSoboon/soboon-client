'use client';

import { Suspense } from 'react';
import { TabSection, CardList } from '@/app/mypage/components';

import { useMyPageData } from './hook/components/useMypageData';

function MyPageContent() {
  const {
    activeMainTab,
    activeSubTab,
    currentData,
    filteredData,
    handleMainTabChange,
    handleSubTabChange,
  } = useMyPageData();
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-1 flex-col bg-white">
        <TabSection
          activeMainTab={activeMainTab}
          activeSubTab={activeSubTab}
          onMainTabChange={handleMainTabChange}
          onSubTabChange={handleSubTabChange}
        />

        <div className="flex-1 pt-6">
          {currentData.loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="border-gray-90 mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                <p className="text-gray-60">로딩 중...</p>
              </div>
            </div>
          ) : currentData.error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <h2 className="mb-2 text-xl font-bold text-red-500">
                  데이터를 불러올 수 없습니다
                </h2>
                <p className="text-gray-60 mb-4">{currentData.error.message}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="hover:bg-blue-60 rounded bg-blue-700 px-4 py-2 text-white"
                >
                  다시 시도
                </button>
              </div>
            </div>
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

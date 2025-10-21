'use client';

import { Suspense } from 'react';
import {
  TabSection,
  MainTabType,
  SubTabType,
  CardList,
} from '@/app/mypage/components';
import { storage } from './components/mock';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useBookmarkMeetingList,
  useHostMeetingList,
  useParticipateMeetingList,
} from './hook/useMeetings';

function MyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeMainTab = (searchParams.get('main') as MainTabType) || 'created';
  const activeSubTab =
    (searchParams.get('sub')?.toUpperCase() as SubTabType) || 'SHOPPING';

  const {
    data: hostData,
    isLoading: hostLoading,
    error: hostError,
  } = useHostMeetingList(1, 20);
  const {
    data: participateData,
    isLoading: participateLoading,
    error: participateError,
  } = useParticipateMeetingList(1, 20);
  const {
    data: bookmarkData,
    isLoading: bookmarkLoading,
    error: bookmarkError,
  } = useBookmarkMeetingList(1, 20);
  //데이터 변경

  // 현재 탭에 따른 데이터 선택
  const getCurrentData = () => {
    switch (activeMainTab) {
      case 'host':
        return { data: hostData, loading: hostLoading, error: hostError };
      case 'participate':
        return {
          data: participateData,
          loading: participateLoading,
          error: participateError,
        };
      case 'bookmark':
        return {
          data: bookmarkData,
          loading: bookmarkLoading,
          error: bookmarkError,
        };
      default:
        return { data: hostData, loading: hostLoading, error: hostError };
    }
  };
  const {
    data: currentData,
    loading: currentLoading,
    error: currentError,
  } = getCurrentData();

  const getFilteredData = () => {
    if (!currentData) return [];

    return currentData
      .filter((meeting) => meeting.category === activeSubTab)
      .map((item) => ({
        groupId: item.groupId,
        title: item.title,
        category: item.category,
        status: item.status,
        usageStatus: item.usageStatus,
        location: item.location,
        storage: item.storage as storage[], // StorageType으로 캐스팅
        thumbnailUrl: item.thumbnailUrl,
        createdAt: item.createdAt,
        reviewStatus: item.reviewStatus || {
          reviewedCount: '0',
          totalCount: '0',
        },
        bookmarked: item.bookmarked || false,
      }));
  };
  const filteredData = getFilteredData();
  const handleMainTabChange = (tab: MainTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('main', tab);
    router.push(`/mypage?${params.toString()}`);
  };

  const handleSubTabChange = (tab: SubTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sub', tab.toLowerCase());
    router.push(`/mypage?${params.toString()}`);
  };
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
          {currentLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="border-gray-90 mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                <p className="text-gray-60">로딩 중...</p>
              </div>
            </div>
          ) : currentError ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <h2 className="mb-2 text-xl font-bold text-red-500">
                  데이터를 불러올 수 없습니다
                </h2>
                <p className="text-gray-60 mb-4">{currentError.message}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="hover:bg-blue-60 rounded bg-blue-700 px-4 py-2 text-white"
                >
                  다시 시도
                </button>
              </div>
            </div>
          ) : (
            <CardList data={filteredData} />
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

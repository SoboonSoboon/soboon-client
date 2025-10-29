'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {
  type MainTabType,
  type SubTabType,
  Storage,
} from '../../utils/mypageType';
import {
  useBookmarkMeetingList,
  useHostMeetingList,
  useParticipateMeetingList,
} from '../api/useMeetings';

export const useMyPageData = (hideCompletedReviews: boolean = false) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeMainTab = useMemo(
    () => (searchParams.get('main') as MainTabType) || 'host',
    [searchParams],
  );
  const activeSubTab = useMemo(
    () => (searchParams.get('sub')?.toUpperCase() as SubTabType) || 'DIVIDING',
    [searchParams],
  );

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
  //api 호출

  // 현재 탭에 따른 데이터 선택
  const currentData = useMemo(() => {
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
  }, [
    activeMainTab,
    hostData,
    hostError,
    hostLoading,
    participateData,
    participateError,
    participateLoading,
    bookmarkData,
    bookmarkError,
    bookmarkLoading,
  ]);

  const filteredData = useMemo(() => {
    if (!currentData.data) return [];

    let filtered = currentData.data
      .filter((meeting) => meeting.category === activeSubTab)
      .map((item) => ({
        groupId: item.groupId,
        title: item.title,
        category: item.category,
        status: item.status,
        usageStatus: item.usageStatus,
        location: item.location,
        storage: item.storage as Storage[], // StorageType으로 캐스팅
        thumbnailUrl: item.thumbnailUrl,
        createdAt: item.createdAt,
        reviewStatus: item.reviewStatus || {
          reviewedCount: '0',
          totalCount: '0',
        },
        bookmarked: item.bookmarked || false,
      }));

    // 리뷰 완료 숨기기 필터 적용
    if (hideCompletedReviews) {
      filtered = filtered.filter((item) => {
        // 리뷰 완료된 항목들을 숨김
        // reviewStatus가 있고 모든 리뷰가 완료된 경우 숨김
        if (item.reviewStatus) {
          const reviewedCount = parseInt(item.reviewStatus.reviewedCount);
          const totalCount = parseInt(item.reviewStatus.totalCount);
          return !(totalCount > 0 && reviewedCount >= totalCount);
        }
        return true;
      });
    }

    return filtered;
  }, [currentData.data, activeSubTab, hideCompletedReviews]);
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
  return {
    activeMainTab,
    activeSubTab,
    currentData,
    filteredData,
    handleMainTabChange,
    handleSubTabChange,
  };
};

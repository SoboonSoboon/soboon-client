'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {
  type MainTabType,
  type SubTabType,
} from '@/app/(main)/mypage/utils/mypageType';
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
  } = useHostMeetingList(0, 20, activeSubTab);
  const {
    data: participateData,
    isLoading: participateLoading,
    error: participateError,
  } = useParticipateMeetingList(0, 20, activeSubTab);
  const {
    data: bookmarkData,
    isLoading: bookmarkLoading,
    error: bookmarkError,
  } = useBookmarkMeetingList(0, 20, activeSubTab);
  //api 호출 (category 파라미터로 필터링됨)

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

    // API에서 이미 category로 필터링된 데이터가 오므로 category 필터링 불필요
    let filtered = (
      currentData.data as Array<
        | import('@/app/(main)/mypage/utils/mypageType').MeetingItem
        | import('@/app/(main)/mypage/utils/mypageType').BookMarkItem
      >
    ).map((item) => {
      const baseItem = {
        groupId: item.groupId,
        title: item.title,
        category: item.category,
        status: item.status,
        usageStatus: item.usageStatus,
        location: item.location,
        thumbnailUrl: item.thumbnailUrl,
        createdAt: item.createdAt,
        bookmarked: item.bookmarked,
      };

      // 일반 모임 데이터인 경우 (reviewStatus가 존재)
      if ('reviewStatus' in item) {
        return {
          ...baseItem,
          storage: item.storage,
          reviewStatus: item.reviewStatus,
          tags: item.tags,
        };
      }

      // 북마크 데이터인 경우
      return {
        ...baseItem,
        storage: item.storage,
        reviewStatus: { reviewedCount: 0, totalCount: 0 },
        tags: [],
      };
    });

    // 리뷰 완료 숨기기 필터 적용
    if (hideCompletedReviews) {
      filtered = filtered.filter((item) => {
        // 리뷰 완료된 항목들을 숨김
        // reviewStatus가 있고 모든 리뷰가 완료된 경우 숨김
        const reviewedCount = item.reviewStatus.reviewedCount;
        const totalCount = item.reviewStatus.totalCount;
        return !(totalCount > 0 && reviewedCount >= totalCount);
      });
    }

    return filtered;
  }, [currentData.data, hideCompletedReviews]);
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

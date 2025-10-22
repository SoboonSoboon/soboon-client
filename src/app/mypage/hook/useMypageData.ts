'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { MainTabType, SubTabType } from '../components';
import {
  useBookmarkMeetingList,
  useHostMeetingList,
  useParticipateMeetingList,
} from './useMeetings';
import { Storage } from '../utils/mypageType';

export const useMyPageData = () => {
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

    return currentData.data
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
  }, [currentData.data, activeSubTab]);
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

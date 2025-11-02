'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  type MainTabType,
  type SubTabType,
  type InfiniteData,
  type MypageMeetingApiResponse,
  type BookMarkListApiResPonse,
} from '@/app/(main)/mypage/utils/mypageType';
import {
  useHostMeetingList,
  useParticipateMeetingList,
  useBookmarkMeetingList,
} from '../../api/useMeetings';
import { useCurrentTabData } from './useCurrentTabData';
import { transformMeetingItems } from '../../utils/meetingDataTransformer';

export const useMyPageData = (hideCompletedReviews: boolean = false) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 현재 메인 탭 정보 읽기
  const activeMainTab = useMemo(
    () => (searchParams.get('main') as MainTabType) || 'host',
    [searchParams],
  );

  // URL에서 현재 서브 탭 정보 읽기
  const activeSubTab = useMemo(
    () => (searchParams.get('sub')?.toUpperCase() as SubTabType) || 'DIVIDING',
    [searchParams],
  );

  // 3개 API 동시 호출
  const host = useHostMeetingList(20, activeSubTab);
  const participate = useParticipateMeetingList(20, activeSubTab);
  const bookmark = useBookmarkMeetingList(20, activeSubTab);

  // 현재 탭에 맞는 데이터 선택
  const currentData = useCurrentTabData(
    activeMainTab,
    {
      data: host.data as InfiniteData<MypageMeetingApiResponse> | undefined,
      loading: host.isLoading || !host.data,
      error: host.error,
      fetchNextPage: () => host.fetchNextPage(),
      hasNextPage: host.hasNextPage,
      isFetchingNextPage: host.isFetchingNextPage,
    },
    {
      data: participate.data as
        | InfiniteData<MypageMeetingApiResponse>
        | undefined,
      loading: participate.isLoading || !participate.data,
      error: participate.error,
      fetchNextPage: () => participate.fetchNextPage(),
      hasNextPage: participate.hasNextPage,
      isFetchingNextPage: participate.isFetchingNextPage,
    },
    {
      data: bookmark.data as InfiniteData<BookMarkListApiResPonse> | undefined,
      loading: bookmark.isLoading || !bookmark.data,
      error: bookmark.error,
      fetchNextPage: () => bookmark.fetchNextPage(),
      hasNextPage: bookmark.hasNextPage,
      isFetchingNextPage: bookmark.isFetchingNextPage,
    },
  );

  // 데이터 변환 및 필터링
  const processedMeetingList = useMemo(() => {
    if (!currentData.data?.pages) return [];

    const safePages = currentData.data.pages.map(
      (page: MypageMeetingApiResponse | BookMarkListApiResPonse) => ({
        data: { content: page.data.content },
      }),
    );

    return transformMeetingItems(safePages, hideCompletedReviews);
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
    processedMeetingList,
    handleMainTabChange,
    handleSubTabChange,
  };
};

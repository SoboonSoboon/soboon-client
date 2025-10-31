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
  const activeMainTab = useMemo(
    () => (searchParams.get('main') as MainTabType) || 'host',
    [searchParams],
  );
  const activeSubTab = useMemo(
    () => (searchParams.get('sub')?.toUpperCase() as SubTabType) || 'DIVIDING',
    [searchParams],
  );

  const host = useHostMeetingList(20, activeSubTab);
  const participate = useParticipateMeetingList(20, activeSubTab);
  const bookmark = useBookmarkMeetingList(20, activeSubTab);

  const currentData = useCurrentTabData(
    activeMainTab,
    {
      data: host.data as InfiniteData<MypageMeetingApiResponse> | undefined,
      loading: host.isLoading,
      error: host.error,
      fetchNextPage: () => host.fetchNextPage(),
      hasNextPage: !!host.hasNextPage,
      isFetchingNextPage: host.isFetchingNextPage,
    },
    {
      data: participate.data as
        | InfiniteData<MypageMeetingApiResponse>
        | undefined,
      loading: participate.isLoading,
      error: participate.error,
      fetchNextPage: () => participate.fetchNextPage(),
      hasNextPage: !!participate.hasNextPage,
      isFetchingNextPage: participate.isFetchingNextPage,
    },
    {
      data: bookmark.data as InfiniteData<BookMarkListApiResPonse> | undefined,
      loading: bookmark.isLoading,
      error: bookmark.error,
      fetchNextPage: () => bookmark.fetchNextPage(),
      hasNextPage: !!bookmark.hasNextPage,
      isFetchingNextPage: bookmark.isFetchingNextPage,
    },
  );

  const filteredData = useMemo(() => {
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
    filteredData,
    handleMainTabChange,
    handleSubTabChange,
  };
};

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {
  type MainTabType,
  type SubTabType,
  type MeetingItem,
  type BookMarkItem,
} from '../../utils/mypageType';
import {
  useInfiniteHostMeetingList,
  useInfiniteParticipateMeetingList,
  useInfiniteBookmarkMeetingList,
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
    fetchNextPage: fetchHostNextPage,
    hasNextPage: hasHostNextPage,
    isFetchingNextPage: isFetchingHostNextPage,
  } = useInfiniteHostMeetingList(20, activeSubTab);

  const {
    data: participateData,
    isLoading: participateLoading,
    error: participateError,
    fetchNextPage: fetchParticipateNextPage,
    hasNextPage: hasParticipateNextPage,
    isFetchingNextPage: isFetchingParticipateNextPage,
  } = useInfiniteParticipateMeetingList(20, activeSubTab);

  const {
    data: bookmarkData,
    isLoading: bookmarkLoading,
    error: bookmarkError,
    fetchNextPage: fetchBookmarkNextPage,
    hasNextPage: hasBookmarkNextPage,
    isFetchingNextPage: isFetchingBookmarkNextPage,
  } = useInfiniteBookmarkMeetingList(20, activeSubTab);
  //api 호출 (category 파라미터로 필터링됨)

  // 현재 탭에 따른 데이터 선택
  const currentData = useMemo(() => {
    switch (activeMainTab) {
      case 'host':
        return {
          data: hostData,
          loading: hostLoading,
          error: hostError,
          fetchNextPage: fetchHostNextPage,
          hasNextPage: hasHostNextPage,
          isFetchingNextPage: isFetchingHostNextPage,
        };
      case 'participate':
        return {
          data: participateData,
          loading: participateLoading,
          error: participateError,
          fetchNextPage: fetchParticipateNextPage,
          hasNextPage: hasParticipateNextPage,
          isFetchingNextPage: isFetchingParticipateNextPage,
        };
      case 'bookmark':
        return {
          data: bookmarkData,
          loading: bookmarkLoading,
          error: bookmarkError,
          fetchNextPage: fetchBookmarkNextPage,
          hasNextPage: hasBookmarkNextPage,
          isFetchingNextPage: isFetchingBookmarkNextPage,
        };
      default:
        return {
          data: hostData,
          loading: hostLoading,
          error: hostError,
          fetchNextPage: fetchHostNextPage,
          hasNextPage: hasHostNextPage,
          isFetchingNextPage: isFetchingHostNextPage,
        };
    }
  }, [
    activeMainTab,
    hostData,
    hostError,
    hostLoading,
    fetchHostNextPage,
    hasHostNextPage,
    isFetchingHostNextPage,
    participateData,
    participateError,
    participateLoading,
    fetchParticipateNextPage,
    hasParticipateNextPage,
    isFetchingParticipateNextPage,
    bookmarkData,
    bookmarkError,
    bookmarkLoading,
    fetchBookmarkNextPage,
    hasBookmarkNextPage,
    isFetchingBookmarkNextPage,
  ]);

  const filteredData = useMemo(() => {
    if (!currentData.data) return [];

    // 무한스크롤 페이지들의 데이터를 하나의 배열로 합치기
    const allItems: (MeetingItem | BookMarkItem)[] = currentData.data.pages
      ? (
          currentData.data.pages as Array<{
            data: { content: (MeetingItem | BookMarkItem)[] };
          }>
        ).reduce<(MeetingItem | BookMarkItem)[]>((acc, page) => {
          return [...acc, ...page.data.content];
        }, [])
      : [];

    // API에서 이미 category로 필터링된 데이터가 오므로 category 필터링 불필요
    let filtered = allItems.map((item): MeetingItem => {
      // 북마크 API는 storage 필드를 사용하고, reviewStatus와 tags가 없음
      // 내가 만든/참여한 모임 API는 productTypes 필드를 사용하고, reviewStatus와 tags가 있음
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

      // 북마크 데이터인 경우 (storage 필드 사용)
      if ('storage' in item) {
        return {
          ...baseItem,
          storage: item.storage,
          reviewStatus: { reviewedCount: 0, totalCount: 0 },
          tags: [],
        } as MeetingItem;
      }

      // 일반 모임 데이터인 경우 (productTypes → storage로 매핑)
      type MeetingLike = {
        storage?: MeetingItem['storage'];
        productTypes?: MeetingItem['storage'];
        reviewStatus?: MeetingItem['reviewStatus'];
        tags?: MeetingItem['tags'];
      };
      const like = item as MeetingLike;

      return {
        ...baseItem,
        storage: like.storage ?? like.productTypes ?? [],
        reviewStatus: like.reviewStatus ?? { reviewedCount: 0, totalCount: 0 },
        tags: like.tags ?? [],
      } as MeetingItem;
    });

    // 중복 제거: groupId 기준으로 중복 아이템 제거
    const seenGroupIds = new Set<number>();
    filtered = filtered.filter((item) => {
      if (seenGroupIds.has(item.groupId)) {
        return false;
      }
      seenGroupIds.add(item.groupId);
      return true;
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

  // 디버그: 페이지/데이터 존재 여부 로깅
  useMemo(() => {
    const pages = currentData.data?.pages as Array<
      | undefined
      | {
          data: {
            content: (MeetingItem | BookMarkItem)[];
            sliceInfo: { currentPage: number; size: number; hasNext: boolean };
          };
        }
    >;
    if (!pages || pages.length === 0) {
      console.log('[마이페이지/무한스크롤][디버그] 페이지 없음', {
        main: activeMainTab,
        sub: activeSubTab,
      });
      return;
    }
    const last = pages[pages.length - 1]!;
    const pageLengths = pages.map((p, i) => ({
      index: i,
      len: p?.data?.content?.length ?? 0,
    }));
    const total = pages.reduce(
      (acc, p) => acc + (p?.data?.content?.length ?? 0),
      0,
    );
    console.log('[마이페이지/무한스크롤][디버그] 페이지 요약', {
      main: activeMainTab,
      sub: activeSubTab,
      pages: pages.length,
      pageLengths,
      lastSlice: last.data.sliceInfo,
      totalItemsRaw: total,
      totalItemsAfterMap: filteredData.length,
    });
  }, [
    currentData.data?.pages,
    activeMainTab,
    activeSubTab,
    filteredData.length,
  ]);
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

import {
  getBookmarkMeetingList,
  getHostMeetingList,
  getParticipateMeetingList,
} from '@/apis/mypage/getMeetingList';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { mypageKeys } from '@/constants/queryKey';
import {
  BookMarkItem,
  BookMarkListApiResPonse,
  MeetingItem,
  MypageMeetingApiResponse,
  Category,
} from '../../utils/mypageType';

/**
 *  내가 만든 모임 조회 훅
 */
export const useHostMeetingList = (
  page: number = 0,
  size: number = 20,
  category?: Category,
) => {
  return useQuery<MypageMeetingApiResponse, Error, MeetingItem[]>({
    queryKey: mypageKeys.hostMeetings(page, size, category),
    queryFn: () => getHostMeetingList(page, size, category),
    select: (data) => data.data.content,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 *  내가 참여한 모임 조회 훅
 */
export const useParticipateMeetingList = (
  page: number = 0,
  size: number = 20,
  category?: Category,
) => {
  return useQuery<MypageMeetingApiResponse, Error, MeetingItem[]>({
    queryKey: mypageKeys.participateMeetings(page, size, category),
    queryFn: () => getParticipateMeetingList(page, size, category),
    select: (data) => data.data.content,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 *  북마크한 모임 조회 훅
 */
export const useBookmarkMeetingList = (
  page: number = 0,
  size: number = 20,
  category?: Category,
) => {
  return useQuery<BookMarkListApiResPonse, Error, BookMarkItem[]>({
    queryKey: mypageKeys.bookmarksMeeting(page, size, category),
    queryFn: () => getBookmarkMeetingList(page, size, category),
    select: (data) => data.data.content,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * 내가 만든 모임 무한스크롤 훅
 */
export const useInfiniteHostMeetingList = (
  size: number = 20,
  category?: Category,
) => {
  return useInfiniteQuery({
    queryKey: mypageKeys.hostMeetings('infinite', size, category),
    queryFn: async ({ pageParam = 0 }) => {
      console.log('[무한스크롤][HOST] 요청', { pageParam, size, category });
      const res = await getHostMeetingList(pageParam, size, category);
      console.log('[무한스크롤][HOST] 📦 전체 응답:', res);
      console.log('[무한스크롤][HOST] 📋 content 배열:', res?.data?.content);
      console.log('[무한스크롤][HOST] 📊 sliceInfo:', res?.data?.sliceInfo);
      const info = res?.data?.sliceInfo;
      const len = res?.data?.content?.length ?? 0;
      console.log('[무한스크롤][HOST] 응답 요약', {
        currentPage: info?.currentPage,
        size: info?.size,
        hasNext: info?.hasNext,
        contentLen: len,
      });
      return res;
    },
    getNextPageParam: (lastPage) => {
      const { sliceInfo } = lastPage.data;
      // currentPage는 방금 받은 페이지 번호이므로, 다음 페이지는 currentPage 그대로 반환
      return sliceInfo.hasNext ? sliceInfo.currentPage : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * 내가 참여한 모임 무한스크롤 훅
 */
export const useInfiniteParticipateMeetingList = (
  size: number = 20,
  category?: Category,
) => {
  return useInfiniteQuery({
    queryKey: mypageKeys.participateMeetings('infinite', size, category),
    queryFn: async ({ pageParam = 0 }) => {
      console.log('[무한스크롤][PARTICIPATE] 요청', {
        pageParam,
        size,
        category,
      });
      const res = await getParticipateMeetingList(pageParam, size, category);
      console.log('[무한스크롤][PARTICIPATE] 📦 전체 응답:', res);
      console.log(
        '[무한스크롤][PARTICIPATE] 📋 content 배열:',
        res?.data?.content,
      );
      console.log(
        '[무한스크롤][PARTICIPATE] 📊 sliceInfo:',
        res?.data?.sliceInfo,
      );
      const info = res?.data?.sliceInfo;
      const len = res?.data?.content?.length ?? 0;
      console.log('[무한스크롤][PARTICIPATE] 응답 요약', {
        currentPage: info?.currentPage,
        size: info?.size,
        hasNext: info?.hasNext,
        contentLen: len,
      });
      return res;
    },
    getNextPageParam: (lastPage) => {
      const { sliceInfo } = lastPage.data;
      // currentPage는 방금 받은 페이지 번호이므로, 다음 페이지는 currentPage 그대로 반환
      return sliceInfo.hasNext ? sliceInfo.currentPage : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * 북마크한 모임 무한스크롤 훅
 */
export const useInfiniteBookmarkMeetingList = (
  size: number = 20,
  category?: Category,
) => {
  return useInfiniteQuery({
    queryKey: mypageKeys.bookmarksMeeting('infinite', size, category),
    queryFn: async ({ pageParam = 0 }) => {
      console.log('[무한스크롤][BOOKMARK] 요청', { pageParam, size, category });
      const res = await getBookmarkMeetingList(pageParam, size, category);
      console.log('[무한스크롤][BOOKMARK] 📦 전체 응답:', res);
      console.log(
        '[무한스크롤][BOOKMARK] 📋 content 배열:',
        res?.data?.content,
      );
      console.log('[무한스크롤][BOOKMARK] 📊 sliceInfo:', res?.data?.sliceInfo);
      const info = res?.data?.sliceInfo;
      const len = res?.data?.content?.length ?? 0;
      console.log('[무한스크롤][BOOKMARK] 응답 요약', {
        currentPage: info?.currentPage,
        size: info?.size,
        hasNext: info?.hasNext,
        contentLen: len,
      });
      return res;
    },
    getNextPageParam: (lastPage) => {
      const { sliceInfo } = lastPage.data;
      // currentPage는 방금 받은 페이지 번호이므로, 다음 페이지는 currentPage 그대로 반환
      return sliceInfo.hasNext ? sliceInfo.currentPage : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
};

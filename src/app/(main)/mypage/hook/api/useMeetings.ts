import {
  getBookmarkMeetingList,
  getHostMeetingList,
  getParticipateMeetingList,
} from '@/apis/mypage/getMeetingList';
import { useQuery } from '@tanstack/react-query';
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

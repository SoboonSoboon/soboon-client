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
} from '../../utils/mypageType';

/**
 *  내가 만든 모임 조회 훅
 */
export const useHostMeetingList = (page: number = 1, size: number = 20) => {
  return useQuery<MypageMeetingApiResponse, Error, MeetingItem[]>({
    queryKey: mypageKeys.hostMeetings(page, size),
    queryFn: () => getHostMeetingList(page, size),
    select: (data) => data.data.items,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 *  내가 참여한 모임 조회 훅
 */
export const useParticipateMeetingList = (
  page: number = 1,
  size: number = 20,
) => {
  return useQuery<MypageMeetingApiResponse, Error, MeetingItem[]>({
    queryKey: mypageKeys.participateMeetings(page, size),
    queryFn: () => getParticipateMeetingList(page, size),
    select: (data) => data.data.items,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 *  내가 참여한 모임 조회 훅
 */
export const useBookmarkMeetingList = (page: number = 1, size: number = 20) => {
  return useQuery<BookMarkListApiResPonse, Error, BookMarkItem[]>({
    queryKey: mypageKeys.bookmarksMeeting(page, size),
    queryFn: () => getBookmarkMeetingList(page, size),
    select: (data) => data.data.items,
    staleTime: 5 * 60 * 1000,
  });
};

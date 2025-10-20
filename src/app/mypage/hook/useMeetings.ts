import {
  getHostMeetingList,
  getParticipateMeetingList,
} from '@/apis/mypage/getMeetingList';
import { useQuery } from '@tanstack/react-query';
import { mypageKeys } from '../../../constants/queryKey';

/**
 *  내가 만든 모임 조회 훅
 */
export const useHostMeetingList = (page: number = 1, size: number = 20) => {
  return useQuery({
    queryKey: mypageKeys.hostMeetings(page, size),
    queryFn: () => getHostMeetingList(page, size),
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
  return useQuery({
    queryKey: mypageKeys.participateMeetings(page, size),
    queryFn: () => getParticipateMeetingList(page, size),
    staleTime: 5 * 60 * 1000,
  });
};

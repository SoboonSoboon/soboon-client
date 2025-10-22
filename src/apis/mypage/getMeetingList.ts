import {
  BookMarkListApiResPonse,
  MypageMeetingApiResponse,
} from '@/app/mypage/utils/mypageType';
import { axiosInstance } from '../axiosInstance';

export async function getHostMeetingList(
  page: number = 0,
  size: number = 20,
): Promise<MypageMeetingApiResponse> {
  const pageable = JSON.stringify({ page, size });
  try {
    const response = await axiosInstance(
      `/v1/me/meetings/hosted?pageable=${encodeURIComponent(pageable)}`,
    );

    return response.data;
  } catch (error) {
    console.error(' 내가 만든 모임 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
}
export async function getParticipateMeetingList(
  page: number = 0,
  size: number = 20,
): Promise<MypageMeetingApiResponse> {
  const pageable = JSON.stringify({ page, size });
  try {
    const response = await axiosInstance(
      `/v1/me/meetings/participated?pageable=${encodeURIComponent(pageable)}`,
    );

    return response.data;
  } catch (error) {
    console.error(' 내가 참여한 모임 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
}

export async function getBookmarkMeetingList(
  page: number = 1,
  size: number = 20,
): Promise<BookMarkListApiResPonse> {
  try {
    const response = await axiosInstance.get('/v1/me/bookmarks', {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error(' 찜한 모임 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
}

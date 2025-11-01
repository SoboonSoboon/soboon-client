import {
  BookMarkListApiResPonse,
  MypageMeetingApiResponse,
  Category,
} from '@/app/(main)/mypage/utils/mypageType';
import { axiosInstance } from '../axiosInstance';

export const getHostMeetingList = async (
  page: number = 0,
  size: number = 20,
  category?: Category,
): Promise<MypageMeetingApiResponse> => {
  try {
    const response = await axiosInstance.get('/v1/me/meetings/hosted', {
      params: {
        page,
        size,
        ...(category ? { category } : {}),
      },
    });
    return response.data;
  } catch (error) {
    console.error(' 내가 만든 모임 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
};

export const getParticipateMeetingList = async (
  page: number = 0,
  size: number = 20,
  category?: Category,
): Promise<MypageMeetingApiResponse> => {
  try {
    const response = await axiosInstance.get('/v1/me/meetings/participated', {
      params: {
        page,
        size,
        ...(category ? { category } : {}),
      },
    });

    return response.data;
  } catch (error) {
    console.error(' 내가 참여한 모임 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
};

export const getBookmarkMeetingList = async (
  page: number = 0,
  size: number = 20,
  category?: Category,
): Promise<BookMarkListApiResPonse> => {
  try {
    const params: { page: number; size: number; category?: Category } = {
      page,
      size,
    };
    if (category) {
      params.category = category;
    }

    const response = await axiosInstance.get('/v1/me/bookmarks', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('찜한 모임 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
};

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
    const pageable = JSON.stringify({ page, size });
    const response = await axiosInstance.get('/v1/me/meetings/hosted', {
      params: {
        ...(category ? { category } : {}),
        pageable,
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
    const pageable = JSON.stringify({ page, size });
    const response = await axiosInstance.get('/v1/me/meetings/participated', {
      params: {
        ...(category ? { category } : {}),
        pageable,
      },
    });

    return response.data;
  } catch (error) {
    console.error(' 내가 참여한 모임 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
};

export const getBookmarkMeetingList = async (
  page: number = 1,
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
    console.error(' 찜한 모임 데이터를 가져오는데 실패했습니다:', error);
    throw error;
  }
};

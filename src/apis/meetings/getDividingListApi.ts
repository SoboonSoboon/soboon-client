import { axiosInstance } from '../axiosInstance';

export const getDividingListApi = async (query: URLSearchParams) => {
  try {
    const response = await axiosInstance.get('/v1/meetings/dividing', {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error('소분 모임 리스트 조회에 실패했습니다.', error);
    throw error;
  }
};

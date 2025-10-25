import { axiosInstance } from '../axiosInstance';

export const getShoppingListApi = async (query: URLSearchParams) => {
  try {
    const response = await axiosInstance.get('/v1/meetings/shopping', {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error('장보기 모임 리스트 조회에 실패했습니다.', error);
    throw error;
  }
};

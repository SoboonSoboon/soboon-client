import { axiosInstance } from '../axiosInstance';

export interface PopularTagsResponse {
  data: string[];
}

export const getPopularTagsApi = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get<PopularTagsResponse>(
      '/v1/meetings/tags/popular',
    );
    return response.data.data;
  } catch (error) {
    console.error('인기 태그 조회에 실패했습니다.', error);
    throw error;
  }
};

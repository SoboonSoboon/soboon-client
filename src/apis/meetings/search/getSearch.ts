import { axiosInstance } from '@/apis/axiosInstance';

type SearchType = 'dividing' | 'shopping';

// 공통 검색 함수
const searchMeetings = async (
  searchType: SearchType,
  query: URLSearchParams,
) => {
  try {
    const response = await axiosInstance.get(
      `/v1/meetings/${searchType}/search`,
      {
        params: query,
      },
    );
    return response.data;
  } catch (error) {
    console.error(`${searchType} search API error:`, error);
    throw error;
  }
};

// 소분하기 모임 검색
export const getDividingSearch = (query: URLSearchParams) =>
  searchMeetings('dividing', query);

// 장보기 모임 검색
export const getShoppingSearch = (query: URLSearchParams) =>
  searchMeetings('shopping', query);

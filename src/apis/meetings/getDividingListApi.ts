import { axiosInstance } from '../axiosInstance';

// [DEMO] 목 응답 — 시연 영상 촬영 후 이 블록과 early return을 제거하세요
const MOCK_EMPTY_RESPONSE = {
  data: {
    content: [],
    sliceInfo: { currentPage: 0, size: 10, hasNext: false },
  },
};

export const getDividingListApi = async (query: URLSearchParams) => {
  // [DEMO] 백엔드 없이 시연 가능하도록 API 호출 차단
  return MOCK_EMPTY_RESPONSE;

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

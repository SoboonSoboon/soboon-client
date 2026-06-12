import { axiosInstance } from '../axiosInstance';

export const getCommentApi = async (
  meetingId: string,
  query: URLSearchParams,
) => {
  // [DEMO] 시연용 데모 페이지에서 API 호출 차단
  if (meetingId === 'demo') {
    return {
      data: {
        content: [],
        sliceInfo: { currentPage: 0, size: 10, hasNext: false },
        totalElements: 0,
      },
    };
  }

  try {
    const response = await axiosInstance.get(
      `/v1/meetings/${meetingId}/comments?size=10`,
      {
        params: query,
      },
    );
    return response.data;
  } catch (error) {
    console.error('댓글 조회 실패', error);
    return null;
  }
};

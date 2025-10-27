import { axiosInstance } from '../axiosInstance';

export const getCommentApi = async (
  meetingId: string,
  query: URLSearchParams,
) => {
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

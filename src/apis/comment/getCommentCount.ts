import { axiosInstance } from '../axiosInstance';

export const getCommentCountApi = async (meetingId: string) => {
  try {
    const response = await axiosInstance.get(
      `/v1/meetings/${meetingId}/comments?page=0&size=1`,
    );
    return response.data.data.totalElements;
  } catch (error) {
    console.error('댓글 개수 조회 실패', error);
    throw error;
  }
};

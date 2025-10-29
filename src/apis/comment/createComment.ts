import { axiosInstance } from '../axiosInstance';

export const createCommentApi = async ({
  meetingId,
  content,
  secret,
}: {
  meetingId: string;
  content: string;
  secret: boolean;
}) => {
  try {
    const response = await axiosInstance.post(
      `/v1/meetings/${meetingId}/comments`,
      {
        content,
        secret,
      },
    );
    return response.data;
  } catch (error) {
    console.error('댓글 생성 실패', error);
    throw error;
  }
};

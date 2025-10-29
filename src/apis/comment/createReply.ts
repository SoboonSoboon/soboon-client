import { axiosInstance } from '../axiosInstance';

export const createReplyApi = async ({
  meetingId,
  commentId,
  content,
  secret,
}: {
  meetingId: string;
  commentId: string;
  content: string;
  secret: boolean;
}) => {
  try {
    const response = await axiosInstance.post(
      `/v1/meetings/${meetingId}/comments/${commentId}/replies`,
      {
        content,
        secret,
      },
    );
    return response.data;
  } catch (error) {
    console.error('대댓글 생성 실패', error);
    throw error;
  }
};

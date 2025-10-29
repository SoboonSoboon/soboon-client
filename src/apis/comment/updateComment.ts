import { axiosInstance } from '../axiosInstance';

export const updateCommentApi = async ({
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
    const response = await axiosInstance.put(
      `/v1/meetings/${meetingId}/comments/${commentId}`,
      {
        content,
        secret,
      },
    );
    return response.data;
  } catch (error) {
    console.error('댓글 수정 실패', error);
    throw error;
  }
};

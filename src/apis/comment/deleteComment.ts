import { axiosInstance } from '../axiosInstance';

export const deleteCommentApi = async ({
  meetingId,
  commentId,
}: {
  meetingId: string;
  commentId: string;
}) => {
  try {
    const response = await axiosInstance.delete(
      `/v1/meetings/${meetingId}/comments/${commentId}`,
    );
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 실패', error);
    throw error;
  }
};

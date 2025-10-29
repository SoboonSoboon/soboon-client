import { axiosInstance } from '../axiosInstance';
import { commentSchema } from '@/schemas/commentSchema';

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
  const validated = commentSchema.safeParse({ comment: content });

  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

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

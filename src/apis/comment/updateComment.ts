import { axiosInstance } from '../axiosInstance';
import { commentSchema } from '@/schemas/commentSchema';

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
  const validated = commentSchema.safeParse({ comment: content });

  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

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

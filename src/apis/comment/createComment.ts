import { axiosInstance } from '../axiosInstance';
import { commentSchema } from '@/schemas/commentSchema';

export const createCommentApi = async ({
  meetingId,
  content,
  secret,
}: {
  meetingId: string;
  content: string;
  secret: boolean;
}) => {
  const validated = commentSchema.safeParse({ comment: content });

  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

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

'use server';

import { revalidatePath } from 'next/cache';

export const createComment = async (_: unknown, formData: FormData) => {
  const meetingId = formData.get('meetingId') as string;
  const commentContent = formData.get('comment') as string;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/comments`,
      {
        method: 'POST',
        body: JSON.stringify({ content: commentContent, secret: false }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SOBOON_API_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('댓글 생성 실패');
    }

    revalidatePath(`/sharing/${meetingId}`);

    const responseData = await response.json();
    return responseData.message;
  } catch (error) {
    console.error('댓글 생성 실패', error);
    return null;
  }
};

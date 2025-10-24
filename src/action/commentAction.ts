'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const createComment = async (_: unknown, formData: FormData) => {
  const meetingId = formData.get('meetingId') as string;
  const commentContent = formData.get('comment') as string;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/comments`,
      {
        method: 'POST',
        body: JSON.stringify({ content: commentContent, secret: false }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
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

export const createReply = async (_: unknown, formData: FormData) => {
  const meetingId = formData.get('meetingId') as string;
  const commentId = formData.get('commentId') as string;
  const replyContent = formData.get('reply') as string;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/comments/${commentId}/replies`,
      {
        method: 'POST',
        body: JSON.stringify({ content: replyContent, secret: false }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('대댓글 생성 실패');
    }

    revalidatePath(`/sharing/${meetingId}`);

    const responseData = await response.json();
    return responseData.message;
  } catch (error) {
    console.error('대댓글 생성 실패', error);
    return null;
  }
};

export const deleteComment = async (_: unknown, formData: FormData) => {
  const meetingId = formData.get('meetingId') as string;
  const commentId = formData.get('commentId') as string;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('댓글 삭제 실패');
    }

    revalidatePath(`/sharing/${meetingId}`);

    return response.json();
  } catch (error) {
    console.error('댓글 삭제 실패', error);
    return null;
  }
};

export const updateComment = async (
  _: unknown,
  formData: FormData,
  commentId: string,
  meetingId: string,
) => {
  const commentContent = formData.get('comment') as string;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}/comments/${commentId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ content: commentContent, secret: false }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('댓글 수정 실패');
    }

    revalidatePath(`/sharing/${meetingId}`);

    return response.json();
  } catch (error) {
    console.error('댓글 수정 실패', error);
    return null;
  }
};

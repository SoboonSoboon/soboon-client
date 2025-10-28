'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export const updateDividingMeeting = async (
  meetingId: string,
  data: DividingFormData,
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';

  if (!accessToken) {
    throw new Error('인증이 필요합니다');
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/meetings/${meetingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || '모임 수정에 실패했습니다. 다시 시도해 주세요.',
      );
    }

    // 캐시 무효화
    revalidateTag(`meeting-${meetingId}`);

    return { success: true };
  } catch (error) {
    console.error('모임 수정 실패:', error);
    throw error;
  }
};

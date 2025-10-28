'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export const updateDividingMeeting = async (
  meetingId: string,
  data: unknown,
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
      let errorMessage = '모임 수정에 실패했습니다. 다시 시도해 주세요.';

      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          const errorText = await response.text();
          console.error('API 오류 응답 (JSON 아님):', errorText);
          errorMessage = `서버 오류 (${response.status}): ${errorMessage}`;
        }
      } catch (parseError) {
        console.error('오류 응답 파싱 실패:', parseError);
        errorMessage = `서버 오류 (${response.status}): ${errorMessage}`;
      }

      throw new Error(errorMessage);
    }

    // 캐시 무효화
    revalidateTag(`meeting-${meetingId}`);

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('모임 수정 실패:', error);
    throw error;
  }
};

export const updateShoppingMeeting = async (
  meetingId: string,
  data: unknown,
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
      let errorMessage = '모임 수정에 실패했습니다. 다시 시도해 주세요.';

      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          const errorText = await response.text();
          console.error('API 오류 응답 (JSON 아님):', errorText);
          errorMessage = `서버 오류 (${response.status}): ${errorMessage}`;
        }
      } catch (parseError) {
        console.error('오류 응답 파싱 실패:', parseError);
        errorMessage = `서버 오류 (${response.status}): ${errorMessage}`;
      }

      throw new Error(errorMessage);
    }

    // 캐시 무효화
    revalidateTag(`meeting-${meetingId}`);

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('모임 수정 실패:', error);
    throw error;
  }
};

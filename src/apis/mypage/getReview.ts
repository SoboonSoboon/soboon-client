import {
  ReviewResponse,
  ReviewTargetsResponse,
} from '@/app/mypage/utils/review';

const baseUrl = process.env.NEXT_PUBLIC_SOBOON_API_URL;

// 클라이언트 사이드에서 localStorage에서 토큰을 가져오기
const getClientToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    console.log(
      'Token from localStorage:',
      token ? `${token.substring(0, 10)}...` : 'null',
    );
    return token;
  }
  return null;
};

export const getReceivedReview = async (): Promise<ReviewResponse> => {
  try {
    const token = getClientToken();
    console.log('API URL:', baseUrl);
    console.log('Token exists:', !!token);

    // 토큰이 없으면 빈 데이터 반환
    if (!token) {
      console.warn('No token found, returning empty data');
      return {
        message: null,
        data: {
          keywords: [],
        },
      };
    }

    const response = await fetch(`${baseUrl}/v1/reviews/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(
        `Failed to fetch reviews: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    throw error;
  }
};

export const getReviewTargets = async (
  meetingId: number,
): Promise<ReviewTargetsResponse> => {
  try {
    const token = getClientToken();
    const response = await fetch(
      `${baseUrl}/v1/reviews/targets?meetingId=${meetingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');

      // 모임이 완료되지 않은 경우는 에러가 아닌 정상적인 상황
      if (response.status === 400) {
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error === 'MEETING_NOT_COMPLETED') {
            console.warn(
              'Meeting not completed, returning empty data:',
              errorData.message,
            );
            return {
              data: {
                eventId: 0,
                category: 'SHOPPING',
                attendees: [],
              },
            };
          }
        } catch {
          // JSON 파싱 실패 시 기존 에러 처리
        }
      }

      throw new Error(
        `Failed to fetch review targets: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch review targets:', error);
    throw error;
  }
};

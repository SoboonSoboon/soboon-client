import {
  HostReviewRequest,
  ParticipantReviewRequest,
} from '@/app/mypage/utils/review';

const baseUrl = process.env.NEXT_PUBLIC_SOBOON_API_URL;

// 클라이언트 사이드에서 localStorage에서 토큰을 가져오기
const getClientToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

export const postHostReview = async (
  data: HostReviewRequest,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const token = getClientToken();

    if (!token) {
      return { success: false, error: 'No authentication token found' };
    }

    const response = await fetch(`${baseUrl}/v1/reviews/host`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      return {
        success: false,
        error: `Failed to post host review: ${response.status} ${response.statusText} - ${errorText}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Server - Failed to post host review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const postParticipantReview = async (
  data: ParticipantReviewRequest,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const token = getClientToken();

    if (!token) {
      return { success: false, error: 'No authentication token found' };
    }

    const response = await fetch(`${baseUrl}/v1/reviews/participant`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      return {
        success: false,
        error: `Failed to post participant review: ${response.status} ${response.statusText} - ${errorText}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Server - Failed to post participant review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

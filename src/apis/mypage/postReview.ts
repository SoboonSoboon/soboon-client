'use server';

import {
  HostReviewRequest,
  ParticipantReviewRequest,
} from '@/app/(main)/mypage/utils/review';
import { getServerToken } from '@/utils/serverToken';

export const postHostReview = async (
  data: HostReviewRequest,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const token = await getServerToken();
    if (!token) {
      return { success: false, error: 'No authentication token' };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/reviews/host`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to post host review:', error);
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
    const token = await getServerToken();
    if (!token) {
      return { success: false, error: 'No authentication token' };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOBOON_API_URL}/v1/reviews/participant`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to post participant review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

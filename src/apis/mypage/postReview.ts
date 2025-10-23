import {
  HostReviewRequest,
  ParticipantReviewRequest,
} from '@/app/mypage/utils/review';

const baseUrl = process.env.NEXT_PUBLIC_SOBOON_API_URL;
const token = process.env.NEXT_PUBLIC_SOBOON_API_TOKEN;
export const postHostReview = async (
  data: HostReviewRequest,
): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/v1/reviews/host`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to  host review');
    }
  } catch (error) {
    console.error('Error creating host review:', error);
    throw error;
  }
};

export const postParticipantReview = async (
  data: ParticipantReviewRequest,
): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/v1/reviews/participant`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to  participant review');
    }
  } catch (error) {
    console.error('Error creating participant review:', error);
    throw error;
  }
};

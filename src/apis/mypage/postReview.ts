import {
  HostReviewRequest,
  ParticipantReviewRequest,
} from '@/app/mypage/utils/review';

const baseUrl = process.env.NEXT_PUBLIC_SOBOON_API_URL;
const token = process.env.NEXT_PUBLIC_SOBOON_API_TOKEN;

export const postHostReview = async (
  data: HostReviewRequest,
): Promise<void> => {
  const response = await fetch(`${baseUrl}/v1/reviews/host`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to post host review');
  }
};

export const postParticipantReview = async (
  data: ParticipantReviewRequest,
): Promise<void> => {
  const response = await fetch(`${baseUrl}/v1/reviews/participant`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to post participant review');
  }
};

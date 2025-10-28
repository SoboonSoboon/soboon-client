import { axiosInstance } from '../axiosInstance';
import {
  ReviewResponse,
  ReviewTargetsResponse,
} from '@/app/mypage/utils/review';

export const getReceivedReview = async (): Promise<ReviewResponse> => {
  try {
    const response = await axiosInstance.get('/v1/reviews/me');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    throw error;
  }
};

export const getReviewTargets = async (
  meetingId: number,
): Promise<ReviewTargetsResponse> => {
  try {
    const response = await axiosInstance.get(
      `/v1/reviews/targets?meetingId=${meetingId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch review targets:', error);
    throw error;
  }
};

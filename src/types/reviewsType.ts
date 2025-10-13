import {
  ApiResponse,
  CategoryType,
  ReviewKeyword,
  ReviewOptionsType,
} from './common';

/*
주최자 only
주최자 -> 참여자 리뷰 작성
POST /v1/reviews/host
*/
type ReviewsType = ApiResponse<{
  eventId: number;
  category: CategoryType;
  attendees: [
    {
      userId: number;
      nickname: string;
      profileImageUrl: string;
      reviewOptions: ReviewOptionsType[];
    },
  ];
}>;

/*
내 리뷰 조회
GET /v1/reviews/me
*/
type MyReviewsType = ApiResponse<{
  keywords: {
    keyword: ReviewKeyword;
    count: number;
  }[];
}>;

/*
참여자 only
참여자 -> 주최자 리뷰 작성
POST /v1/reviews/participant
*/
type CreateParticipantReviewType = ApiResponse<{
  data: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
    reviewOptions: ReviewOptionsType[];
  }[];
}>;

/*
주최자는 참여자 목록, 참여자는 주최자만 조회
GET /v1/reviews/targets
*/
type TargetsReviewType = ApiResponse<{
  data: {
    meetingId: number;
    category: CategoryType;
    targets: {
      userId: number;
      nickname: string;
      profileImageUrl: string;
      alreadyReviewed: boolean;
    }[];
  };
}>;

export type {
  TargetsReviewType,
  CreateParticipantReviewType,
  MyReviewsType,
  ReviewOptionsType,
  ReviewsType,
};

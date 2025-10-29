// 리뷰 키워드 타입
export type ReviewKeywordString =
  | 'TIME_PROMISE'
  | 'KIND_AND_CARING'
  | 'SAME_AS_PHOTO'
  | 'FAST_RESPONSE'
  | 'GOOD_DISTRIBUTION';

export interface ReviewKeyword {
  keyword: ReviewKeywordString;
  count?: number;
}

export interface ReviewResponse {
  message: string | null;
  data: ReviewData;
}

export interface ReviewData {
  keywords: ReviewKeyword[];
}

export interface ReviewerListResponse {
  data: {
    eventId: number;
    category: 'SHOPPING' | 'DIVIDING';
    attendees: ReviewerListData[];
  };
}
export interface ReviewerListData {
  attendeeId: number;
  nickname: string;
  profileImageUrl: string;
  alreadyReviewed: boolean;
  host: boolean;
}

export interface ParticipantReviewData {
  eventId: number;
  userId: number;
  selectedReviews: ReviewKeywordString[];
}

export interface HostReviewData {
  eventId: number;
  userId: number;
  selectedReviews: ReviewKeywordString[];
}

// 리뷰 작성 요청 데이터 타입
export interface HostReviewRequest {
  eventId: number;
  userId: number;
  selectedReviews: ReviewKeywordString[];
}

export interface ParticipantReviewRequest {
  eventId: number;
  userId: number;
  selectedReviews: ReviewKeywordString[];
}

// 리뷰 대상 목록 응답 타입
export interface ReviewTargetsResponse {
  data: {
    eventId: number;
    category: 'SHOPPING' | 'DIVIDING';
    attendees: ReviewerListData[];
  };
}

export interface ReviewKeyword {
  keyword:
    | 'TIME_PROMISE'
    | 'KIND_AND_CARING'
    | 'SAME_AS_PHOTO'
    | 'FAST_RESPONSE'
    | 'GOOD_DISTRIBUTION';
  count: number;
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
  selectedReviews: ReviewKeyword[];
}

export interface HostReviewData {
  eventId: number;
  userId: number;
  selectedReviews: ReviewKeyword[];
}

// 리뷰 작성 요청 데이터 타입
export interface CreateHostReviewRequest {
  eventId: number;
  userId: number;
  selectedReviews: ReviewKeyword[];
}

export interface CreateParticipantReviewRequest {
  eventId: number;
  userId: number;
  selectedReviews: ReviewKeyword[];
}

// 리뷰 대상 목록 응답 타입
export interface ReviewTargetsResponse {
  message: string | null;
  data: {
    eventId: number;
    category: 'SHOPPING' | 'DIVIDING';
    attendees: ReviewerListData[];
  };
}

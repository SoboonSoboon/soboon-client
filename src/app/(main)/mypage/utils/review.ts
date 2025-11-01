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
  selectedKeywords: null | ReviewKeywordString[];
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

// 리뷰 UI 유틸 함수
export const KEYWORD_LABELS = {
  TIME_PROMISE: '시간 약속을 잘 지켜요',
  KIND_AND_CARING: '친절하고 배려가 넘쳐요',
  FAST_RESPONSE: '응답이 빨라요',
  SAME_AS_PHOTO: '소분이 사진, 설명과 동일해요',
  GOOD_DISTRIBUTION: '적절하게 잘 분배했어요',
} as const;

export const getKeywordLabel = (keyword: ReviewKeywordString): string =>
  KEYWORD_LABELS[keyword];

export const getAvailableKeywords = (
  activeMainTab: 'host' | 'participate' | 'bookmark',
): ReviewKeywordString[] => [
  'TIME_PROMISE',
  'KIND_AND_CARING',
  'FAST_RESPONSE',
  activeMainTab === 'host' ? 'SAME_AS_PHOTO' : 'GOOD_DISTRIBUTION',
];

export const getKeywordClassName = (isSelected: boolean): string =>
  `rounded-lg px-4 py-2 text-sm whitespace-nowrap transition-colors ${
    isSelected ? 'bg-Green-5' : 'bg-gray-5'
  }`;

export const getButtonClassName = (isSelected: boolean): string =>
  `${getKeywordClassName(isSelected)} cursor-pointer`;

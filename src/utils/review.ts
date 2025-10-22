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

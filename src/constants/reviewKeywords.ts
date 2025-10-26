import { ReviewKeywordString } from '@/app/mypage/utils/review';

export const REVIEW_KEYWORD_LABELS: Record<ReviewKeywordString, string> = {
  TIME_PROMISE: '시간을 잘 지켜요',
  KIND_AND_CARING: '친절해요',
  SAME_AS_PHOTO: '사진과 같아요',
  FAST_RESPONSE: '응답이 빨라요',
  GOOD_DISTRIBUTION: '적절하게 잘 분배했어요',
} as const;

import { MeetingItem } from '@/app/(main)/mypage/utils/mypageType';
import { useMeetingReview } from './useMeetingReview';
import { useMeetingNavigation } from './useMeetingNavigation';

/**
 * 미팅 카드의 모든 액션을 조합하는 훅
 * - 리뷰 관련 로직 (useMeetingReview)
 * - 네비게이션 로직 (useMeetingNavigation)
 *
 * 카드 컴포넌트에서는 이 훅만 사용하면 모든 기능 사용 가능
 */
export function useMeetingCardActions(
  meeting: MeetingItem,
  activeMainTab: 'host' | 'participate' | 'bookmark',
) {
  const reviewActions = useMeetingReview(meeting, activeMainTab);
  const navigationActions = useMeetingNavigation(meeting);

  return {
    // 리뷰 관련
    ...reviewActions,
    // 네비게이션 관련
    ...navigationActions,
  };
}

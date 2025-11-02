import { useRouter } from 'next/navigation';
import { MeetingItem } from '@/app/(main)/mypage/utils/mypageType';

/**
 * 미팅 카드의 네비게이션 로직을 담당하는 훅
 * - 카드 클릭 시 상세 페이지로 이동
 * - 카테고리에 따른 URL 경로 처리
 */
export function useMeetingNavigation(meeting: MeetingItem) {
  const router = useRouter();

  // 카드 클릭 핸들러
  const handleCardClick = () => {
    const category =
      meeting.category.toLowerCase() === 'dividing'
        ? 'dividing'
        : meeting.category.toLowerCase();
    router.push(`/${category}/${meeting.groupId}`);
  };

  return {
    handleCardClick,
  };
}

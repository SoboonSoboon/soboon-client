'use client';
import { Button, ProfileImg } from '@/components/Atoms';
import { ReviewItemBar } from './ReviewItemBar';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { ReviewData } from '../../utils/review';
import { useModal } from '@/components/Molecules/modal';
import { ProfileEditModal } from './profileModal/ProfileEditModal';
import { REVIEW_KEYWORD_LABELS } from '@/constants';

interface ProfileSideBar {
  reviewData: ReviewData;
}

export const ProfileSideBar = ({ reviewData }: ProfileSideBar) => {
  const profileModal = useModal();
  const userNickname = useAuthStore((state) => state.userNickname);
  const userImage = useAuthStore((state) => state.userImage);

  // 리뷰 키워드 중 최대 count에 20% 여유를 더한 값 계산
  // count가 0인 경우를 제외한 실제 최대값을 기준으로 계산
  const positiveCounts = reviewData.keywords
    .filter((k) => k.count && k.count > 0)
    .map((k) => k.count || 0);
  const actualMaxCount =
    positiveCounts.length > 0 ? Math.max(...positiveCounts) : 1;
  // 0인 항목은 8% 표시, 나머지는 최대값의 1.2배를 기준으로 계산
  const maxCount = actualMaxCount * 1.2;

  // 모든 키워드를 키워드 순서대로 표시 (데이터에 없는 키워드도 표시)
  const allKeywords = Object.keys(REVIEW_KEYWORD_LABELS) as Array<
    keyof typeof REVIEW_KEYWORD_LABELS
  >;

  // 데이터에서 해당 키워드의 count를 찾는 함수
  const getCountForKeyword = (keyword: string) => {
    const found = reviewData.keywords.find((k) => k.keyword === keyword);
    return found?.count || 0;
  };

  return (
    <div className="border-gray-10 flex w-full flex-col gap-5 rounded-lg border bg-white px-8 py-15">
      <div className="flex flex-col items-center justify-center gap-2.5">
        <ProfileImg profileImageUrl={userImage || ''} size={118} />
        <h2 className="font-memomentKkukkkuk text-2xl">{userNickname}</h2>
      </div>
      <Button
        label="프로필 수정"
        variant="outline"
        className="w-full"
        onClick={profileModal.open}
      />
      <div className="flex flex-col gap-4">
        {allKeywords.map((keyword, index) => (
          <ReviewItemBar
            key={index}
            count={getCountForKeyword(keyword)}
            maxCount={maxCount}
            label={REVIEW_KEYWORD_LABELS[keyword]}
          />
        ))}
      </div>
      <ProfileEditModal
        isOpen={profileModal.isOpen}
        onClose={profileModal.close}
      />
    </div>
  );
};

'use client';

import { Button, ProfileImg, ReviewItemBar } from '@/components/Atoms';
import { useModal } from '@/components/Molecules';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { useModal } from '@/components/Molecules/modal';
import { ProfileEditModal } from './profileModal/ProfileEditModal';
import { REVIEW_KEYWORD_LABELS } from '@/constants';
import { useReviewStats } from '@/hooks';
import { useReceivedReview } from '../../hook/api/useReceivedReview';
import dynamic from 'next/dynamic';

export const ProfileSideBar = () => {
  const profileModal = useModal();
  const userNickname = useAuthStore((state) => state.userNickname);
  const userImage = useAuthStore((state) => state.userImage);

  // React Query로 리뷰 데이터 가져오기
  const { data: reviews } = useReceivedReview();

  // 모든 키워드를 키워드 순서대로 표시 (데이터에 없는 키워드도 표시)
  const allKeywords = Object.keys(REVIEW_KEYWORD_LABELS) as Array<
    keyof typeof REVIEW_KEYWORD_LABELS
  >;

  // 공용 훅 사용
  const { maxCount, getCountForKeyword } = useReviewStats({
    reviewKeywords: reviews?.data?.keywords || [],
  });

  const DynamicProfileEditModal = dynamic(
    () =>
      import('./profileModal/ProfileEditModal').then(
        (mod) => mod.ProfileEditModal,
      ),
    {
      ssr: false,
    },
  );

  return (
    <div className="border-gray-10 flex w-full flex-col gap-3 rounded-lg border bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-15">
      <div className="flex flex-col items-center justify-center gap-2.5">
        <ProfileImg profileImageUrl={userImage || ''} size={118} />
        <h2 className="font-memomentKkukkkuk text-lg sm:text-xl lg:text-2xl">
          {userNickname}
        </h2>
      </div>
      <Button
        label="프로필 수정"
        aria-label="프로필 수정 버튼"
        variant="outline"
        className="w-full"
        onClick={profileModal.open}
      />
      <div className="flex flex-col gap-3 sm:gap-4">
        {allKeywords.map((keyword, index) => (
          <ReviewItemBar
            key={index}
            count={getCountForKeyword(keyword)}
            maxCount={maxCount}
            label={REVIEW_KEYWORD_LABELS[keyword]}
          />
        ))}
      </div>
      <DynamicProfileEditModal
        isOpen={profileModal.isOpen}
        onClose={profileModal.close}
      />
    </div>
  );
};

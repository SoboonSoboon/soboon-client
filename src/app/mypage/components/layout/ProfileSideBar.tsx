'use client';
import { Button, ProfileImg } from '@/components/Atoms';
import { ReviewItemBar } from './ReviewItemBar';
import { useState } from 'react';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { ReviewData } from '../../utils/review';
import { useModal } from '@/components/Molecules/modal';
import { ProfileEditModal } from './profileModal/ProfileEditModal';

interface ProfileSideBar {
  reviewData: ReviewData;
}

export const ProfileSideBar = ({ reviewData }: ProfileSideBar) => {
  const profileModal = useModal();
  const [reviews] = useState(reviewData);
  const userNickname = useAuthStore((state) => state.userNickname);
  const userImage = useAuthStore((state) => state.userImage);
  const userData = {
    keywords: [
      { keyword: 'TIME_PROMISE', count: 8 },
      { keyword: 'KIND_AND_CARING', count: 7 },
      { keyword: 'SAME_AS_PHOTO', count: 5 },
      { keyword: 'FAST_RESPONSE', count: 15 },
      { keyword: 'GOOD_DISTRIBUTION', count: 10 },
    ],
  };

  const KEYWORD_LABELS = {
    TIME_PROMISE: '시간을 잘 지켜요',
    KIND_AND_CARING: '친절해요',
    SAME_AS_PHOTO: '사진과 같아요',
    FAST_RESPONSE: '응답이 빨라요',
    GOOD_DISTRIBUTION: '적절하게 잘 분배했어요',
  } as const;

  // 리뷰 키워드 중 최대 count에 20% 여유를 더한 값 계산
  //const maxCount = Math.max(...reviews.keywords.map((k) => k.count)) * 1.2;
  const maxCountMock = Math.max(...userData.keywords.map((k) => k.count)) * 1.2;
  console.log(reviewData, 'data');
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
        {userData.keywords
          .filter((data) => data.count > 0)
          .map((data, index) => (
            <ReviewItemBar
              key={index}
              count={data.count}
              maxCount={maxCountMock}
              label={
                KEYWORD_LABELS[data.keyword as keyof typeof KEYWORD_LABELS]
              }
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

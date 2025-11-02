'use client';

import { useModal } from '@/components/Molecules';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { useReceivedReview } from '../../hook/api/useReceivedReview';
import { ProfileHeader } from './ProfileHeader';
import { ReviewSection } from './ReviewSection';
import dynamic from 'next/dynamic';

export const ProfileSideBar = () => {
  const profileModal = useModal();
  const userNickname = useAuthStore((state) => state.userNickname);
  const userImage = useAuthStore((state) => state.userImage);

  const { data: reviews } = useReceivedReview();

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
    <div className="border-gray-10 flex w-full flex-col gap-5 rounded-lg border bg-white p-8 md:px-8 md:py-15">
      <ProfileHeader
        userNickname={userNickname}
        userImage={userImage}
        onEditClick={profileModal.open}
      />

      <ReviewSection keywords={reviews?.data?.keywords || []} />

      <DynamicProfileEditModal
        isOpen={profileModal.isOpen}
        onClose={profileModal.close}
      />
    </div>
  );
};

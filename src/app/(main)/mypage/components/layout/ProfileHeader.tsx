'use client';

import { Button, ProfileImg } from '@/components/Atoms';
import { ProfileImageUploader } from './profileModal/profileImgUploader';

interface ProfileHeaderProps {
  userNickname: string | null;
  userImage: string | null;
  onEditClick: () => void;
}

export const ProfileHeader = ({
  userNickname,
  userImage,
  onEditClick,
}: ProfileHeaderProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2.5">
        {/* md 미만: ProfileImageUploader 사용 (수정 버튼 포함) */}
        <div className="md:hidden">
          <ProfileImageUploader
            imageUrl={userImage || ''}
            onClick={onEditClick}
          />
        </div>

        {/* md 이상: 프로필 이미지만 표시 */}
        <div className="hidden md:block">
          <ProfileImg profileImageUrl={userImage || ''} size={118} />
        </div>

        {userNickname ? (
          <h2 className="font-memomentKkukkkuk text-lg sm:text-xl lg:text-2xl">
            {userNickname}
          </h2>
        ) : (
          <div className="h-5.5 sm:h-7 lg:h-8" />
        )}
      </div>

      {/* md 이상에서만 보이는 프로필 수정 버튼 */}
      <div className="hidden md:block">
        <Button
          label="프로필 수정"
          aria-label="프로필 수정 버튼"
          variant="outline"
          className="w-full"
          onClick={onEditClick}
        />
      </div>
    </>
  );
};

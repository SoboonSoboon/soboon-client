'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '@/components/Molecules/modal';
import { Button, Dropdown, ProfileImg, TextInput } from '@/components';
import { ProfileUpdateData } from '@/app/mypage/utils/profile';

import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { useToast } from '@/components/Atoms/Toast/useToast';
import { useProfileEdit } from '@/app/mypage/hook/api/useProfileEdit';
import { ProfileImageUploader } from './profileImgUploader';
import {
  GET_MODEL_CITY_OPTIONS,
  GET_MODEL_DISTRICT_OPTIONS,
  MODEL_PROVINCE_OPTIONS,
} from '@/constants';
import z from 'zod';
import { EditIcon } from 'lucide-react';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const profileFormSchema = z.object({
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
  image: z.string(),
  location: z.object({
    province: z.string().min(1, { message: '주소를 선택해주세요.' }),
    city: z.string().min(1, { message: '주소를 선택해주세요.' }),
    district: z.string().min(1, { message: '주소를 선택해주세요.' }),
  }),
});
export const ProfileEditModal = ({
  isOpen,
  onClose,
}: ProfileEditModalProps) => {
  const userNickname = useAuthStore((state) => state.userNickname);
  const userImage = useAuthStore((state) => state.userImage);
  const userLocation = useAuthStore((state) => state.userLocation);

  const [formData, setFormData] = useState<ProfileUpdateData>(() => ({
    nickname: userNickname || '',
    image: userImage || '',
    province: userLocation.province || '',
    city: userLocation.city || '',
    district: userLocation.district || '',
    detail: userLocation.detail || '',
  }));

  const { updateProfile, isSubmitting } = useProfileEdit();
  const { success, error: showError } = useToast();

  const handleInputChange = (field: keyof ProfileUpdateData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('📝 폼 데이터:', formData);

    updateProfile(formData, {
      onSuccess: () => {
        success('프로필이 성공적으로 수정되었습니다!');
        onClose();
      },
      onError: () => {
        showError('프로필 수정에 실패했습니다.');
      },
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="custom"
      className="z-50"
      contentClassName="w-[510px] h-[572px] p-[52px]"
    >
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <div className="text-gray-95 text-2xl font-bold">프로필 편집</div>
        </div>
        {/* 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* 이미지 업로더 */}

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center">
              <div className="relative inline-block h-[128px] w-[128px]">
                {/* ProfileImg 컴포넌트 사용 */}
                <div className="flex items-center justify-center">
                  <ProfileImg profileImageUrl={''} size={120} />

                  {/* 연필 아이콘 (하단 오른쪽) */}
                  <div className="absolute right-1 bottom-1 w-[41px] not-first:h-[41px]">
                    <button className="bg-gray-5 flex h-full w-full items-center justify-center rounded-full border-2 border-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="19"
                        viewBox="0 0 13 19"
                        fill="none"
                      >
                        <path
                          d="M6.49279 0.259789C6.59736 0.0343314 6.86455 -0.0629171 7.08958 0.0425777L12.5425 2.59895C12.7675 2.70445 12.8652 2.97274 12.7606 3.19819L6.30959 17.1066C6.25867 17.2164 6.16576 17.3009 6.05183 17.341L2.08526 18.7365C1.85484 18.8175 1.6016 18.6988 1.51526 18.4693L0.0289234 14.5174C-0.0137666 14.4038 -0.00912756 14.278 0.0417932 14.1682L6.49279 0.259789Z"
                          fill="#C8C8C8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 숨겨진 파일 입력 */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={() => {}}
                />
              </div>
            </div>
            {/* 닉네임 */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-95 text-sm font-semibold">
                닉네임
              </label>
              <TextInput
                value={formData.nickname}
                onChange={(e) => handleInputChange('nickname', e.target.value)}
                placeholder="닉네임을 입력하세요"
                disabled={isSubmitting}
              />
            </div>
            {/* 관심지역 */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-semibold">관심 지역</label>

              <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-2.5">
                <div className="flex-1">
                  <Dropdown
                    name="location.province"
                    id="location.province"
                    options={MODEL_PROVINCE_OPTIONS}
                    value={formData.province}
                    onChange={(value) => handleInputChange('province', value)}
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    name="location.city"
                    id="location.city"
                    options={GET_MODEL_CITY_OPTIONS(formData.province)}
                    value={formData.city}
                    onChange={(value) => handleInputChange('city', value)}
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    name="location.district"
                    id="location.district"
                    options={GET_MODEL_DISTRICT_OPTIONS(formData.city)}
                    value={formData.district}
                    onChange={(value) => handleInputChange('district', value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="filled"
            label="수정하기"
            className="w-full"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </Modal>,
    document.body,
  );
};

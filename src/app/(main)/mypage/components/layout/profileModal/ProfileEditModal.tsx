'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '@/components/Molecules/modal';
import { Button, Dropdown, TextInput } from '@/components';
import { ProfileUpdateData } from '@/app/(main)/mypage/utils/profile';

import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { useToast } from '@/components/Atoms/Toast/useToast';
import { useProfileEdit } from '@/app/(main)/mypage/hook/api/useProfileEdit';
import { ProfileImageUploader } from './profileImgUploader';
import {
  GET_MODEL_CITY_OPTIONS,
  GET_MODEL_DISTRICT_OPTIONS,
  MODEL_PROVINCE_OPTIONS,
} from '@/constants';
import { imageUploader } from '@/utils/imageUploader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const profileFormSchema = z.object({
  nickname: z.string(),
  image: z.string(),
  province: z.string(),
  city: z.string(),
  district: z.string(),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

export const ProfileEditModal = ({
  isOpen,
  onClose,
}: ProfileEditModalProps) => {
  const userNickname = useAuthStore((state) => state.userNickname);
  const userImage = useAuthStore((state) => state.userImage);
  const userLocation = useAuthStore((state) => state.userLocation);

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<ProfileFormData>({
      resolver: zodResolver(profileFormSchema),
    });

  // 모달이 열릴 때마다 최신 전역 상태로 초기화
  useEffect(() => {
    if (isOpen) {
      reset({
        nickname: userNickname || '',
        image: userImage || '',
        province: userLocation.province || '',
        city: userLocation.city || '',
        district: userLocation.district || '',
      });
    }
  }, [isOpen, userNickname, userImage, userLocation, reset]);

  const { updateProfile, isSubmitting } = useProfileEdit();
  const { success, error: showError } = useToast();

  const watchProvince = watch('province');
  const watchCity = watch('city');
  const watchDistrict = watch('district');
  const watchImage = watch('image');

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrls = await imageUploader([file]);
      const uploadedUrl = imageUrls[0];
      setValue('image', uploadedUrl);
    } catch {
      showError('이미지 업로드에 실패했습니다.');
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    const submitData: ProfileUpdateData = {
      nickname: data.nickname || userNickname || '',
      image: data.image,
      province: data.province || '',
      city: data.city || '',
      district: data.district || '',
    };

    updateProfile(submitData, {
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
      contentClassName="w-full max-w-[510px] h-auto max-h-[90vh] p-4 sm:p-8 lg:p-[52px] mx-4"
    >
      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
        <div className="text-center">
          <div className="text-gray-95 text-xl font-bold sm:text-2xl">
            프로필 편집
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 sm:gap-8 lg:gap-10"
        >
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center justify-center">
              <ProfileImageUploader
                imageUrl={watchImage}
                onImageChange={handleImageChange}
              />
            </div>

            {/* 닉네임 */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-95 text-sm font-semibold">
                닉네임
              </label>
              <TextInput
                {...register('nickname')}
                placeholder={userNickname || '닉네임을 입력하세요'}
                disabled={isSubmitting}
                className="bg-gray-5 border-0"
              />
            </div>

            {/* 관심지역 */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-semibold">관심 지역</label>

              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-2.5">
                <div className="flex-1">
                  <Dropdown
                    name="province"
                    id="province"
                    options={MODEL_PROVINCE_OPTIONS}
                    value={watchProvince}
                    onChange={(value) => {
                      setValue('province', value);
                      setValue('city', '');
                      setValue('district', '');
                    }}
                    variant="gray"
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    name="city"
                    id="city"
                    options={GET_MODEL_CITY_OPTIONS(watchProvince)}
                    value={watchCity}
                    onChange={(value) => {
                      setValue('city', value);
                      setValue('district', '');
                    }}
                    variant="gray"
                  />
                </div>
                <div className="flex-1">
                  <Dropdown
                    name="district"
                    id="district"
                    options={GET_MODEL_DISTRICT_OPTIONS(watchCity)}
                    value={watchDistrict}
                    onChange={(value) => setValue('district', value)}
                    variant="gray"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
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

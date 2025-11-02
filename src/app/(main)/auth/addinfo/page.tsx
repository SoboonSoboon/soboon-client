'use client';

import { postMyProfileData } from '@/apis/auth/authApi';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { useProfile } from '@/apis/auth/hooks/useProfileData';
import { profileDataType } from '@/types/authType';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileForm from '../components/ProfileForm';
import Image from 'next/image';

const defaultImage = '/images/profile_default.svg';

export default function AddInfoPage() {
  const router = useRouter();
  const { data: profileData, isLoading, error } = useProfile();
  const [newData, setNewData] = useState<profileDataType>({
    nickname: '',
    image: '',
    province: '',
    city: '',
    district: '',
    detail: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await postMyProfileData(newData);

      if (response.message == '정보 입력 성공') {
        // Zustand 스토어 업데이트
        useAuthStore.setState({
          isLoggedIn: true,
          userId: newData.id,
          userName: newData.name,
          userNickname: newData.nickname,
          userImage: newData.image,
          userLocation: {
            province: newData.province!,
            city: newData.city!,
            district: newData.district!,
            detail: newData.detail,
          },
        });
        router.push('/dividing');
      }
    } catch (error) {
      console.log('저장 실패!');
      console.error('저장 오류:', error);
    }
  };

  useEffect(() => {
    if (profileData) {
      setNewData({
        id: profileData.id,
        name: profileData.name || '',
        nickname: profileData.nickname || profileData.name || '',
        image: profileData.image || defaultImage,
        province: profileData.province || '',
        city: profileData.city || '',
        district: profileData.district || '',
        detail: profileData.detail || '',
      });
    }
    console.log('프로필 데이터:', profileData);
  }, [profileData]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;
  if (!profileData) return <div>데이터가 없어요.</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-Green-5 absolute top-0 right-0 left-0 flex h-[347px] items-center justify-center">
        <div className="flex flex-col justify-center">
          <div className="mb-5">
            <Image
              src="/images/green_logo.png"
              alt="로고이미지"
              width={200}
              height={200}
              className="h-auto w-auto"
            />
          </div>
          <p className="text-center text-base font-normal text-gray-800">
            소분소분의 원활한 이용을 위해
            <br />새 프로필을 생성해 주세요.
          </p>
        </div>
      </div>

      {/* 프로필 입력폼 */}
      <div className="relative top-[279px] z-10 flex-1 px-4">
        <ProfileForm
          newData={newData}
          setNewData={setNewData}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

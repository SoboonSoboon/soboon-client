'use client';

import { postMyProfileData } from '@/apis/auth/authApi';
import { useAuthStore } from '@/apis/auth/hooks/authStore';
import { useProfile } from '@/apis/auth/hooks/useProfileData';
import { Button, Dropdown } from '@/components';
import {
  MODEL_PROVINCE_OPTIONS,
  GET_MODEL_CITY_OPTIONS,
  GET_MODEL_DISTRICT_OPTIONS,
} from '@/constants';
import { profileDataType } from '@/types/authType';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const defaultImage =
  'https://github.com/SoboonSoboon/soboon-client/blob/53fc79821c2d3598dabd6e0d5b21df0da774dd48/public/images/profile_default.svg';

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
        router.push('/sharing');
      }
    } catch (error) {
      console.log('저장 실패!');
      console.error('저장 오류:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewData({ ...newData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
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
  if (!profileData) return <div>데이터가 없습니다.</div>;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">프로필 만들기</h1>

        {/* 프로필 사진 */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-4">
            <Image
              src={newData.image || defaultImage}
              alt="프로필 미리보기"
              width={96}
              height={96}
              priority
              className="h-24 w-24 rounded-full border-2 border-gray-200 object-cover"
            />
            <label className="absolute right-0 bottom-0 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="bg-gray-20 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pencil h-4 w-4"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </div>
            </label>
          </div>
        </div>

        {/* 닉네임 */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">닉네임</h2>
          <input
            type="text"
            value={newData.nickname || ''}
            onChange={(e) =>
              setNewData({ ...newData, nickname: e.target.value })
            }
            placeholder="닉네임을 입력해주세요"
            className="bg-gray-5 w-full items-center rounded-xl border-2 border-transparent px-4 py-2.5 focus:outline-none"
          />
        </div>

        {/* 지역 선택 */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            지역 선택 (필수)
          </h2>

          <div className="direction-column flex space-x-3">
            <Dropdown
              name="province"
              id="province"
              required
              options={MODEL_PROVINCE_OPTIONS}
              value={newData.province || ''}
              onChange={(value) =>
                setNewData({
                  ...newData,
                  province: value,
                  city: '',
                  district: '',
                })
              }
            />
            <Dropdown
              name="city"
              id="city"
              required
              options={GET_MODEL_CITY_OPTIONS(newData.province)}
              value={newData.city || ''}
              onChange={(value) =>
                setNewData({ ...newData, city: value, district: '' })
              }
            />
            <Dropdown
              name="district"
              id="district"
              required
              options={GET_MODEL_DISTRICT_OPTIONS(newData.city)}
              value={newData.district || ''}
              onChange={(value) => setNewData({ ...newData, district: value })}
            />
          </div>
        </div>

        {/* 저장하기 버튼 */}
        <Button
          label="저장하기"
          onClick={handleSubmit}
          disabled={!newData.nickname?.trim()}
          className="w-full"
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}

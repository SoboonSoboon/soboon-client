import { Button, Dropdown } from '@/components';
import {
  MODEL_PROVINCE_OPTIONS,
  GET_MODEL_CITY_OPTIONS,
  GET_MODEL_DISTRICT_OPTIONS,
} from '@/constants';
import { profileDataType } from '@/types/authType';
import { cn } from '@/utils';
import Image from 'next/image';

const defaultImage =
  'https://github.com/SoboonSoboon/soboon-client/blob/53fc79821c2d3598dabd6e0d5b21df0da774dd48/public/images/profile_default.svg';

interface ProfileFormProps {
  newData: profileDataType;
  setNewData: (data: profileDataType) => void;
  onSubmit: () => void;
}

export default function ProfileForm({
  newData,
  setNewData,
  onSubmit,
}: ProfileFormProps) {
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

  return (
    <div className="outline-gray-10 mx-auto -mt-24 w-[510px] rounded-3xl bg-white p-[52px] outline">
      <p className="mb-8 text-center text-2xl font-bold text-gray-800">
        프로필 만들기
      </p>
      <div>
        {/* 프로필 사진 */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative mb-2">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-200">
              {newData.image && newData.image !== defaultImage ? (
                <Image
                  src={newData.image}
                  alt="프로필 미리보기"
                  width={96}
                  height={96}
                  priority
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              )}
            </div>
            <label className="absolute right-0 bottom-0 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </div>
            </label>
          </div>
        </div>

        {/* 닉네임 */}
        <div className="mb-6">
          <label className="text-text-main mb-2 block text-base font-semibold">
            닉네임
          </label>
          <input
            type="text"
            value={newData.nickname || ''}
            onChange={(e) =>
              setNewData({ ...newData, nickname: e.target.value })
            }
            placeholder="이름을 입력해주세요"
            className={cn(
              'w-full rounded-lg px-4 py-2.5 text-base outline-none',
              'hover:ring-Green-30 hover:ring-2',
              'focus:ring-primary focus:ring-2',
              newData.nickname
                ? 'outline-gray-5 bg-gray-5 outline-2'
                : 'bg-gray-5',
            )}
          />
        </div>

        {/* 관심 지역 */}
        <div>
          <label className="mb-2 block text-base font-semibold text-gray-900">
            관심 지역
          </label>
          <div className="flex gap-2">
            <Dropdown
              name="province"
              id="province"
              variant="form"
              required
              placeholder="지역 선택"
              options={MODEL_PROVINCE_OPTIONS}
              value={newData.province || ''}
              className="text-base font-medium"
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
              variant="form"
              placeholder="시/군/구"
              className="text-base font-medium"
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
              variant="form"
              placeholder="동/읍/면"
              className="text-base font-medium"
              options={GET_MODEL_DISTRICT_OPTIONS(newData.city)}
              value={newData.district || ''}
              onChange={(value) => setNewData({ ...newData, district: value })}
            />
          </div>
        </div>
      </div>
      {/* 확인 버튼 */}
      <Button
        label="확인"
        onClick={onSubmit}
        disabled={
          !newData.nickname?.trim() ||
          !newData.province ||
          !newData.city ||
          !newData.district
        }
        className="hover:bg-Green-60 disabled:bg-gray-30 click:bg-Green-70 bg-primary mt-10 w-full rounded-lg py-3 font-semibold text-white disabled:cursor-not-allowed"
      >
        확인
      </Button>
    </div>
  );
}

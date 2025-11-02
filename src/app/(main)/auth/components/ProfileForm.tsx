import { Button } from '@/components/Atoms';
import { Dropdown } from '@/components/Molecules';
import {
  MODEL_PROVINCE_OPTIONS,
  GET_MODEL_CITY_OPTIONS,
  GET_MODEL_DISTRICT_OPTIONS,
} from '@/constants';
import { profileDataType } from '@/types/authType';
import { cn, imageUploader } from '@/utils';
import { ProfileImageUploader } from '../../mypage/components/layout/profileModal/profileImgUploader';

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
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrls = await imageUploader([file]);
      const uploadedUrl = imageUrls[0];

      setNewData({ ...newData, image: uploadedUrl });
    } catch (error) {
      console.error('이미지 업로드에 실패했어요.', error);
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
            <ProfileImageUploader
              imageUrl={newData.image || defaultImage}
              onImageChange={handleImageChange}
            />
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
            placeholder="이름을 입력해 주세요"
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
        aria-label="확인"
        onClick={onSubmit}
        disabled={
          !newData.nickname?.trim() ||
          !newData.province ||
          !newData.city ||
          !newData.district
        }
        className="hover:bg-Green-60 disabled:bg-gray-30 click:bg-Green-70 bg-primary mt-10 w-full rounded-lg py-3 font-semibold text-white disabled:cursor-not-allowed"
      />
    </div>
  );
}

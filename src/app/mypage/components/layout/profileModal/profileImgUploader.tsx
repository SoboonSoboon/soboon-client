import { useRef } from 'react';
import { ProfileImg } from '@/components';

interface ProfileImageUploader {
  imageUrl: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileImageUploader = ({
  imageUrl,
  onImageChange,
}: ProfileImageUploader) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="relative inline-block h-[128px] w-[128px] cursor-pointer"
      onClick={handleButtonClick}
    >
      {/* ProfileImg 컴포넌트 사용 */}
      <div className="flex items-center justify-center">
        <ProfileImg profileImageUrl={imageUrl} size={120} />

        {/* 연필 아이콘 (하단 오른쪽) */}
        <div className="absolute right-1 bottom-1 h-[41px] w-[41px]">
          <button
            type="button"
            className="bg-gray-5 flex h-full w-full items-center justify-center rounded-full border-2 border-white"
          >
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
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageChange}
      />
    </div>
  );
};

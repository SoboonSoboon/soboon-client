import { ProfileImg } from '@/components';

interface ProfileImageUploader {
  imageUrl: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileImageUploader = ({
  imageUrl,
  onImageChange,
}: ProfileImageUploader) => {
  return (
    <div className="relative inline-block h-[128px] w-[128px]">
      {/* ProfileImg 컴포넌트 사용 */}
      <div className="flex items-center justify-center">
        <ProfileImg profileImageUrl={imageUrl} size={118} />
        {/* 연필 아이콘 (하단 오른쪽) */}
        <div className="absolute right-0 bottom-0">
          <button className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
            >
              <path
                d="M7.95592 0.408226C8.06049 0.182769 8.32768 0.0855204 8.55271 0.191015L14.0056 2.74739C14.2306 2.85288 14.3283 3.12117 14.2237 3.34663L7.77273 17.2551C7.72181 17.3648 7.6289 17.4493 7.51497 17.4894L3.5484 18.8849C3.31798 18.966 3.06473 18.8473 2.97839 18.6177L1.49206 14.6658C1.44937 14.5523 1.45401 14.4264 1.50493 14.3167L7.95592 0.408226Z"
                fill="#C8C8C8"
              />
              <path
                d="M3.4187 1.36523L15.636 7.09721"
                stroke="#F5F5F5"
                stroke-width="0.5625"
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
        onChange={onImageChange}
      />
    </div>
  );
};

import Image from 'next/image';
import { Button } from '@/components';

export const DetailAside = () => {
  return (
    <aside className="w-[430px]">
      <div className="flex w-full justify-between">
        <div className="w-[90%]">
          <h2 className="font-memomentKkukkkuk mb-2 line-clamp-2 text-2xl">
            장인약과 4팩 반띵하실 분 계신가요? 글 제목 2줄 이상일 경우는 이렇게
            내려오게 됩니다
          </h2>
          <div className="flex items-center gap-2">
            {/* 추후 공용 컴포넌트 수정 후 교체 예정 */}
            <Image
              src={'/images/dummy_profile.png'}
              alt="profile"
              width={24}
              height={24}
              className="border-text-sub2 h-6 w-6 rounded-full border object-cover"
            />
            <span className="text-text-sub2">빵빵이와 옥지</span>
          </div>
        </div>
        <div>
          {/* 추후 아이콘 라이브러리 교체 예정 */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="6" r="2" fill="#BCBCBC" />
            <circle cx="12" cy="12" r="2" fill="#BCBCBC" />
            <circle cx="12" cy="18" r="2" fill="#BCBCBC" />
          </svg>
        </div>
      </div>

      <div className="bg-gray-10 my-5 h-[1px] w-full"></div>

      <div className="mb-5 flex w-full justify-between">
        <div className="flex items-center gap-1">
          {/* 추후 아이콘 라이브러리 교체 예정 */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="#000000"
            />
          </svg>
          <p>중곡역</p>
        </div>
        <div>
          <p>
            <span className="text-primary">3/5</span>명 모집중
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          label="찜"
          className="border-primary text-primary w-20 shrink-0"
        />
        <Button
          label="모임 신청"
          className="w-full text-white"
          backgroundColor="#ff4805"
        />
      </div>
    </aside>
  );
};

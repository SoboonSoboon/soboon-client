import Image from 'next/image';
import { Button } from '@/components';
import { EllipsisVertical, MapPin } from 'lucide-react';

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
          <EllipsisVertical className="text-gray-30 size-6" />
        </div>
      </div>

      <div className="bg-gray-10 my-5 h-[1px] w-full"></div>

      <div className="mb-5 flex w-full justify-between">
        <div className="flex items-center gap-1">
          <MapPin className="size-6" />
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

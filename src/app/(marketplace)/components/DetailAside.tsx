'use client';

import Image from 'next/image';
import { Button, StatusTag } from '@/components';
import { EllipsisVertical, MapPin, Bookmark } from 'lucide-react';
import { useState, useRef } from 'react';
import { ActionMenu } from './ActionMenu/ActionMenu';

interface DetailAsideProps {
  title: string;
  detail_address: string;
  current_member: number;
  total_member: number;
}

export const DetailAside = ({
  title,
  detail_address,
  current_member,
  total_member,
}: DetailAsideProps) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <aside className="flex w-[430px] flex-col gap-5">
      <div className="flex w-full justify-between">
        {/* 상태 바 */}
        <div>
          <StatusTag status="RECRUITING" />
        </div>

        {/* 아이콘 버튼 */}
        <div className="relative flex cursor-pointer justify-center">
          <div className="flex justify-center p-1.5">
            <Bookmark className="text-gray-30 size-6" />
          </div>
          <div
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="flex cursor-pointer rounded-lg p-1.5 hover:bg-[var(--GrayScale-Gray5)]"
          >
            <EllipsisVertical className="text-gray-30 size-6" />
          </div>
          {open && (
            <div className="absolute top-8 right-0 z-50">
              <ActionMenu
                onClose={() => setOpen(false)}
                buttonRef={buttonRef as React.RefObject<HTMLElement>}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-memomentKkukkkuk line-clamp-2 text-2xl">{title}</h2>
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

      <div className="bg-gray-10 h-[1px] w-full"></div>

      <div className="flex w-full justify-between">
        <div className="flex items-center gap-1">
          <MapPin className="size-6" />
          <p>{detail_address}</p>
        </div>
        <div>
          <p>
            <span className="text-primary">
              {current_member}&nbsp;/&nbsp;{total_member}
            </span>
            &nbsp;명 모집중
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

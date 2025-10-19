import Image from 'next/image';
import { Button, ProfileImg } from '@/components';
import { EllipsisVertical, MapPin } from 'lucide-react';
import { ApplicantsMemberType } from '@/types/applicantsType';

interface DetailAsideProps {
  title: string;
  detail_address: string;
  current_member: number;
  total_member: number;
  isAuthor: boolean;
  participants: ApplicantsMemberType['data'][];
}

export const DetailAside = ({
  title,
  detail_address,
  current_member,
  total_member,
  isAuthor,
  participants,
}: DetailAsideProps) => {
  return (
    <aside className="w-[430px]">
      <div className="flex w-full justify-between">
        <div className="w-[90%]">
          <h2 className="font-memomentKkukkkuk mb-2 line-clamp-2 text-2xl">
            {title}
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
          <p>{detail_address}</p>
        </div>
        {!isAuthor && (
          <div>
            <p>
              <span className="text-primary">
                {current_member}&nbsp;/&nbsp;{total_member}
              </span>
              &nbsp;명 모집중
            </p>
          </div>
        )}
      </div>

      {!isAuthor && (
        <div className="mb-5 flex gap-3">
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
      )}

      {isAuthor && (
        <div className="border-gray-10 mb-5 w-full rounded-xl border bg-white">
          {participants.length === 0 ? (
            <div className="text-text-sub2 flex min-h-[143px] items-center justify-center">
              <p>아직 참여 신청한 사람이 없어요 .. !</p>
            </div>
          ) : (
            participants.map((participant) => (
              <div
                key={participant.participantId}
                className="flex items-center justify-between px-6 py-3"
              >
                <div className="flex items-center gap-2 py-2">
                  <ProfileImg
                    profileImageUrl={participant.profileImageUrl}
                    size={32}
                  />
                  <p>{participant.userNickname}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    label="수락"
                    className="text-primary border-primary px-3 py-2.5"
                  />
                  <Button
                    label="거절"
                    className="border-text-sub1 text-text-sub1 px-3 py-2.5"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {isAuthor && (
        <Button
          label="모임 마감"
          className="w-full text-white"
          backgroundColor="#ff4805"
        />
      )}
    </aside>
  );
};

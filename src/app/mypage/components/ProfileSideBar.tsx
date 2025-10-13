import Image from 'next/image';
import { KeyWordBar } from './keyWordBarCard';

export const ProfileSideBar = () => {
  const userData = {
    nickname: '그린데이즈',
    Image: '',
    keywords: [
      {
        keyword: 'TIME_PROMISE',
        count: 8,
      },
      {
        keyword: 'KIND_AND_CARING',
        count: 7,
      },
      {
        keyword: 'SAME_AS_PHOTO',
        count: 5,
      },
    ],
  };
  const keywordLabels = {
    TIME_PROMISE: '시간을 잘 지켜요',
    KIND_AND_CARING: '친절해요',
    SAME_AS_PHOTO: '사진과 같아요',
  } as const;
  return (
    <div className="border-gray-10 w-full rounded-lg border bg-white px-10 py-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="h-[118px] w-[118px] overflow-hidden rounded-full border-none">
            {userData.Image ? (
              <Image
                src={userData.Image}
                alt="user"
                width={118}
                height={118}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="bg-gray-5 h-full w-full rounded-full" />
            )}
          </div>
          <div className="flex items-center text-justify">
            <p>{userData.nickname}</p>
          </div>
        </div>
        {userData.keywords.map((data, index) => (
          <KeyWordBar
            count={data.count}
            key={index}
            label={keywordLabels[data.keyword as keyof typeof keywordLabels]}
          />
        ))}
      </div>
    </div>
  );
};

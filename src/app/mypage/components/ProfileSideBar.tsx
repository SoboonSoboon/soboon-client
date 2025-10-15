import Image from 'next/image';
import { ReviewItemBar } from './layout/ReviewItemBar';

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

  const KEYWORD_LABELS = {
    TIME_PROMISE: '시간을 잘 지켜요',
    KIND_AND_CARING: '친절해요',
    SAME_AS_PHOTO: '사진과 같아요',
    FAST_RESPONSE: '응답이 빨라요',
    GOOD_DISTRIBUTION: '적절하게 잘 분배했어요',
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

        <div className="flex flex-col gap-4">
          {userData.keywords.map((data, index) => (
            <ReviewItemBar
              count={data.count}
              key={index}
              label={
                KEYWORD_LABELS[data.keyword as keyof typeof KEYWORD_LABELS]
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

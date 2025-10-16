import { ProfileImg } from '@/components/Atoms';
import { ReviewItemBar } from './ReviewItemBar';

export const ProfileSideBar = () => {
  const userData = {
    nickname: '그린데이즈',
    Image: '',
    keywords: [
      { keyword: 'TIME_PROMISE', count: 8 },
      { keyword: 'KIND_AND_CARING', count: 7 },
      { keyword: 'SAME_AS_PHOTO', count: 5 },
      { keyword: 'FAST_RESPONSE', count: 0 },
      { keyword: 'GOOD_DISTRIBUTION', count: 10 },
    ],
  };

  const KEYWORD_LABELS = {
    TIME_PROMISE: '시간을 잘 지켜요',
    KIND_AND_CARING: '친절해요',
    SAME_AS_PHOTO: '사진과 같아요',
    FAST_RESPONSE: '응답이 빨라요',
    GOOD_DISTRIBUTION: '적절하게 잘 분배했어요',
  } as const;

  // 리뷰 키워드 중 최대 count에 20% 여유를 더한 값 계산
  const maxCount = Math.max(...userData.keywords.map((k) => k.count)) * 1.2;

  return (
    <div className="border-gray-10 flex w-full flex-col gap-5 rounded-lg border bg-white px-8 py-15">
      <div className="flex flex-col items-center justify-center gap-2.5">
        <ProfileImg profileImageUrl={userData.Image} size={118} />
        <h2 className="font-memomentKkukkkuk text-2xl">{userData.nickname}</h2>
      </div>

      <div className="flex flex-col gap-4">
        {userData.keywords
          .filter((data) => data.count > 0)
          .map((data, index) => (
            <ReviewItemBar
              key={index}
              count={data.count}
              maxCount={maxCount}
              label={
                KEYWORD_LABELS[data.keyword as keyof typeof KEYWORD_LABELS]
              }
            />
          ))}
      </div>
    </div>
  );
};

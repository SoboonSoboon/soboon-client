import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardTitle,
  LikeButton,
} from '@/components';

const LocationIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ShoppingListSection = () => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card className="" height="auto" width="auto" key={index}>
          <CardContent>
            <LikeButton />
            <CardImage
              alt="기본 카드"
              src="/images/item_dummy_image.png"
              className="h-[200px] w-full"
            />
            <div className="mb-2 flex items-center gap-1 text-sm">
              <LocationIcon />
              <p>성수역</p>
            </div>
            <CardTitle className="font-memomentKkukkkuk line-clamp-1">
              비건 집밥러 건대 이마트에서 장볼건데 무 반띵하실 분?!
            </CardTitle>
          </CardContent>
          <CardFooter className="text-text-sub2 text-sm">
            <span>빵빵이와 옥지</span> <span>1시간 전</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

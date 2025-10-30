import { Button } from '@/components';
import Image from 'next/image';

export const ErrorPage = () => {
  const onButtonClick = () => (window.location.href = '/');

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20">
      <Image
        src="/images/error_400_image.svg"
        alt="에러 이미지"
        width={200}
        height={200}
        className="mx-auto"
      />

      <p className="leading-tight font-semibold">
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 주소가 올바른지 확인해주세요.
      </p>
      <Button label="홈으로" onClick={onButtonClick} variant="outline" />
    </div>
  );
};

import { Button } from '@/components/Atoms';
import Image from 'next/image';

export const ServerErrorPage = () => {
  const onButtonClick = () => (window.location.href = '/');

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20">
      <Image
        src="/images/error_500_image.svg"
        alt="서버 에러 이미지"
        width={200}
        height={200}
        className="mx-auto"
      />

      <p>
        서버가 잠시 멈췄습니다.
        <br />
        기술팀이 달려가고 있어요!
      </p>
      <Button label="홈으로" onClick={onButtonClick} variant="outline" />
    </div>
  );
};

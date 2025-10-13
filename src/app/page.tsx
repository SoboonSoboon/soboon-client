import { Button } from '@/components';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="mx-auto w-[1200px]">
      <div className="direction-row flex items-center justify-between pt-[100px]">
        <div>
          <h1 className="weight-400 leading-1.2 text-[54px]">
            함께 사서, <br />
            알뜰하게 나누는 소비
          </h1>
          <p className="weight-400 my-6">
            대용량 제품을 같이 사서, 필요한 만큼만 소분해요.
          </p>
          <Button primary label="시작하기" className="mt-[45px]" />
        </div>
        <Image
          className="rounded-[60px]"
          src="/images/soboon-tokki.png"
          alt="Main Image"
          width={534}
          height={509}
        />
      </div>
    </div>
  );
}

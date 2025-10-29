import Image from 'next/image';

export const IntroScroll = () => {
  return (
    <div className="from-gray-90 w-full bg-gradient-to-b to-black pb-[195px]">
      <div className="pt-[131px]">
        <div className="flex items-center justify-end gap-[160px] pr-[181px]">
          <strong className="font-memomentKkukkkuk text-[54px] font-normal text-[#fff]">
            대용량으로 사니까 비싸고
          </strong>
          <Image
            src="/images/intro_image1.png"
            alt="intro-scroll"
            width={376}
            height={445}
          />
        </div>
      </div>

      <div className="pt-[131px]">
        <div className="flex items-center justify-start gap-[160px] pl-[181px]">
          <Image
            src="/images/intro_image2.png"
            alt="intro-scroll"
            width={376}
            height={445}
          />
          <strong className="font-memomentKkukkkuk text-[54px] font-normal text-[#fff]">
            못 먹어서 상하거나 안쓰는 짐되고
          </strong>
        </div>
      </div>

      <div className="pt-[131px]">
        <div className="flex items-center justify-end gap-[160px] pr-[181px]">
          <strong className="font-memomentKkukkkuk text-[54px] font-normal text-[#fff]">
            버리는 것까지 비용이죠
          </strong>
          <Image
            src="/images/intro_image3.png"
            alt="intro-scroll"
            width={376}
            height={445}
          />
        </div>
      </div>

      <div className="pt-[367px]">
        <div className="flex justify-center">
          <strong className="font-memomentKkukkkuk text-[54px] font-normal text-[#fff]">
            이런 물건 관리 이제 그만!
          </strong>
        </div>
      </div>
    </div>
  );
};

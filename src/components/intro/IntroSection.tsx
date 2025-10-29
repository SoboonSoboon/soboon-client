import Image from 'next/image';

export const IntroSection = () => {
  return (
    <div className="relative h-[calc(100vh-195px)]">
      <div className="mt-[130px] flex flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-[44px] text-[#000]">
          함께 사서, <br />
          알뜰하게 나누는 소비
        </h1>
        <Image
          src="/images/green_logo.png"
          alt="intro-section"
          width={250}
          height={70}
          className="mb-7.5"
        />
        <p>대용량 제품을 같이 사서, 필요한 만큼만 소분해요.</p>
      </div>

      <Image
        src="/images/intro_people1.png"
        alt="intro-section"
        width={417}
        height={334}
        className="absolute bottom-[120px] left-[464px] z-2"
      />
      <Image
        src="/images/intro_people2.png"
        alt="intro-section"
        width={630}
        height={360}
        className="absolute right-[400px] bottom-[84px] z-2 rotate-3"
      />

      <div className="absolute bottom-0 z-1 h-[195px] w-full bg-[var(--GreenScale-Green10)]"></div>
    </div>
  );
};

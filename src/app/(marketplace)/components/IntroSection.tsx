import Image from 'next/image';

export const IntroSection = () => {
  return (
    <div className="border-gray-10 mb-8 flex h-[250px] w-full items-center justify-between overflow-hidden rounded-lg border-1 bg-white p-6 px-[6rem]">
      <div className="flex h-full flex-col justify-center gap-5">
        <p className="text-text-main font-memomentKkukkkuk text-2xl">
          함께하면 더 알뜰하니까!
        </p>
        <h2 className="text-text-main text-4xl font-normal">
          지금 모임에 참여해보세요!
        </h2>
      </div>

      <div className="pr-18">
        <Image
          src="/images/soboon-rabbit.png"
          alt="intro-section"
          width={270}
          height={270}
        />
      </div>
    </div>
  );
};

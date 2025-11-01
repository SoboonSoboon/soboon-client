import Image from 'next/image';
import { cn } from '@/utils/cn';

interface BannerProps {
  title: string;
  src: string;
  alt: string;
  className?: string;
  imageTopClassName?: string;
}

export const Banner = ({
  title,
  src,
  alt,
  className,
  imageTopClassName,
}: BannerProps) => {
  return (
    <div
      className={cn(
        'border-gray-10 bg-gray-5 relative flex w-full overflow-hidden rounded-lg border',
        'h-[312px] sm:h-[160px] md:h-[180px] lg:h-[200px]',
        'px-8 sm:px-[26px] md:px-[36px] lg:px-[50px] xl:px-[98px]',
        className,
      )}
    >
      <div className="z-10 flex flex-col gap-1 pt-[35px] sm:justify-center sm:gap-2 sm:pt-0 md:gap-3 lg:gap-4 xl:gap-5">
        <p className="text-text-main font-memomentKkukkkuk text-[20px] sm:text-lg md:text-xl lg:text-2xl">
          함께하면 더 알뜰하니까!
        </p>
        <h2 className="font-memomentKkukkkuk text-[28px] md:text-3xl lg:text-4xl">
          지금
          <strong className="text-primary font-memomentKkukkkuk">{` ${title} `}</strong>
          모임에 참여해 보세요!
        </h2>
      </div>
      <div className="absolute"></div>
      <Image
        src={src}
        alt={alt}
        width={423}
        height={423}
        className={cn(
          'absolute',
          'top-[115px] left-1/2 -translate-x-1/2 sm:top-auto sm:left-auto sm:translate-x-0',
          'sm:right-[-8px] md:right-[28px] lg:right-[58px] xl:right-[98px]',
          'w-[305px] sm:w-[340px] md:w-[380px] lg:w-[423px]',
          imageTopClassName,
        )}
      />
    </div>
  );
};

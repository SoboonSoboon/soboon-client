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
        'h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px]',
        'px-7 sm:px-[26px] md:px-[36px] lg:px-[50px] xl:px-[98px]',
        className,
      )}
    >
      <div className="z-10 flex flex-col justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5">
        <p className="text-text-main font-memomentKkukkkuk text-base sm:text-lg md:text-xl lg:text-2xl">
          함께하면 더 알뜰하니까!
        </p>
        <h2 className="font-memomentKkukkkuk text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          지금
          <strong className="text-primary font-memomentKkukkkuk">{` ${title} `}</strong>
          모임에 <br className="block sm:hidden" />
          참여해 보세요!
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
          'right-[-16px] sm:right-[-8px] md:right-[28px] lg:right-[58px] xl:right-[98px]',
          'w-[240px] sm:w-[340px] md:w-[380px] lg:w-[423px]',
          imageTopClassName,
        )}
      />
    </div>
  );
};

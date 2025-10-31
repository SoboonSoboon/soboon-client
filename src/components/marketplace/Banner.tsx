import Image from 'next/image';
import { cn } from '@/utils/cn';

interface BannerProps {
  title: string;
  src: string;
  alt: string;
  className?: string;
}

export const Banner = ({ title, src, alt, className }: BannerProps) => {
  return (
    <div
      className={cn(
        'border-gray-10 bg-gray-5 relative flex h-[100px] w-full overflow-hidden rounded-lg border px-4 sm:h-[140px] sm:px-10 md:px-18 lg:h-[200px] lg:px-[98px]',
        className,
      )}
    >
      <div className="z-10 flex flex-col justify-center gap-2 sm:gap-[19px]">
        <p className="text-text-main font-memomentKkukkkuk text-2xl">
          함께하면 더 알뜰하니까!
        </p>
        <h2 className="font-memomentKkukkkuk text-4xl">
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
        className="absolute right-[16px] w-[180px] sm:right-[32px] sm:w-[260px] lg:right-[98px] lg:w-[423px]"
      />
    </div>
  );
};

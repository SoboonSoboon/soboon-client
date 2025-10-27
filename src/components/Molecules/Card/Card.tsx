'use client';

import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import { Bookmark } from 'lucide-react';
import { cn } from '@/utils/cn';

interface cardContentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardProps extends cardContentProps {
  onClick?: () => void;
  href?: string;
}

interface cardImageProps {
  className?: string;
  src: string;
  alt: string;
}

const BookmarkButtonComponent = memo(
  ({
    liked = false,
    onChange,
    className,
  }: {
    liked?: boolean;
    onChange?: (liked: boolean) => void;
    className?: string;
  }) => {
    const [isLiked, setIsLiked] = useState(liked);

    useEffect(() => {
      setIsLiked(liked);
    }, [liked]);

    const handleLike = (e: React.MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      const next = !isLiked;
      setIsLiked(next);
      onChange?.(next);
    };

    return (
      <Bookmark
        className={`absolute top-4 right-4 size-6.5 cursor-pointer duration-300 hover:scale-110 ${className}`}
        onClick={(e: React.MouseEvent<SVGSVGElement>) => handleLike(e)}
        fill={isLiked ? 'var(--color-primary)' : 'var(--color-gray-40)'}
        stroke={isLiked ? 'var(--color-primary)' : 'var(--color-gray-40)'}
      />
    );
  },
);

BookmarkButtonComponent.displayName = 'BookmarkButton';
export const BookmarkButton = BookmarkButtonComponent;

export const Card = ({ className, children, onClick, href }: CardProps) => {
  if (href) {
    return (
      <a href={href} className={`${className} block select-none`}>
        {children}
      </a>
    );
  }

  return (
    <div className={`${className} select-none`} onClick={onClick}>
      {children}
    </div>
  );
};

// todo: 이미지 로드 실패 시 대체 이미지 표시 기능 추가
export const CardImage = ({ className, src, alt }: cardImageProps) => {
  return (
    <Image
      src={src || '/images/notFound_image.png'}
      alt={alt}
      width={276}
      height={200}
      className={`${className} h-[200px] w-full rounded-lg object-cover`}
    />
  );
};

export const CardTitle = ({
  className,
  children,
  status,
}: cardContentProps & {
  status?: 'RECRUITING';
}) => {
  return (
    <h3
      className={cn(
        `${className} text-2xl`,
        status === 'RECRUITING' ? 'text-text-main' : 'text-text-sub2',
      )}
    >
      {children}
    </h3>
  );
};

export const CardSubtitle = ({ className, children }: cardContentProps) => {
  return <p className={`${className} text-[#1a1a1a]`}>{children}</p>;
};

export const CardContent = ({ className, children }: cardContentProps) => {
  return <div className={`${className} relative text-left`}>{children}</div>;
};

export const CardFooter = ({ className, children }: cardContentProps) => {
  return <div className={className}>{children}</div>;
};

export const Line = ({ className }: cardContentProps) => {
  return <div className={`${className} h-[1px] w-full bg-gray-200`}></div>;
};

interface mainCardProps {
  classname?: string;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
}

export const MainCard = ({
  classname,
  image,
  alt,
  title,
  subtitle,
}: mainCardProps) => {
  return (
    <>
      <Card className={classname}>
        <CardContent>
          <BookmarkButton />
          <CardImage src={image} alt={alt} />
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{subtitle}</CardSubtitle>
        </CardContent>
        <Line />
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

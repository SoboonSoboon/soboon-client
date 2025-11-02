'use client';

import { Button } from '@/components/Atoms';
import Image from 'next/image';

export interface MainEmptyStateProps {
  title?: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
    variant?: 'filled' | 'outline';
  };
  secondaryButton?: {
    text: string;
    href: string;
    variant?: 'filled' | 'outline';
  };
  padding?: 'py-[52px]' | 'py-20';
}

export const MainEmptyState = (props: MainEmptyStateProps) => {
  const {
    title,
    description,
    primaryButton,
    secondaryButton,
    padding = 'py-20',
  } = props;

  return (
    <div className={`flex flex-col items-center justify-center ${padding}`}>
      <div className="flex flex-col items-center justify-center text-center">
        <Image
          src="/images/empty_image.svg"
          alt="빈 데이터 이미지"
          width={200}
          height={200}
          className="mx-auto"
        />
        {title && (
          <h3 className="text-text-main mb-2 text-lg font-semibold">{title}</h3>
        )}
        <p className="mb-8">{description}</p>
      </div>
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => (window.location.href = primaryButton.href)}
          variant={primaryButton.variant || 'filled'}
          className="w-[256px]"
          aria-label={primaryButton.text}
        >
          {primaryButton.text}
        </Button>

        {secondaryButton && (
          <Button
            onClick={() => (window.location.href = secondaryButton.href)}
            variant={secondaryButton.variant || 'outline'}
            aria-label={secondaryButton.text}
          >
            {secondaryButton.text}
          </Button>
        )}
      </div>
    </div>
  );
};

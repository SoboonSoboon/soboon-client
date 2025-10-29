'use client';

import { Button } from '@/components';
import {
  type MainTabType,
  type SubTabType,
} from '@/app/mypage/utils/mypageType';
import { EMPTY_STATE_CONFIG } from './constants';
import Image from 'next/image';

// 메인 페이지 장보기용 Props
export interface MainShoppingEmptyStateProps {
  title: string;
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
}

// 메인 페이지 소분하기용 Props
export interface MainDividingEmptyStateProps {
  title: string;
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
}

// 마이페이지용 Props
export interface MyPageEmptyStateProps {
  // 메인 탭 (host, participate, bookmark)
  mainTab: 'host' | 'participate' | 'bookmark';
  // 서브 탭 (shopping, dividing)
  subTab: 'shopping' | 'dividing';
  // 기존 호환성을 위한 props
  activeMainTab?: MainTabType;
  activeSubTab?: SubTabType;
}

// Union Type으로 세 가지 사용법 지원
export type EmptyStateProps =
  | ({ type: 'main-shopping' } & MainShoppingEmptyStateProps)
  | ({ type: 'main-dividing' } & MainDividingEmptyStateProps)
  | ({ type: 'mypage' } & MyPageEmptyStateProps);

export const EmptyState = (props: EmptyStateProps) => {
  // py 값 결정
  const getPaddingClass = () => {
    switch (props.type) {
      case 'main-shopping':
        return 'py-[52px]';
      case 'main-dividing':
        return 'py-20';
      case 'mypage':
        return 'py-20';
      default:
        return 'py-20';
    }
  };

  if (props.type === 'main-shopping' || props.type === 'main-dividing') {
    const { title, description, primaryButton, secondaryButton } = props;

    return (
      <div
        className={`flex flex-col items-center justify-center ${getPaddingClass()}`}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/images/empty_image.png"
            alt="빈 데이터 이미지"
            width={200}
            height={200}
            className="mx-auto"
          />
          <div className="mb-8 flex flex-col items-center justify-center gap-2">
            <h3 className="text-text-main text-xl font-semibold">{title}</h3>
            <p className="text-text-sub2 text-sm leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => (window.location.href = primaryButton.href)}
            variant={primaryButton.variant || 'filled'}
          >
            {primaryButton.text}
          </Button>

          {secondaryButton && (
            <Button
              onClick={() => (window.location.href = secondaryButton.href)}
              variant={secondaryButton.variant || 'outline'}
            >
              {secondaryButton.text}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // MyPage 로직
  const { mainTab, subTab, activeMainTab, activeSubTab } = props;

  const getEmptyContent = () => {
    // 기존 props와 새로운 props 모두 지원
    const currentMainTab =
      mainTab ||
      (activeMainTab === 'host'
        ? 'host'
        : activeMainTab === 'participate'
          ? 'participate'
          : activeMainTab === 'bookmark'
            ? 'bookmark'
            : 'participate');
    const currentSubTab =
      subTab ||
      (activeSubTab === 'SHOPPING'
        ? 'shopping'
        : activeSubTab === 'DIVIDING'
          ? 'dividing'
          : 'shopping');

    const isHost = currentMainTab === 'host';

    // 상수에서 값 가져오기
    const prefix = EMPTY_STATE_CONFIG.TAB_PREFIX[currentMainTab];
    const title = EMPTY_STATE_CONFIG.TITLE_TEMPLATE[currentSubTab].replace(
      '{prefix}',
      prefix,
    );
    const description =
      EMPTY_STATE_CONFIG.DESCRIPTION_TEMPLATE[currentSubTab][currentMainTab];

    const buttonText = isHost
      ? EMPTY_STATE_CONFIG.BUTTON_TEXT[currentSubTab].create
      : EMPTY_STATE_CONFIG.BUTTON_TEXT[currentSubTab].browse;

    const buttonRoute = isHost
      ? EMPTY_STATE_CONFIG.ROUTES[currentSubTab].create
      : EMPTY_STATE_CONFIG.ROUTES[currentSubTab].browse;

    return {
      title,
      description,
      primaryButton: {
        text: buttonText,
        action: () => (window.location.href = buttonRoute),
        variant: 'filled' as const,
      },
    };
  };

  const content = getEmptyContent();

  return (
    <div
      className={`flex flex-col items-center justify-center ${getPaddingClass()}`}
    >
      <div className="text-center">
        <Image
          src="/images/empty_image.png"
          alt="빈 상태 이미지"
          width={200}
          height={200}
          className="mx-auto"
        />
        <h3 className="text-text-main mb-2 text-xl font-semibold">
          {content.title}
        </h3>
        <p className="text-text-sub2 mb-8 text-sm leading-relaxed whitespace-pre-line">
          {content.description}
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={content.primaryButton.action}
            variant={content.primaryButton.variant}
          >
            {content.primaryButton.text}
          </Button>
        </div>
      </div>
    </div>
  );
};

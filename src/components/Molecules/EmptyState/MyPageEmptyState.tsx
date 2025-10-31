'use client';

import { Button } from '@/components';
import {
  type MainTabType,
  type SubTabType,
} from '@/app/(main)/mypage/utils/mypageType';
import { EMPTY_STATE_CONFIG } from './constants';
import Image from 'next/image';

export interface MyPageEmptyStateProps {
  // 메인 탭 (host, participate, bookmark)
  mainTab: 'host' | 'participate' | 'bookmark';
  // 서브 탭 (shopping, dividing)
  subTab: 'shopping' | 'dividing';
  // 기존 호환성을 위한 props
  activeMainTab?: MainTabType;
  activeSubTab?: SubTabType;
}

export const MyPageEmptyState = (props: MyPageEmptyStateProps) => {
  const { mainTab, subTab, activeMainTab, activeSubTab } = props;

  const currentMainTab = mainTab || activeMainTab || 'bookmark';
  const currentSubTab =
    subTab || (activeSubTab === 'SHOPPING' ? 'shopping' : 'dividing');

  const prefix = EMPTY_STATE_CONFIG.TAB_PREFIX[currentMainTab];
  const title = EMPTY_STATE_CONFIG.TITLE_TEMPLATE[currentSubTab].replace(
    '{prefix}',
    prefix,
  );
  const description =
    EMPTY_STATE_CONFIG.DESCRIPTION_TEMPLATE[currentSubTab][currentMainTab];

  const buttonAction = currentMainTab === 'host' ? 'create' : 'browse';
  const buttonText =
    EMPTY_STATE_CONFIG.BUTTON_TEXT[currentSubTab][buttonAction];
  const buttonRoute = EMPTY_STATE_CONFIG.ROUTES[currentSubTab][buttonAction];

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-center">
        <Image
          src="/images/empty_image.svg"
          alt="빈 상태 이미지"
          width={200}
          height={200}
          className="mx-auto"
        />
        <div className="w-full pb-5">
          <p>{title}</p>
          <p>{description}</p>
        </div>

        <Button
          onClick={() => (window.location.href = buttonRoute)}
          variant="filled"
          className="w-full"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

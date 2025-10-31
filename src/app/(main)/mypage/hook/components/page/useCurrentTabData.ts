import { useMemo } from 'react';
import {
  type MainTabType,
  type CurrentTabData,
} from '@/app/(main)/mypage/utils/mypageType';

// 현재 탭에 맞는 데이터 선택
export function useCurrentTabData(
  activeMainTab: MainTabType,
  host: CurrentTabData,
  participate: CurrentTabData,
  bookmark: CurrentTabData,
): CurrentTabData {
  return useMemo(() => {
    switch (activeMainTab) {
      case 'host':
        return host;
      case 'participate':
        return participate;
      case 'bookmark':
        return bookmark;
    }
  }, [activeMainTab, host, participate, bookmark]);
}

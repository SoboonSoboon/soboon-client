import { useMemo } from 'react';
import {
  type MainTabType,
  type CurrentTabData,
} from '@/app/(main)/mypage/utils/mypageType';

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
      default:
        return host;
    }
  }, [activeMainTab, host, participate, bookmark]);
}

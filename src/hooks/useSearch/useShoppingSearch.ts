import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { getShoppingSearch } from '@/apis/meetings/search/getSearch';

export const useShoppingSearch = () => {
  const searchParams = useSearchParams();

  const search = useCallback(
    async (keyword: string, page: number = 0) => {
      // 현재 URL의 모든 파라미터를 복사
      const query = new URLSearchParams(searchParams.toString());

      // 검색어 설정
      query.set('keyword', keyword);

      // sortType이 없으면 기본값 설정
      if (!query.get('sortType')) {
        query.set('sortType', 'RECENT');
      }

      // 페이지 설정
      query.set('page', page.toString());
      query.set('size', '20');

      return await getShoppingSearch(query);
    },
    [searchParams],
  );

  return { search };
};

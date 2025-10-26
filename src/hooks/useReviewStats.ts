import { useMemo } from 'react';

interface ReviewKeyword {
  keyword: string;
  count?: number;
}

interface UseReviewStatsProps {
  reviewKeywords: ReviewKeyword[];
}

export const useReviewStats = ({ reviewKeywords }: UseReviewStatsProps) => {
  // 최대 카운트 계산
  const { maxCount, positiveCounts } = useMemo(() => {
    const positiveCounts = (reviewKeywords || [])
      .filter((k) => k.count && k.count > 0)
      .map((k) => (k.count || 0) as number);

    const actualMaxCount =
      positiveCounts.length > 0 ? Math.max(...positiveCounts) : 1;

    const maxCount = actualMaxCount * 1.2;

    return { maxCount, positiveCounts };
  }, [reviewKeywords]);

  // 특정 키워드의 카운트 가져오기
  const getCountForKeyword = useMemo(() => {
    return (keyword: string): number => {
      const found = (reviewKeywords || []).find((k) => k.keyword === keyword);
      return (found?.count || 0) as number;
    };
  }, [reviewKeywords]);

  return {
    maxCount,
    positiveCounts,
    getCountForKeyword,
  };
};

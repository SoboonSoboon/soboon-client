'use client';

import { useEffect, useState } from 'react';
import { KeywordChip } from '@/components/Atoms';
import { getPopularTagsApi } from '@/apis';

export const ShoppingTagsSection = () => {
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        const tags = await getPopularTagsApi();
        setPopularTags(tags.slice(0, 7));
      } catch (error) {
        console.error('인기 태그를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTags();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <KeywordChip label="전체" variant="active" aria-label="전체" />
      {popularTags.map((tag, index) => (
        <KeywordChip
          key={index}
          label={tag}
          variant="inactive"
          aria-label={tag}
        />
      ))}
    </div>
  );
};

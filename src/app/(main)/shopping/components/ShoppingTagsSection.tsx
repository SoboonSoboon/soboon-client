'use client';

import { useEffect, useState } from 'react';
import { KeywordChip } from '@/components/Atoms';
import { getPopularTagsApi } from '@/apis';
import { useFilterParams } from '@/hooks/useFilterParams';

export const ShoppingTagsSection = () => {
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { activeTag, updateParams } = useFilterParams();

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

  const handleTagClick = (tags: string) => {
    if (activeTag === tags) {
      updateParams({ tags: '' });
    } else {
      updateParams({ tags });
    }
  };

  if (loading || popularTags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <KeywordChip
        label="전체"
        variant={activeTag === '' ? 'active' : 'inactive'}
        aria-label="전체"
        onClick={() => handleTagClick('')}
      />
      {popularTags.map((tags, index) => (
        <KeywordChip
          key={index}
          label={tags}
          variant={activeTag === tags ? 'active' : 'inactive'}
          aria-label={tags}
          onClick={() => handleTagClick(tags)}
        />
      ))}
    </div>
  );
};

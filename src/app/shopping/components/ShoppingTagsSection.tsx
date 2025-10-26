'use client';

import { SHOPPING_TAGS } from '@/constants';
import { KeywordChip } from '@/components/Atoms';

export const ShoppingTagsSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <KeywordChip label="전체" variant="active" />
      {SHOPPING_TAGS.map((tag) => (
        <KeywordChip key={tag.value} label={tag.label} variant="inactive" />
      ))}
    </div>
  );
};

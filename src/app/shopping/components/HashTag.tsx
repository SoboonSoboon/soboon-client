'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';

export const HashTag = ({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) => {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/shopping?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <>
      {tags.map((tag) => (
        <span
          className={cn(
            'text-primary cursor-pointer text-sm font-medium',
            className,
          )}
          onClick={() => handleTagClick(tag)}
          key={tag}
        >
          {`# ${tag}`}
        </span>
      ))}
    </>
  );
};

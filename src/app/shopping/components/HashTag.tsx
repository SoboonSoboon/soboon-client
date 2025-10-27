'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';

export const HashTag = ({
  tags,
  className,
  status,
}: {
  tags: string[];
  className?: string;
  status?: 'RECRUITING';
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
            'cursor-pointer text-sm font-medium',
            status === 'RECRUITING' ? 'text-primary' : 'text-Green-30',
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

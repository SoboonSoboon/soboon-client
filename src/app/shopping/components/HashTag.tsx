'use client';

import { useRouter } from 'next/navigation';

export const HashTag = ({ tags }: { tags: string[] }) => {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/shopping?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <>
      {tags.map((tag) => (
        <span
          className="text-primary cursor-pointer text-sm font-medium hover:underline"
          onClick={() => handleTagClick(tag)}
          key={tag}
        >
          {`# ${tag}`}
        </span>
      ))}
    </>
  );
};

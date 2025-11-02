'use client';

import { ArrowUp } from '@/components/Atoms/icons';

export const GoToTopButton = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex w-16.5 cursor-pointer flex-col items-center gap-1 px-3 py-1">
      <div
        className="text-text-line2 border-text-line1 flex size-10 flex-col items-center justify-center rounded-full border bg-white sm:size-11"
        onClick={handleClick}
        data-testid="go-to-top-button"
      >
        <ArrowUp className="text-text-sub2 mb-[-0.1rem] size-3 sm:size-4" />
        <p className="font-memomentKkukkkuk text-text-sub2 text-xs">TOP</p>
      </div>
    </div>
  );
};

GoToTopButton.displayName = 'GoToTopButton';

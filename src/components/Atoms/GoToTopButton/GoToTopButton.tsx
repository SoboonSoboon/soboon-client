'use client';

import { ArrowUp } from 'lucide-react';

export const GoToTopButton = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex w-16.5 cursor-pointer flex-col items-center gap-1">
      <div
        className="text-text-line2 border-text-line2 flex h-11 w-11 items-center justify-center rounded-full border-1"
        onClick={handleClick}
        data-testid="go-to-top-button"
      >
        <ArrowUp className="text-text-line2" />
      </div>
      <p className="font-memomentKkukkkuk text-text-sub2">TOP</p>
    </div>
  );
};

GoToTopButton.displayName = 'GoToTopButton';

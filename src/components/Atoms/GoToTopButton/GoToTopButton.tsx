'use client';

const ArrowUpIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 4L4 12H8V20H16V12H20L12 4Z" fill="currentColor" />
  </svg>
);

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
        <ArrowUpIcon />
      </div>
      <p className="font-memomentKkukkkuk text-text-sub2">TOP</p>
    </div>
  );
};

GoToTopButton.displayName = 'GoToTopButton';

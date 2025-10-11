const ArrowUpIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CreateButton = () => {
  return (
    <div className="flex w-16.5 cursor-pointer flex-col items-center gap-1">
      <div className="bg-primary flex h-11 w-11 items-center justify-center rounded-full">
        <ArrowUpIcon />
      </div>
      <p className="font-memomentKkukkkuk text-primary">모임 만들기</p>
    </div>
  );
};

CreateButton.displayName = 'CreateButton';

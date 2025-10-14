import { Plus } from 'lucide-react';

export const CreateButton = () => {
  return (
    <div className="flex w-16.5 cursor-pointer flex-col items-center gap-1">
      <div className="bg-primary flex h-11 w-11 items-center justify-center rounded-full">
        <Plus className="text-white" />
      </div>
      <p className="font-memomentKkukkkuk text-primary">모임 만들기</p>
    </div>
  );
};

CreateButton.displayName = 'CreateButton';

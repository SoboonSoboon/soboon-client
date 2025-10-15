import { CreateButton, GoToTopButton } from '@/components/Atoms';

export const SideButtonSection = () => {
  return (
    <div className="fixed right-[13%] bottom-20 flex flex-col gap-1.5">
      <CreateButton
        actionHandlers={{
          shopping: () => console.log('장보기 클릭'),
          sharing: () => console.log('소분하기 클릭'),
        }}
      />
      <GoToTopButton />
    </div>
  );
};

SideButtonSection.displayName = 'SideButtonSection';

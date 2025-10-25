import { LinkPreview } from '@/components/Atoms';

export const DetailContent = ({ description }: { description: string }) => {
  return (
    <div className="flex w-full flex-col break-words">
      <LinkPreview text={description} />
    </div>
  );
};

import { timeFormatter } from '@/utils';

export const DetailContentFooter = ({ createdAt }: { createdAt: string }) => {
  return (
    <div className="text-text-sub2 mt-8 flex justify-end gap-4">
      <p>{timeFormatter(createdAt)} 작성됨</p>
    </div>
  );
};

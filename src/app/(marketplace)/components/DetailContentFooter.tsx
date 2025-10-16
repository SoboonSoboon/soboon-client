import { timeFormatter } from '@/utils/timeFormetter';

export const DetailContentFooter = ({ createdAt }: { createdAt: string }) => {
  return (
    <div className="text-text-sub2 mt-8 flex justify-end gap-4">
      <p>{timeFormatter(createdAt)}</p>
      <p>조회 4,938</p>
    </div>
  );
};

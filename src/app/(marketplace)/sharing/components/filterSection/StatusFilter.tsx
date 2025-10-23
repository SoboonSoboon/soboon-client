import { Checkbox, Label } from '@/components';

export const StatusFilter = ({
  handleStatusChange,
}: {
  handleStatusChange: (status: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="recruiting"
        name="recruiting"
        className="active:bg-primary checked:border-primary checked:bg-primary size-6 checked:text-white"
        onChange={(checked) => handleStatusChange(checked ? 'RECRUITING' : '')}
      />
      <Label htmlFor="recruiting">가능한 모임만 보기</Label>
    </div>
  );
};

'use client';

import { Checkbox, Label } from '@/components';
import { cn } from '@/utils/cn';

interface ReviewToggleButton {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const ReviewToggleButton = ({
  isChecked,
  onChange,
  className,
}: ReviewToggleButton) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Checkbox
        id="hide-completed-reviews"
        checked={isChecked}
        onChange={onChange}
        className="size-6"
      />
      <Label
        htmlFor="hide-completed-reviews cursor-pointer"
        className="text-sm"
      >
        리뷰 완료 숨기기
      </Label>
    </div>
  );
};

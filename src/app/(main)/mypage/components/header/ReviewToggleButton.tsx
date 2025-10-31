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
      />
      <Label
        htmlFor="hide-completed-reviews"
        className="text-text-main cursor-pointer"
      >
        완료한 리뷰 숨기기
      </Label>
    </div>
  );
};

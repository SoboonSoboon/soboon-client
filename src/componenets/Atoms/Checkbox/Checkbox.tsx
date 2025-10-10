import { forwardRef } from 'react';

export interface CheckboxProps {
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  onChange?: (checked: boolean) => void;
  name?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, required = false, disabled = false, className, id, name, onChange }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        required={required}
        disabled={disabled}
        className={`${className}`}
        id={id}
        name={name}
        onChange={(e) => onChange?.(e.target.checked)}
      />
    );
  },
);

Checkbox.displayName = 'Checkbox';

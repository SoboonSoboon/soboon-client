'use client';

/**
 * HeadlessSelect
 *
 * headless-design-system의 Select 합성 컴포넌트를 내부에 캡슐화한 공용 드롭다운.
 * 레거시 <Dropdown>과 동일한 props 인터페이스를 가지므로 기존 코드에서 바로 교체 가능.
 *
 * ┌─ HeadlessSelect (공용 컴포넌트 / 외부 노출)
 * │   ├─ SelectWithOutsideClose  (내부 헬퍼: 외부 클릭 감지)
 * │   │   ├─ Trigger             (내부 헬퍼: 스타일 입힌 트리거 버튼)
 * │   │   └─ InlineContent       (내부 헬퍼: isOpen 조건부 렌더)
 * │   │       └─ SelectContent / SelectOption  (headless-design-system)
 * └─ (SelectRoot는 HeadlessSelect 자체가 래핑)
 */

import { useEffect, useRef } from 'react';
import {
  SelectRoot,
  SelectContent,
  SelectOption,
  useSelectContext,
} from '@/headless-design-system/Select';
import { ChevronDown } from '@/components/Atoms/icons';
import { cn } from '@/utils/cn';

// ── 공개 타입 ──────────────────────────────────────────────────────────────────

export interface HeadlessSelectOption {
  value: string | number;
  label: string;
}

export interface HeadlessSelectProps {
  /** 레거시 Dropdown과 동일한 옵션 배열 */
  options: HeadlessSelectOption[];
  /** 현재 선택된 값 (string | number 모두 허용) */
  value?: string | number;
  /** 옵션 선택 시 호출되는 콜백 — string 값을 전달 */
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
}

// ── 내부 헬퍼 컴포넌트 (캡슐화 — 외부에 노출하지 않음) ──────────────────────────

/** 바깥 영역 클릭 시 드롭다운을 닫는 relative 래퍼 */
function SelectWithOutsideClose({ children }: { children: React.ReactNode }) {
  const { close } = useSelectContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [close]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {children}
    </div>
  );
}

/** 레거시 Dropdown과 동일한 외형의 트리거 버튼 */
function Trigger({
  options,
  placeholder,
  disabled,
}: {
  options: HeadlessSelectOption[];
  placeholder: string;
  disabled?: boolean;
}) {
  const { isOpen, toggle, value } = useSelectContext();
  const selectedLabel = options.find((o) => String(o.value) === value)?.label;

  return (
    <button
      type="button"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      onClick={disabled ? undefined : toggle}
      disabled={disabled}
      className={cn(
        'h-11 flex w-full items-center justify-between gap-1.5 rounded-xl border border-gray-10 bg-white px-3 py-2 transition-colors duration-200',
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:border-Green-20 hover:ring-1 hover:ring-Green-20 active:border-primary active:ring-1 active:ring-primary',
      )}
    >
      <span
        className={cn(
          'whitespace-nowrap',
          selectedLabel ? 'text-gray-95' : 'text-gray-40 font-medium',
        )}
      >
        {selectedLabel ?? placeholder}
      </span>
      <ChevronDown
        className={cn(
          'text-gray-95 size-4 transition-transform duration-200',
          isOpen ? 'rotate-180' : '',
        )}
      />
    </button>
  );
}

/** isOpen 이 true 일 때만 자식을 렌더링하는 인라인 조건부 래퍼 */
function InlineContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSelectContext();
  return isOpen ? <>{children}</> : null;
}

// ── 공개 컴포넌트 ──────────────────────────────────────────────────────────────

export function HeadlessSelect({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  disabled,
  className,
}: HeadlessSelectProps) {
  // 빈 문자열·0·undefined → SelectRoot에 undefined를 전달해 placeholder 표시
  const normalizedValue =
    value !== undefined && value !== '' && value !== 0
      ? String(value)
      : undefined;

  return (
    <div className={cn('w-full', className)}>
      <SelectRoot value={normalizedValue} onChange={onChange}>
        <SelectWithOutsideClose>
          <Trigger
            options={options}
            placeholder={placeholder}
            disabled={disabled}
          />
          <InlineContent>
            <SelectContent className="absolute z-50 mt-1 w-fit min-w-full rounded-xl border border-gray-20 bg-white shadow-lg max-h-60 overflow-y-auto focus:outline-none">
              {options.map((option) => (
                <SelectOption
                  key={option.value}
                  value={String(option.value)}
                  className={cn(
                    'w-full cursor-pointer whitespace-nowrap px-4 py-2 text-left focus:outline-none',
                    String(value) === String(option.value)
                      ? 'bg-Green-5 text-Green-50'
                      : 'text-gray-80 hover:bg-gray-5 focus:bg-gray-5',
                  )}
                >
                  {option.label}
                </SelectOption>
              ))}
            </SelectContent>
          </InlineContent>
        </SelectWithOutsideClose>
      </SelectRoot>
    </div>
  );
}

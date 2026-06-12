import React, { createContext, useContext, useState, useMemo, ReactNode, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

type SelectContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  value?: string;
  onChange: (value: string) => void;
};

const SelectContext = createContext<SelectContextType | null>(null);

export function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select의 서브 컴포넌트들은 반드시 SelectRoot 안에서 사용되어야 합니다.');
  }
  return context;
}

type SelectRootProps = {
  children: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
};

export function SelectRoot({ children, value: controlledValue, onChange, defaultValue }: SelectRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
    setIsOpen(false);
  };

  // TODO: Context 분리 예정
  // 현재는 State(isOpen, value)와 Dispatch(open, close, toggle, onChange) 함수가
  // 하나의 Context에 묶여 있어, isOpen이 바뀔 때마다 toggle만 쓰는 SelectTrigger 등
  // 불필요한 컴포넌트도 전부 리렌더링된다.
  // 개선 방향: SelectStateContext / SelectDispatchContext 2개로 분리하면
  // 각 컴포넌트가 필요한 Context만 구독해 불필요한 리렌더링을 차단할 수 있다.

  const contextValue = useMemo(() => ({
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
    value: currentValue,
    onChange: handleValueChange,
  }), [isOpen, currentValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, onClick, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isOpen, toggle, value } = useSelectContext();

  return (
    <button
      {...rest}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      onClick={(e) => {
        toggle();
        onClick?.(e);
      }}
    >
      {value ? value : children}
    </button>
  );
}

export function SelectPortal({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSelectContext();

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(children, document.body);
}

export function SelectOverlay({ children, onClick, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  const { close } = useSelectContext();

  return (
    <div
      {...rest}
      aria-hidden="true"
      onClick={(e) => {
        close();
        onClick?.(e);
      }}
    >
      {children}
    </div>
  );
}

export function SelectContent({ children, ...rest }: React.HTMLAttributes<HTMLUListElement>) {
  const { isOpen, close } = useSelectContext();
  const contentRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isOpen) {
      contentRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      close();
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();

      const options = Array.from(contentRef.current?.querySelectorAll<HTMLElement>('[role="option"]') || []);
      if (options.length === 0) return;

      const currentIndex = options.indexOf(document.activeElement as HTMLElement);

      let nextIndex = 0;
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex + 1 >= options.length ? 0 : currentIndex + 1;
      } else if (e.key === 'ArrowUp') {
        nextIndex = currentIndex - 1 < 0 ? options.length - 1 : currentIndex - 1;
      }

      options[nextIndex]?.focus();
    }
  };

  return (
    <ul
      {...rest}
      ref={contentRef}
      role="listbox"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {children}
    </ul>
  );
}

type SelectOptionProps = React.HTMLAttributes<HTMLLIElement> & {
  value: string;
};

export function SelectOption({ value, children, ...rest }: SelectOptionProps) {
  const { value: selectedValue, onChange } = useSelectContext();

  const isSelected = value === selectedValue;

  return (
    <li
      {...rest}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onClick={(e) => {
        onChange(value);
        rest.onClick?.(e);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange(value);
        }
        rest.onKeyDown?.(e);
      }}
    >
      {children}
    </li>
  );
}

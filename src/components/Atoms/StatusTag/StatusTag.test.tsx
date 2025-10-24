import { render, screen } from '@testing-library/react';
import { StatusTag } from './StatusTag';

describe('StatusTag 컴포넌트', () => {
  test('div 엘리먼트로 렌더링되어야 한다', () => {
    render(<StatusTag status="RECRUITING" />);
    const tag = screen.getByRole('status');
    expect(tag).toBeInTheDocument();
    expect(tag.nodeName).toBe('DIV');
  });

  describe('status prop', () => {
    test('RECRUITING 상태일 때 "모집중" 텍스트를 표시해야 한다', () => {
      render(<StatusTag status="RECRUITING" />);
      expect(screen.getByText('모집중')).toBeInTheDocument();
    });

    test('COMPLETED 상태일 때 "모집완료" 텍스트를 표시해야 한다', () => {
      render(<StatusTag status="COMPLETED" />);
      expect(screen.getByText('모집완료')).toBeInTheDocument();
    });

    test('CLOSED 상태일 때 "모집종료" 텍스트를 표시해야 한다', () => {
      render(<StatusTag status="CLOSED" />);
      expect(screen.getByText('모집종료')).toBeInTheDocument();
    });
  });

  describe('스타일 적용', () => {
    test('RECRUITING 상태일 때 올바른 스타일이 적용되어야 한다', () => {
      render(<StatusTag status="RECRUITING" />);
      const tag = screen.getByRole('status');
      expect(tag).toHaveClass('bg-[var(--GreenScale-Green1)]');
      expect(tag).toHaveClass('border-[var(--Keycolor-primary)]');
      expect(tag).toHaveClass('text-[var(--Keycolor-primary)]');
    });

    test('COMPLETED 상태일 때 올바른 스타일이 적용되어야 한다', () => {
      render(<StatusTag status="COMPLETED" />);
      const tag = screen.getByRole('status');
      expect(tag).toHaveClass('bg-[var(--GrayScale-Gray5)]');
      expect(tag).toHaveClass('border-[var(--text-inactive)]');
      expect(tag).toHaveClass('text-[var(--text-sub2)]');
    });

    test('CLOSED 상태일 때 올바른 스타일이 적용되어야 한다', () => {
      render(<StatusTag status="CLOSED" />);
      const tag = screen.getByRole('status');
      expect(tag).toHaveClass('bg-[var(--GrayScale-Gray5)]');
      expect(tag).toHaveClass('border-[var(--text-inactive)]');
      expect(tag).toHaveClass('text-[var(--text-sub2)]');
    });
  });

  describe('기본 스타일', () => {
    test('공통 스타일이 적용되어야 한다', () => {
      render(<StatusTag status="RECRUITING" />);
      const tag = screen.getByRole('status');
      expect(tag).toHaveClass('mx-auto');
      expect(tag).toHaveClass('flex');
      expect(tag).toHaveClass('items-center');
      expect(tag).toHaveClass('justify-center');
      expect(tag).toHaveClass('rounded-3xl');
      expect(tag).toHaveClass('border');
      expect(tag).toHaveClass('px-3');
      expect(tag).toHaveClass('py-1.5');
      expect(tag).toHaveClass('text-sm');
      expect(tag).toHaveClass('font-medium');
    });
  });

  describe('className prop', () => {
    test('커스텀 className이 적용되어야 한다', () => {
      render(<StatusTag status="RECRUITING" className="custom-class" />);
      const tag = screen.getByRole('status');
      expect(tag).toHaveClass('custom-class');
    });

    test('기본 스타일과 커스텀 className이 함께 적용되어야 한다', () => {
      render(<StatusTag status="RECRUITING" className="bg-red-500" />);
      const tag = screen.getByRole('status');
      expect(tag).toHaveClass('bg-red-500');
      expect(tag).toHaveClass('flex');
      expect(tag).toHaveClass('rounded-3xl');
    });
  });

  describe('상태별 라벨 매핑', () => {
    test('모든 상태가 올바른 라벨로 매핑되어야 한다', () => {
      const { rerender } = render(<StatusTag status="RECRUITING" />);
      expect(screen.getByText('모집중')).toBeInTheDocument();

      rerender(<StatusTag status="COMPLETED" />);
      expect(screen.getByText('모집완료')).toBeInTheDocument();

      rerender(<StatusTag status="CLOSED" />);
      expect(screen.getByText('모집종료')).toBeInTheDocument();
    });
  });

  describe('접근성 (a11y)', () => {
    test('role="status" 속성을 가져야 한다', () => {
      render(<StatusTag status="RECRUITING" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('RECRUITING 상태일 때 적절한 aria-label을 가져야 한다', () => {
      render(<StatusTag status="RECRUITING" />);
      const tag = screen.getByRole('status');
      expect(tag).toHaveAttribute('aria-label', '모집중 상태');
    });

    test('COMPLETED 상태일 때 적절한 aria-label을 가져야 한다', () => {
      render(<StatusTag status="COMPLETED" />);
      const tag = screen.getByRole('status');
      expect(tag).toHaveAttribute('aria-label', '모집완료 상태');
    });

    test('CLOSED 상태일 때 적절한 aria-label을 가져야 한다', () => {
      render(<StatusTag status="CLOSED" />);
      const tag = screen.getByRole('status');
      expect(tag).toHaveAttribute('aria-label', '모집종료 상태');
    });
  });

  describe('추가 props', () => {
    test('data-testid 같은 추가 속성이 전달되어야 한다', () => {
      render(<StatusTag status="RECRUITING" data-testid="custom-tag" />);
      const tag = screen.getByTestId('custom-tag');
      expect(tag).toBeInTheDocument();
    });

    test('id 속성을 전달할 수 있어야 한다', () => {
      render(<StatusTag status="RECRUITING" id="my-tag" />);
      const tag = screen.getByRole('status');
      expect(tag).toHaveAttribute('id', 'my-tag');
    });

    test('onClick 핸들러가 전달되어야 한다', () => {
      const handleClick = jest.fn();
      render(<StatusTag status="RECRUITING" onClick={handleClick} />);
      const tag = screen.getByRole('status');
      tag.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});

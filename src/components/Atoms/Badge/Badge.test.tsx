import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge 컴포넌트', () => {
  it('count를 받아서 숫자를 렌더링해야 한다', () => {
    render(<Badge count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('span 엘리먼트로 렌더링되어야 한다', () => {
    render(<Badge count={5} />);
    const badge = screen.getByRole('status');
    expect(badge.tagName).toBe('SPAN');
  });

  it('role="status" 속성을 가져야 한다', () => {
    render(<Badge count={5} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  describe('count 포맷팅', () => {
    it('기본 maxCount(999) 이하의 숫자는 그대로 표시되어야 한다', () => {
      render(<Badge count={123} />);
      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('maxCount를 초과하면 "maxCount+" 형식으로 표시되어야 한다', () => {
      render(<Badge count={1234} />);
      expect(screen.getByText('999+')).toBeInTheDocument();
    });

    it('커스텀 maxCount를 초과하면 "maxCount+" 형식으로 표시되어야 한다', () => {
      render(<Badge count={150} maxCount={99} />);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('maxCount와 같은 값은 그대로 표시되어야 한다', () => {
      render(<Badge count={99} maxCount={99} />);
      expect(screen.getByText('99')).toBeInTheDocument();
    });
  });

  describe('showZero prop', () => {
    it('showZero가 false일 때 0은 렌더링되지 않아야 한다 (기본값)', () => {
      const { container } = render(<Badge count={0} />);
      expect(container.firstChild).toBeNull();
    });

    it('showZero가 true일 때 0이 렌더링되어야 한다', () => {
      render(<Badge count={0} showZero />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('유효하지 않은 count 처리', () => {
    it('음수는 렌더링되지 않아야 한다', () => {
      const { container } = render(<Badge count={-5} />);
      expect(container.firstChild).toBeNull();
    });

    it('NaN은 렌더링되지 않아야 한다', () => {
      const { container } = render(<Badge count={NaN} />);
      expect(container.firstChild).toBeNull();
    });

    it('Infinity는 렌더링되지 않아야 한다', () => {
      const { container } = render(<Badge count={Infinity} />);
      expect(container.firstChild).toBeNull();
    });

    it('-Infinity는 렌더링되지 않아야 한다', () => {
      const { container } = render(<Badge count={-Infinity} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('접근성 (a11y)', () => {
    it('기본 aria-label이 "알림 {숫자}" 형식이어야 한다', () => {
      render(<Badge count={5} />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveAttribute('aria-label', '알림 5');
    });

    it('maxCount 초과시 aria-label이 "알림 {maxCount}+" 형식이어야 한다', () => {
      render(<Badge count={150} maxCount={99} />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveAttribute('aria-label', '알림 99+');
    });

    it('커스텀 aria-label을 전달할 수 있어야 한다', () => {
      render(<Badge count={3} aria-label="읽지 않은 메시지 3개" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveAttribute('aria-label', '읽지 않은 메시지 3개');
    });
  });

  describe('className prop', () => {
    it('기본 스타일이 적용되어야 한다', () => {
      render(<Badge count={5} />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass(
        'inline-flex',
        'items-center',
        'justify-center',
        'h-6',
        'min-w-6',
        'rounded-full',
        'bg-zinc-800',
        'text-zinc-100',
      );
    });

    it('추가 className이 적용되어야 한다', () => {
      render(<Badge count={5} className="custom-class" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass('custom-class');
    });

    it('기본 스타일과 추가 className이 함께 적용되어야 한다', () => {
      render(<Badge count={5} className="bg-red-500" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveClass('bg-red-500', 'inline-flex', 'rounded-full');
    });
  });

  describe('추가 props', () => {
    it('data-testid 같은 추가 속성이 전달되어야 한다', () => {
      render(<Badge count={5} data-testid="test-badge" />);
      const badge = screen.getByTestId('test-badge');
      expect(badge).toBeInTheDocument();
    });

    it('id 속성이 전달되어야 한다', () => {
      render(<Badge count={5} id="my-badge" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveAttribute('id', 'my-badge');
    });

    it('onClick 핸들러가 전달되어야 한다', () => {
      const handleClick = jest.fn();
      render(<Badge count={5} onClick={handleClick} />);
      const badge = screen.getByRole('status');
      badge.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});

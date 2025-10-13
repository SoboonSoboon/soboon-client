import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button 컴포넌트', () => {
  it('label prop으로 전달된 텍스트를 렌더링해야 한다', () => {
    render(<Button label="클릭" />);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  it('button 엘리먼트로 렌더링되어야 한다', () => {
    render(<Button label="테스트 버튼" />);
    const button = screen.getByRole('button');
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('onClick 핸들러가 호출되어야 한다', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button label="클릭" onClick={handleClick} />);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  describe('primary prop', () => {
    it('primary가 false일 때 secondary 스타일이 적용되어야 한다 (기본값)', () => {
      render(<Button label="Secondary" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent');
    });

    it('primary가 true일 때 primary 스타일이 적용되어야 한다', () => {
      render(<Button label="Primary" primary />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-black');
    });
  });

  describe('size prop', () => {
    it('size를 지정하지 않으면 medium이 기본값이어야 한다', () => {
      render(<Button label="Medium" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-5', 'py-[11px]');
    });

    it('size가 small일 때 small 스타일이 적용되어야 한다', () => {
      render(<Button label="Small" size="small" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2.5');
    });

    it('size가 large일 때 large 스타일이 적용되어야 한다', () => {
      render(<Button label="Large" size="large" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3');
    });
  });

  describe('backgroundColor prop', () => {
    it('backgroundColor가 지정되면 인라인 스타일로 적용되어야 한다', () => {
      render(<Button label="Custom Color" backgroundColor="#ff0000" />);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ backgroundColor: '#ff0000' });
    });

    it('backgroundColor가 없으면 인라인 스타일이 적용되지 않아야 한다', () => {
      render(<Button label="No Custom Color" />);
      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('style');
    });
  });

  describe('className prop', () => {
    it('추가 className이 적용되어야 한다', () => {
      render(<Button label="Custom Class" className="custom-class" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('기본 스타일과 추가 className이 함께 적용되어야 한다', () => {
      render(<Button label="Mixed" className="custom-class" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'custom-class',
        'cursor-pointer',
        'rounded-[8px]',
      );
    });
  });

  describe('추가 props', () => {
    it('disabled 속성이 적용되어야 한다', () => {
      render(<Button label="Disabled" disabled />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('data-testid 같은 추가 속성이 전달되어야 한다', () => {
      render(<Button label="Test" data-testid="test-button" />);
      const button = screen.getByTestId('test-button');
      expect(button).toBeInTheDocument();
    });
  });
});

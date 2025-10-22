import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button 컴포넌트', () => {
  describe('기본 렌더링', () => {
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

    it('기본 스타일이 적용되어야 한다', () => {
      render(<Button label="버튼" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-lg',
        'border',
      );
    });
  });

  describe('variant prop', () => {
    it('variant를 지정하지 않으면 filled가 기본값이어야 한다', () => {
      render(<Button label="기본 버튼" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'bg-primary',
        'text-white',
        'border-transparent',
      );
    });

    it('variant가 filled일 때 filled 스타일이 적용되어야 한다', () => {
      render(<Button label="Filled" variant="filled" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'bg-primary',
        'text-white',
        'border-transparent',
      );
    });

    it('variant가 outline일 때 outline 스타일이 적용되어야 한다', () => {
      render(<Button label="Outline" variant="outline" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-white', 'text-primary', 'border-primary');
    });
  });

  describe('size prop', () => {
    it('size를 지정하지 않으면 large가 기본값이어야 한다', () => {
      render(<Button label="Large" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11', 'px-5', 'text-base');
    });

    it('size가 small일 때 small 스타일이 적용되어야 한다', () => {
      render(<Button label="Small" size="small" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10', 'px-4', 'text-sm');
    });

    it('size가 large일 때 large 스타일이 적용되어야 한다', () => {
      render(<Button label="Large" size="large" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11', 'px-5', 'text-base');
    });
  });

  describe('disabled 상태', () => {
    it('disabled 속성이 적용되어야 한다', () => {
      render(<Button label="Disabled" disabled />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('disabled이고 variant가 filled일 때 disabled 스타일이 적용되어야 한다', () => {
      render(<Button label="Disabled" variant="filled" disabled />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('cursor-not-allowed');
    });

    it('disabled이고 variant가 outline일 때 disabled 스타일이 적용되어야 한다', () => {
      render(<Button label="Disabled" variant="outline" disabled />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('cursor-not-allowed');
    });

    it('disabled 상태에서는 onClick이 호출되지 않아야 한다', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(<Button label="클릭" onClick={handleClick} disabled />);
      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('onClick 이벤트', () => {
    it('onClick 핸들러가 호출되어야 한다', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(<Button label="클릭" onClick={handleClick} />);
      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('여러 번 클릭하면 onClick이 여러 번 호출되어야 한다', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(<Button label="클릭" onClick={handleClick} />);
      const button = screen.getByRole('button');

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('type prop', () => {
    it('type을 지정하지 않으면 button이 기본값이어야 한다', () => {
      render(<Button label="버튼" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('type이 submit일 때 submit 타입으로 렌더링되어야 한다', () => {
      render(<Button label="제출" type="submit" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('type이 reset일 때 reset 타입으로 렌더링되어야 한다', () => {
      render(<Button label="리셋" type="reset" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
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
      expect(button).toHaveClass('custom-class', 'inline-flex', 'rounded-lg');
    });
  });

  describe('추가 props', () => {
    it('data-testid 같은 추가 속성이 전달되어야 한다', () => {
      render(<Button label="Test" data-testid="test-button" />);
      const button = screen.getByTestId('test-button');
      expect(button).toBeInTheDocument();
    });

    it('aria-label 같은 접근성 속성이 전달되어야 한다', () => {
      render(<Button label="Test" aria-label="접근성 레이블" />);
      const button = screen.getByLabelText('접근성 레이블');
      expect(button).toBeInTheDocument();
    });
  });

  describe('variant와 size 조합', () => {
    it('filled variant와 small size 조합이 제대로 작동해야 한다', () => {
      render(<Button label="버튼" variant="filled" size="small" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary', 'h-10', 'px-4', 'text-sm');
    });

    it('outline variant와 large size 조합이 제대로 작동해야 한다', () => {
      render(<Button label="버튼" variant="outline" size="large" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'bg-white',
        'border-primary',
        'h-11',
        'px-5',
        'text-base',
      );
    });
  });
});

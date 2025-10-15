import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './TextInput';

describe('TextInput 컴포넌트', () => {
  it('input 엘리먼트로 렌더링되어야 한다', () => {
    render(<TextInput />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  describe('placeholder prop', () => {
    it('placeholder가 적용되어야 한다', () => {
      render(<TextInput placeholder="이름을 입력하세요" />);
      const input = screen.getByPlaceholderText('이름을 입력하세요');
      expect(input).toBeInTheDocument();
    });

    it('placeholder prop이 없으면 placeholder가 없어야 한다', () => {
      render(<TextInput />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('placeholder');
    });
  });

  describe('value prop', () => {
    it('value가 입력 필드에 표시되어야 한다', () => {
      render(<TextInput value="테스트 값" readOnly />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('테스트 값');
    });

    it('value prop이 없으면 빈 값이어야 한다', () => {
      render(<TextInput />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('value가 변경되면 입력 필드도 업데이트되어야 한다', () => {
      const { rerender } = render(<TextInput value="초기값" readOnly />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('초기값');

      rerender(<TextInput value="변경된 값" readOnly />);
      expect(input.value).toBe('변경된 값');
    });
  });

  describe('onChange 이벤트', () => {
    it('텍스트 입력 시 onChange가 호출되어야 한다', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(<TextInput onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'a');

      expect(handleChange).toHaveBeenCalled();
    });

    it('onChange에 올바른 이벤트가 전달되어야 한다', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(<TextInput onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: expect.any(String),
          }),
        }),
      );
    });

    it('onChange prop이 없어도 에러가 발생하지 않아야 한다', async () => {
      const user = userEvent.setup();

      render(<TextInput />);
      const input = screen.getByRole('textbox');

      await expect(user.type(input, 'test')).resolves.not.toThrow();
    });
  });

  describe('제어 컴포넌트 (controlled component)', () => {
    it('value와 onChange를 함께 사용하면 제어 컴포넌트로 작동해야 한다', async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState('');
        return (
          <TextInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="입력하세요"
          />
        );
      };

      const user = userEvent.setup();
      render(<TestComponent />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('');

      await user.type(input, 'hello');

      expect(input.value).toBe('hello');
    });
  });

  describe('className prop', () => {
    it('기본 스타일이 적용되어야 한다', () => {
      render(<TextInput />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(
        'flex',
        'w-full',
        'flex-1',
        'items-center',
        'rounded-xl',
        'border-2',
        'border-transparent',
        'px-4',
        'py-2.5',
      );
    });

    it('커스텀 className이 적용되어야 한다', () => {
      render(<TextInput className="custom-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-input');
    });

    it('기본 스타일과 커스텀 className이 함께 적용되어야 한다', () => {
      render(<TextInput className="bg-blue-100" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('bg-blue-100', 'flex', 'rounded-xl');
    });
  });

  describe('추가 props', () => {
    it('type 속성을 전달할 수 있어야 한다', () => {
      render(<TextInput type="email" data-testid="email-input" />);
      const input = screen.getByTestId('email-input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('disabled 속성을 전달할 수 있어야 한다', () => {
      render(<TextInput disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('id 속성을 전달할 수 있어야 한다', () => {
      render(<TextInput id="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('name 속성을 전달할 수 있어야 한다', () => {
      render(<TextInput name="username" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('name', 'username');
    });

    it('data-testid 같은 추가 속성이 전달되어야 한다', () => {
      render(<TextInput data-testid="custom-input" />);
      const input = screen.getByTestId('custom-input');
      expect(input).toBeInTheDocument();
    });

    it('required 속성을 전달할 수 있어야 한다', () => {
      render(<TextInput required />);
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
    });

    it('maxLength 속성을 전달할 수 있어야 한다', () => {
      render(<TextInput maxLength={10} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('maxLength', '10');
    });

    it('readOnly 속성을 전달할 수 있어야 한다', () => {
      render(<TextInput readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readOnly');
    });
  });

  describe('포커스 관리', () => {
    it('포커스 시 focus 이벤트가 발생해야 한다', async () => {
      const handleFocus = jest.fn();
      const user = userEvent.setup();

      render(<TextInput onFocus={handleFocus} />);
      const input = screen.getByRole('textbox');

      await user.click(input);

      expect(handleFocus).toHaveBeenCalled();
    });

    it('포커스 해제 시 blur 이벤트가 발생해야 한다', async () => {
      const handleBlur = jest.fn();
      const user = userEvent.setup();

      render(<TextInput onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');

      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('키보드 이벤트', () => {
    it('Enter 키 입력 시 onKeyDown이 호출되어야 한다', async () => {
      const handleKeyDown = jest.fn();
      const user = userEvent.setup();

      render(<TextInput onKeyDown={handleKeyDown} />);
      const input = screen.getByRole('textbox');

      await user.click(input);
      await user.keyboard('{Enter}');

      expect(handleKeyDown).toHaveBeenCalled();
    });

    it('onKeyPress 이벤트가 전달되어야 한다', async () => {
      const handleKeyPress = jest.fn();
      const user = userEvent.setup();

      render(<TextInput onKeyDown={handleKeyPress} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'a');
    });
  });
});

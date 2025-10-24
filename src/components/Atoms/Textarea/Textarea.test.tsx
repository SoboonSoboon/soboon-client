import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  test('기본 textarea가 렌더링되어야 한다', () => {
    render(<Textarea />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  test('placeholder가 올바르게 표시되어야 한다', () => {
    const placeholderText = '내용을 입력하세요';
    render(<Textarea placeholder={placeholderText} />);

    const textarea = screen.getByPlaceholderText(placeholderText);
    expect(textarea).toBeInTheDocument();
  });

  test('value가 올바르게 표시되어야 한다', () => {
    const testValue = '테스트 내용입니다';
    render(<Textarea value={testValue} onChange={() => {}} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(testValue);
  });

  test('onChange 이벤트가 올바르게 동작해야 한다', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(5); // 'Hello' = 5글자
  });

  test('사용자 입력이 textarea에 반영되어야 한다', async () => {
    const user = userEvent.setup();
    render(<Textarea />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    await user.type(textarea, 'Hello World');

    expect(textarea.value).toBe('Hello World');
  });

  test('올바른 className이 적용되어야 한다', () => {
    render(<Textarea />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('w-full');
    expect(textarea).toHaveClass('py-2.5');
    expect(textarea).toHaveClass('px-4');
    expect(textarea).toHaveClass('rounded-xl');
  });

  test('커스텀 className이 추가로 적용되어야 한다', () => {
    render(<Textarea className="border-2 border-blue-500" />);

    const textarea = screen.getByRole('textbox');
    // 기본 클래스 유지
    expect(textarea).toHaveClass('w-full', 'rounded-xl');
    // 커스텀 클래스 추가
    expect(textarea).toHaveClass('border-2', 'border-blue-500');
  });

  test('추가 props가 올바르게 전달되어야 한다', () => {
    render(<Textarea disabled rows={5} maxLength={100} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('maxLength', '100');
  });

  test('value와 onChange를 함께 사용하는 제어 컴포넌트로 동작해야 한다', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [value, setValue] = React.useState('');
      return (
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="입력하세요"
        />
      );
    };

    render(<TestComponent />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    await user.type(textarea, '테스트');

    expect(textarea.value).toBe('테스트');
  });

  test('포커스 시 스타일이 적용되어야 한다', async () => {
    const user = userEvent.setup();
    render(<Textarea />);

    const textarea = screen.getByRole('textbox');
    await user.click(textarea);

    expect(textarea).toHaveFocus();
  });

  test('빈 값으로 렌더링되어야 한다', () => {
    render(<Textarea value="" onChange={() => {}} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('');
  });

  test('여러 줄의 텍스트를 입력할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    const multilineText = '첫 번째 줄\n두 번째 줄\n세 번째 줄';
    render(<Textarea />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    await user.type(textarea, multilineText);

    expect(textarea.value).toContain('\n');
  });
});

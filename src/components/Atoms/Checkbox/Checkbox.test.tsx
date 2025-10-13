import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox 컴포넌트', () => {
  it('checkbox input 엘리먼트로 렌더링되어야 한다', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  describe('checked prop', () => {
    it('checked가 true일 때 체크된 상태여야 한다', () => {
      render(<Checkbox checked={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('checked가 false일 때 체크되지 않은 상태여야 한다', () => {
      render(<Checkbox checked={false} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('checked prop이 없으면 체크되지 않은 상태여야 한다', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('required prop', () => {
    it('required가 true일 때 required 속성이 적용되어야 한다', () => {
      render(<Checkbox required={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeRequired();
    });

    it('required가 false일 때 required 속성이 없어야 한다', () => {
      render(<Checkbox required={false} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeRequired();
    });

    it('required prop이 없으면 required 속성이 없어야 한다 (기본값 false)', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeRequired();
    });
  });

  describe('disabled prop', () => {
    it('disabled가 true일 때 비활성화 상태여야 한다', () => {
      render(<Checkbox disabled={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('disabled가 false일 때 활성화 상태여야 한다', () => {
      render(<Checkbox disabled={false} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeDisabled();
    });

    it('disabled prop이 없으면 활성화 상태여야 한다 (기본값 false)', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeDisabled();
    });
  });

  describe('onChange 이벤트', () => {
    it('체크박스 클릭 시 onChange가 true와 함께 호출되어야 한다', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(<Checkbox checked={false} onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('체크된 체크박스 클릭 시 onChange가 false와 함께 호출되어야 한다', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(<Checkbox checked={true} onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('onChange prop이 없어도 에러가 발생하지 않아야 한다', async () => {
      const user = userEvent.setup();

      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');

      await expect(user.click(checkbox)).resolves.not.toThrow();
    });

    it('disabled 상태에서는 onChange가 호출되지 않아야 한다', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(<Checkbox disabled onChange={handleChange} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('id와 name 속성', () => {
    it('id prop이 적용되어야 한다', () => {
      render(<Checkbox id="test-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'test-checkbox');
    });

    it('name prop이 적용되어야 한다', () => {
      render(<Checkbox name="agreement" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('name', 'agreement');
    });
  });

  describe('className prop', () => {
    it('커스텀 className이 적용되어야 한다', () => {
      render(<Checkbox className="custom-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('custom-checkbox');
    });
  });

  describe('ref forwarding', () => {
    it('ref를 통해 input 엘리먼트에 접근할 수 있어야 한다', () => {
      const ref = { current: null as HTMLInputElement | null };

      render(<Checkbox ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });
  });
});

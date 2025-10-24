import { render, screen, fireEvent } from '@testing-library/react';
import { DateFilter } from './DateFilter';

describe('DateFilter', () => {
  test('기본적으로 렌더링된다', () => {
    render(<DateFilter />);
    const button = screen.getByTestId('date-filter-button');
    expect(button).toBeInTheDocument();
  });

  test('버튼 클릭 시 작성일 옵션이 토글되고 onChange가 호출된다', () => {
    const mockOnChange = jest.fn();
    render(<DateFilter onChange={mockOnChange} />);
    const button = screen.getByTestId('date-filter-button');

    // 첫 번째 클릭 (OLDEST -> RECENT)
    fireEvent.click(button);
    expect(mockOnChange).toHaveBeenCalledWith('OLDEST');

    // 두 번째 클릭 (RECENT -> OLDEST)
    fireEvent.click(button);
    expect(mockOnChange).toHaveBeenCalledWith('RECENT');
    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });
});

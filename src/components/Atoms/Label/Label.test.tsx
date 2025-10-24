import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label 컴포넌트', () => {
  test('children prop으로 전달된 텍스트를 렌더링해야 한다', () => {
    render(<Label>테스트 라벨</Label>);
    expect(screen.getByText('테스트 라벨')).toBeInTheDocument();
  });

  test('required prop이 true일 때 필수 표시(*)가 보여야 한다', () => {
    render(<Label required>테스트 라벨</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-primary');
  });

  test('required prop이 false일 때 필수 표시(*)가 보이지 않아야 한다', () => {
    render(<Label>테스트 라벨</Label>);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  test('추가 props가 label 엘리먼트에 전달되어야 한다', () => {
    render(
      <Label htmlFor="test-input" data-testid="test-label">
        테스트 라벨
      </Label>,
    );
    const label = screen.getByTestId('test-label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  test('label 엘리먼트로 렌더링되어야 한다', () => {
    render(<Label>테스트 라벨</Label>);
    const label = screen.getByText('테스트 라벨');
    expect(label.tagName).toBe('LABEL');
  });

  // @TODO: 기본 스타일 클래스 확정 후 테스트 코드 추가 필요
  // 기본 스타일 클래스가 적용되어야 한다
});

import { render, screen, fireEvent } from '@testing-library/react';
import { GoToTopButton } from './GoToTopButton';

describe('GoToTopButton', () => {
  it('버튼을 클릭하면 window.scrollTo가 호출된다.', () => {
    const mockScrollTo = jest.fn();
    window.scrollTo = mockScrollTo;

    render(<GoToTopButton />);
    const button = screen.getByTestId('go-to-top-button');
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});

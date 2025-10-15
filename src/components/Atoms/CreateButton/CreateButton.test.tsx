import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateButton } from './CreateButton';

describe('CreateButton 컴포넌트', () => {
  const mockActionHandlers = {
    shopping: jest.fn(),
    sharing: jest.fn(),
  };

  it('컴포넌트가 렌더링되어야 한다', () => {
    render(<CreateButton actionHandlers={mockActionHandlers} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  describe('초기 상태', () => {
    it('처음에는 메뉴가 숨겨져 있어야 한다', () => {
      const { container } = render(
        <CreateButton actionHandlers={mockActionHandlers} />,
      );
      const menuContainer = container.querySelector('.transition-all');
      expect(menuContainer).toHaveClass('opacity-0');
      expect(menuContainer).toHaveClass('pointer-events-none');
    });

    it('Plus 아이콘이 표시되어야 한다', () => {
      const { container } = render(
        <CreateButton actionHandlers={mockActionHandlers} />,
      );
      const plusIcon = container.querySelector('svg');
      expect(plusIcon).toBeInTheDocument();
    });
  });

  describe('버튼 클릭', () => {
    it('버튼 클릭 시 메뉴가 열려야 한다', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <CreateButton actionHandlers={mockActionHandlers} />,
      );

      const button = screen.getByRole('button');
      await user.click(button);

      const menuContainer = container.querySelector('.transition-all');
      expect(menuContainer).toHaveClass('opacity-100');
      expect(menuContainer).toHaveClass('translate-y-0');
      expect(menuContainer).not.toHaveClass('pointer-events-none');
    });
  });

  describe('onClick 핸들러', () => {
    it('장보기 클릭 시 shopping onClick이 호출되어야 한다', async () => {
      const handleShoppingClick = jest.fn();
      const user = userEvent.setup();

      render(
        <CreateButton
          actionHandlers={{ shopping: handleShoppingClick, sharing: jest.fn() }}
        />,
      );

      await user.click(screen.getByRole('button', { name: '메뉴 열기' }));

      const shoppingButton = screen.getByRole('button', {
        name: '장보기 만들기',
      });
      await user.click(shoppingButton);

      expect(handleShoppingClick).toHaveBeenCalledTimes(1);
    });

    it('소분하기 클릭 시 sharing onClick이 호출되어야 한다', async () => {
      const handleSharingClick = jest.fn();
      const user = userEvent.setup();

      render(
        <CreateButton
          actionHandlers={{ shopping: jest.fn(), sharing: handleSharingClick }}
        />,
      );

      await user.click(screen.getByRole('button', { name: '메뉴 열기' }));

      const sharingButton = screen.getByRole('button', {
        name: '소분하기 만들기',
      });
      await user.click(sharingButton);

      expect(handleSharingClick).toHaveBeenCalledTimes(1);
    });
  });
});

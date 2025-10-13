import { render, screen, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';
import { act } from 'react';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img src={src} alt={alt} {...props} />;
  };
});

describe('Carousel', () => {
  const mockImages = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];

  const singleImage = ['/single-image.jpg'];

  describe('기본 렌더링', () => {
    it('캐러셀이 정상적으로 렌더링된다', () => {
      render(<Carousel carouselImages={mockImages} />);

      const images = screen.getAllByAltText('캐러셀 이미지');
      expect(images).toHaveLength(5); // 원본 3개 + 앞뒤 복사본 2개
    });
  });

  // todo: 이미지가 없을 때 대체 이미지 사용 테스트 추가하기.

  describe('이미지가 1장일 때', () => {
    it('이미지가 1장일 때 버튼이 렌더링되지 않는다.', () => {
      render(<Carousel carouselImages={singleImage} />);

      expect(
        screen.queryByTestId('carousel-prev-button'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('carousel-next-button'),
      ).not.toBeInTheDocument();
    });

    it('단일 이미지일 때 이미지가 정상적으로 표시된다', () => {
      render(<Carousel carouselImages={singleImage} />);

      expect(screen.getByAltText('캐러셀 이미지')).toHaveAttribute(
        'src',
        '/single-image.jpg',
      );
    });
  });

  describe('이미지가 여러장일 때', () => {
    it('버튼을 누르면 0.3ms동안 disabled 상태가 된다.', () => {
      jest.useFakeTimers();

      render(<Carousel carouselImages={mockImages} />);
      const nextButton = screen.getByTestId('carousel-next-button');
      const prevButton = screen.getByTestId('carousel-prev-button');

      fireEvent.click(nextButton);
      fireEvent.click(prevButton);

      expect(nextButton).toBeDisabled();
      expect(prevButton).toBeDisabled();

      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(nextButton).not.toBeDisabled();
      expect(prevButton).not.toBeDisabled();

      jest.useRealTimers();
    });

    it('다음 버튼을 클릭하면 다음 이미지로 이동한다', async () => {
      render(<Carousel carouselImages={mockImages} />);

      const nextButton = screen.getByTestId('carousel-next-button');
      fireEvent.click(nextButton);

      expect(screen.getByTestId('carousel-container')).toHaveStyle(
        'transform: translateX(-1400px)',
      );
    });

    it('첫 번째 이미지에서 이전 버튼을 클릭하면 마지막 이미지로 이동한다', async () => {
      render(<Carousel carouselImages={mockImages} />);
      const prevButton = screen.getByTestId('carousel-prev-button');

      // 첫 번째 클릭
      fireEvent.click(prevButton);
      expect(screen.getByTestId('carousel-container')).toHaveStyle(
        'transform: translateX(-0px)',
      );

      // 300ms 즉시 진행
      act(() => {
        jest.advanceTimersByTime(300);
      });

      // 두 번째 클릭
      fireEvent.click(prevButton);

      expect(screen.getByTestId('carousel-container')).toHaveStyle(
        'transform: translateX(-1400px)',
      );
    });

    it('마지막 이미지에서 다음 버튼을 클릭하면 첫 번째 이미지로 이동한다', async () => {
      render(<Carousel carouselImages={mockImages} />);
      const nextButton = screen.getByTestId('carousel-next-button');

      // 첫 번째 클릭
      fireEvent.click(nextButton);

      expect(screen.getByTestId('carousel-container')).toHaveStyle(
        'transform: translateX(-1400px)',
      );

      act(() => {
        jest.advanceTimersByTime(300);
      });

      // 두 번째 클릭
      fireEvent.click(nextButton);
      expect(screen.getByTestId('carousel-container')).toHaveStyle(
        'transform: translateX(-2100px)',
      );

      act(() => {
        jest.advanceTimersByTime(300);
      });

      // 세 번째 클릭
      fireEvent.click(nextButton);
      expect(screen.getByTestId('carousel-container')).toHaveStyle(
        'transform: translateX(-2800px)',
      );

      act(() => {
        jest.advanceTimersByTime(300);
      });

      // 300ms 후 첫 번째 이미지로 이동
      expect(screen.getByTestId('carousel-container')).toHaveStyle(
        'transform: translateX(-700px)',
      );
    });
  });
});

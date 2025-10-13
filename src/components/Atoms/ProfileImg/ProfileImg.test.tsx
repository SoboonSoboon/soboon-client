import { render, screen } from '@testing-library/react';
import { ProfileImg } from './ProfileImg';

// Next.js Image 컴포넌트 모킹
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('ProfileImg', () => {
  it('profile prop으로 전달된 이미지 경로가 올바르게 렌더링되어야 한다', () => {
    const testImagePath = '/test-profile.jpg';
    render(<ProfileImg profile={testImagePath} />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', testImagePath);
  });

  it('profile prop이 없으면 기본 이미지가 렌더링되어야 한다', () => {
    render(<ProfileImg />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/profile_default.svg');
  });

  it('alt 속성이 "profileImage"로 설정되어야 한다', () => {
    render(<ProfileImg profile="/test.jpg" />);

    const image = screen.getByAltText('profileImage');
    expect(image).toBeInTheDocument();
  });

  it('올바른 className이 적용되어야 한다', () => {
    render(<ProfileImg profile="/test.jpg" />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toHaveClass('rounded-full', 'object-cover');
  });

  it('size를 지정하지 않으면 기본값 100x100이 적용되어야 한다', () => {
    render(<ProfileImg profile="/test.jpg" />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '100');
  });

  it('커스텀 size가 정사각형으로 올바르게 적용되어야 한다', () => {
    render(<ProfileImg profile="/test.jpg" size={50} />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toHaveAttribute('width', '50');
    expect(image).toHaveAttribute('height', '50');
  });

  it('다양한 size 값이 올바르게 적용되어야 한다', () => {
    const { rerender } = render(<ProfileImg profile="/test.jpg" size={200} />);
    let image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toHaveAttribute('width', '200');
    expect(image).toHaveAttribute('height', '200');

    rerender(<ProfileImg profile="/test.jpg" size={40} />);
    image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toHaveAttribute('width', '40');
    expect(image).toHaveAttribute('height', '40');
  });

  it('기본 profile 경로가 제공될 때 올바르게 렌더링되어야 한다', () => {
    const defaultProfile = '/images/dummy_profile.png';
    render(<ProfileImg profile={defaultProfile} />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', defaultProfile);
  });

  it('커스텀 className이 기본 className과 함께 적용되어야 한다', () => {
    render(<ProfileImg profile="/test.jpg" className="border-2" />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toHaveClass('rounded-full', 'object-cover');
    expect(image).toHaveClass('border-2');
  });

  it('className 없이도 정상 동작해야 한다', () => {
    render(<ProfileImg profile="/test.jpg" />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toHaveClass('rounded-full', 'object-cover');
  });
});

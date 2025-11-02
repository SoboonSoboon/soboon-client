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
  test('profileImageUrl prop으로 전달된 이미지 경로가 올바르게 렌더링되어야 한다', () => {
    const testImagePath = '/test-profile.jpg';
    render(<ProfileImg profileImageUrl={testImagePath} />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', testImagePath);
  });

  test('profileImageUrl prop이 없으면 기본 이미지가 렌더링되어야 한다', () => {
    render(<ProfileImg />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/profile_default.svg');
  });

  test('profileImageUrl이 빈 문자열이면 기본 이미지가 렌더링되어야 한다', () => {
    render(<ProfileImg profileImageUrl="" />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/profile_default.svg');
  });

  test('alt 속성이 "profileImage"로 설정되어야 한다', () => {
    render(<ProfileImg profileImageUrl="/test.jpg" />);

    const image = screen.getByAltText('profileImage');
    expect(image).toBeInTheDocument();
  });

  test('올바른 className이 적용되어야 한다', () => {
    render(<ProfileImg profileImageUrl="/test.jpg" />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toHaveClass('object-cover');
  });

  test('size를 지정하지 않으면 기본값 100이 적용되어야 한다', () => {
    render(<ProfileImg profileImageUrl="/test.jpg" />);

    const container = screen.getByRole('img', {
      name: /profileImage/i,
    }).parentElement;
    expect(container).toHaveStyle({ width: '100px', height: '100px' });
  });

  test('커스텀 size가 정사각형으로 올바르게 적용되어야 한다', () => {
    render(<ProfileImg profileImageUrl="/test.jpg" size={50} />);

    const container = screen.getByRole('img', {
      name: /profileImage/i,
    }).parentElement;
    expect(container).toHaveStyle({ width: '50px', height: '50px' });
  });

  test('다양한 size 값이 올바르게 적용되어야 한다', () => {
    const { rerender } = render(
      <ProfileImg profileImageUrl="/test.jpg" size={200} />,
    );
    let container = screen.getByRole('img', {
      name: /profileImage/i,
    }).parentElement;
    expect(container).toHaveStyle({ width: '200px', height: '200px' });

    rerender(<ProfileImg profileImageUrl="/test.jpg" size={40} />);
    container = screen.getByRole('img', {
      name: /profileImage/i,
    }).parentElement;
    expect(container).toHaveStyle({ width: '40px', height: '40px' });
  });

  test('기본 profileImageUrl 경로가 제공될 때 올바르게 렌더링되어야 한다', () => {
    const defaultProfile = '/images/profile_default.svg';
    render(<ProfileImg profileImageUrl={defaultProfile} />);

    const image = screen.getByRole('img', { name: /profileImage/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', defaultProfile);
  });

  test('커스텀 className이 기본 className과 함께 적용되어야 한다', () => {
    render(<ProfileImg profileImageUrl="/test.jpg" className="border-2" />);

    const container = screen.getByRole('img', {
      name: /profileImage/i,
    }).parentElement;
    expect(container).toHaveClass('border-2');
  });

  test('className 없이도 정상 동작해야 한다', () => {
    render(<ProfileImg profileImageUrl="/test.jpg" />);

    const container = screen.getByRole('img', {
      name: /profileImage/i,
    }).parentElement;
    expect(container).toHaveClass(
      'relative',
      'aspect-square',
      'overflow-hidden',
      'rounded-full',
      'border',
    );
  });
});
